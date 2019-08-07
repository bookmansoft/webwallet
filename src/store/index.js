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

import mygame from './mygame'
store.registerModule('mygame', mygame);

import pocket from './pocket'
store.registerModule('pocket', pocket);

import prop from './prop'
store.registerModule('prop', prop);

import rpsReceive from './rpsReceive'
store.registerModule('rpsReceive', rpsReceive);

import rpsSend from './rpsSend'
store.registerModule('rpsSend', rpsSend);

import stock from './stock'
store.registerModule('stock', stock);

import stockMine from './stockMine'
store.registerModule('stockMine', stockMine);

import user from './user'
store.registerModule('user', user);

import wallet from './wallet'
store.registerModule('wallet', wallet);

export default store
