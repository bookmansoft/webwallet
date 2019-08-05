import Vue from 'vue'
import Vuex from 'vuex'

import gamegold from './gamegold'

Vue.use(Vuex);

// 创建store对象
const store = new Vuex.Store({});

store.registerModule('gamegold', gamegold);

export default store