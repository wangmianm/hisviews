import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions';
import mutations from './mutations';
import persistedState from 'vuex-persistedstate'
Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  state: {
    date: ""
  },
  actions: {
    /**
     * 设置日期 
     * @param {any} state 
     * @param {string} date 
     */
    setDate(context, date) {
      context.commit('setDate', date);
    }
  },
  mutations: {
    /**
     * 设置日期 
     * @param {any} state 
     * @param {string} date 
     */
    setDate(state, date) {
      state.date = date;
      sessionStorage.setItem("date", date);
    }
  },
  modules,
  getters,
  plugins: [persistedState({
    storage: window.sessionStorage
  })],
  strict: process.env.NODE_ENV !== 'production'
})

export default store
