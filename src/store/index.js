/**
 * 数据集合汇总
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// 创建store对象
const store = new Vuex.Store({});

import comment from './comment'
store.registerModule('comment', comment);

import config from './config'
store.registerModule('config', config);

import contract from './contract'
store.registerModule('contract', contract);

import cp from './cp'
store.registerModule('cp', cp);

import crowd from './crowd'
store.registerModule('crowd', crowd);

import message from './message'
store.registerModule('message', message);

import mygame from './mygame'
store.registerModule('mygame', mygame);

import pocket from './pocket'
store.registerModule('pocket', pocket);

import prop from './prop'
store.registerModule('prop', prop);

import propMarket from './propMarket'
store.registerModule('propMarket', propMarket);

import redpack from './redpack'
store.registerModule('redpack', redpack);

import rps from './rps'
store.registerModule('rps', rps);

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
