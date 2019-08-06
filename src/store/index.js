/**
 * 数据集合汇总
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// 创建store对象
const store = new Vuex.Store({});

import cp from './cp'
store.registerModule('cp', cp);

import crowd from './crowd'
store.registerModule('crowd', crowd);

import pocket from './pocket'
store.registerModule('pocket', pocket);

import prop from './prop'
store.registerModule('prop', prop);

import stock from './stock'
store.registerModule('stock', stock);

import stockMine from './stockMine'
store.registerModule('stockMine', stockMine);

import user from './user'
store.registerModule('user', user);

export default store
