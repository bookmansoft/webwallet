import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Market from '@/pages/Market'
import Crowd from '@/components/Crowd'
import Pocket from '@/components/Pocket'
import ItemInfo from '@/pages/ItemInfo'
import CrowdFree from '@/pages/CrowdFree'
import CrowdInfo from '@/pages/CrowdInfo'
import CrowdOrder from '@/pages/CrowdOrder'
import CrowdFreeInfo from '@/pages/CrowdFreeInfo'
import CrowdMy from '@/pages/CrowdMy'
import CrowdMyInfo from '@/pages/CrowdMyInfo'
import CrowdMySale from '@/pages/CrowdMySale'
import CrowdPrePay from '@/pages/CrowdPrePay'
import CrowdFreeOrder from '@/pages/CrowdFreeOrder'
import Mine from '@/pages/Mine'
import MyWallet from '@/pages/MyWallet'
import Wallet from '@/pages/Wallet'
import WalletSend from '@/pages/WalletSend'
import WalletReceive from '@/pages/WalletReceive'
import WalletTrans from '@/pages/WalletTrans'
import WalletDetail from '@/pages/WalletDetail'
import Props from '@/pages/Props'
import GameInfo from '@/pages/GameInfo'
import GameIntro from '@/pages/GameIntro'
import PropDetail from '@/pages/PropDetail'
import ContractInfo from '@/pages/ContractInfo'
import PropSaleInfo from '@/pages/PropSaleInfo'
import PropReceive from '@/pages/PropReceive'
import About from '@/pages/About'
import Member from '@/pages/Member'
import WeChatPay from '@/pages/WeChatPay'
import Message from '@/pages/Message'
import PropOrderPay from '@/pages/PropOrderPay'
import RedPack from '@/pages/RedPack'
import RedPackAct from '@/pages/RedPackAct'
import MyGame from '@/pages/MyGame'
import Login from '@/components/Login'
import LuckyWheel from '@/components/luckywheel'
import ManyRedManage from '@/pages/ManyRedManage';
import ManyRedSend from '@/pages/ManyRedSend';
import ManyRedJustSend from '@/pages/ManyRedJustSend';
import ManyRedReceive from '@/pages/ManyRedReceive';
import ManyRedUnpack from '@/pages/ManyRedUnpack';

import BuySuccess from '@/pages/BuySuccess';
import BuyFail from '@/pages/BuyFail';
import PaySuccess from '@/pages/PaySuccess';
import HouseAddress from '@/pages/HouseAddress';
import HouseAddressAdd from '@/pages/HouseAddressAdd';
import SendSuccess from '@/pages/SendSuccess';
import SendFail from '@/pages/SendFail';
import SendConfirm from '@/pages/SendConfirm';

import TransList from '@/pages/TransList';


Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: __dirname,
  routes: [
    { path:'/', redirect:'Login' },
    { path: '/login', name: 'Login', component: Login ,meta:{title:'登录'}},
    { path: '/home', name: 'Home', component: Home,meta:{title:'游戏金链'} },
    { path: '/about', name: 'About', component: About ,meta:{title:'关于我们'}},
    { path: '/member', name: 'Member', component: Member ,meta:{title:'成员'}},
    { path: '/mine', name: 'Mine', component: Mine ,meta:{title:'我的'}},
    { path: '/mywallet', name: 'MyWallet', component: MyWallet ,meta:{title:'我的钱包'}},
    { path: '/mygame', name: 'MyGame', component: MyGame ,meta:{title:'我的游戏'}},

    { path: '/message', name: 'Message', component: Message ,meta:{title:'消息'}},

    { path: '/market', name: 'Market', component: Market,meta:{title:'Market'} },
    { path: '/pocket', name: 'Pocket', component: Pocket,meta:{title:'背包'} },
    { path: '/pocket/info', name: 'ItemInfo', component: ItemInfo ,meta:{title:'背包 - 道具详情'}},

    { path: '/crowd', name: 'Crowd', component: Crowd,meta:{title:'众筹-百谷王游戏金链'} },
    { path: '/crowd/info', name: 'CrowdInfo', component: CrowdInfo ,meta:{title:'众筹详情-百谷王游戏金链'}},
    { path: '/crowd/order', name: 'CrowdOrder', component: CrowdOrder ,meta:{title:'确认订单'}},
    { path: '/crowd/prePay', name: 'CrowdPrePay', component: CrowdPrePay ,meta:{title:'选择回报'}},
    { path: '/crowd/SendSuccess', name: 'SendSuccess', component: SendSuccess ,meta:{title:'发送成功'}},
    { path: '/crowd/SendFail', name: 'SendFail', component: SendFail ,meta:{title:' 发送失败'}},
    { path: '/crowd/SendConfirm', name: 'SendConfirm', component: SendConfirm ,meta:{title:'发送确认'}},
    { path: '/crowd/TransList', name: 'TransList', component: TransList ,meta:{title:'交易清单'}},
    { path: '/crowd/BuySuccess', name: 'BuySuccess', component: BuySuccess ,meta:{title:'购买成功'}},
    { path: '/crowd/BuyFail', name: 'BuyFail', component: BuyFail ,meta:{title:' 购买失败'}},
    { path: '/crowd/PaySuccess', name: 'PaySuccess', component: PaySuccess ,meta:{title:'支付成功'}},
    { path: '/crowd/HouseAddress', name: 'HouseAddress', component: HouseAddress ,meta:{title:'收货地址'}},
    { path: '/crowd/HouseAddressAdd', name: 'HouseAddressAdd', component: HouseAddressAdd ,meta:{title:'添加收货地址'}},

    { path: '/my/stock', name: 'CrowdMy', component: CrowdMy ,meta:{title:'CrowdMy'}},
    { path: '/crowd/my/info', name: 'CrowdMyInfo', component: CrowdMyInfo ,meta:{title:'我的游戏元宝'}},
    { path: '/crowd/my/sale', name: 'CrowdMySale', component: CrowdMySale ,meta:{title:'挂单出售中'}},

    { path: '/crowd/freeOrder', name: 'CrowdFreeOrder', component: CrowdFreeOrder ,meta:{title:'自由市场-确认订单'}},
    { path: '/crowd/free/info', name: 'CrowdFreeInfo', component: CrowdFreeInfo ,meta:{title:'游戏元宝信息-百谷王游戏金链'}},
    { path: '/crowdFree', name: 'CrowdFree', component: CrowdFree,meta:{title:'自由市场'} },

    { path: '/wallet', name: 'Wallet', component: Wallet ,meta:{title:'钱包'}},
    { path: '/wallet/send', name: 'WalletSend', component: WalletSend ,meta:{title:'转账'}},
    { path: '/wallet/receive', name: 'WalletReceive', component: WalletReceive ,meta:{title:'接受转账'}},
    { path: '/wallet/trans', name: 'WalletTrans', component: WalletTrans ,meta:{title:'交易对'}},
    { path: '/wallet/detail', name: 'WalletDetail', component: WalletDetail ,meta:{title:'交易流水'}},
    { path: '/redpack', name: 'RedPack', component: RedPack ,meta:{title:'红包'}},
    { path: '/redpack/act', name: 'RedPackAct', component: RedPackAct ,meta:{title:'红包Act'}},

    { path: '/manyRed/manage',name:'ManyRedManage',component:ManyRedManage,meta:{title:'多人红包管理'}},
    { path: '/manyRed/send',name:'ManyRedSend',component:ManyRedSend,meta:{title:'多人红包发送'}},
    { path: '/manyRed/justSend/:send_id',name:'ManyRedJustSend',component:ManyRedJustSend,meta:{title:'多人红包-即将发送'}},
    { path: '/manyRed/receive/:send_id',name:'ManyRedReceive',component:ManyRedReceive,meta:{title:'多人红包接收'}},
    { path: '/manyRed/unpack/:send_id',name:'ManyRedUnpack',component:ManyRedUnpack,meta:{title:'打开多人红包'}},

    { path: '/props', name: 'Props', component: Props ,meta:{title:'道具'}},
    { path: '/prop/detail', name: 'PropDetail', component: PropDetail ,meta:{title:'道具详情'}},
    { path: '/prop/receive', name: 'PropReceive', component: PropReceive ,meta:{title:'道具接收'}},
    { path: '/prop/order/pay', name: 'PropOrderPay', component: PropOrderPay ,meta:{title:'道具订单支付'}},
    { path: '/prop/sale/info', name: 'PropSaleInfo', component: PropSaleInfo ,meta:{title:'道具销售'}},

    { path: '/game/info', name: 'GameInfo', component: GameInfo ,meta:{title:'游戏信息'}},
    { path: '/game/intro', name: 'GameIntro', component: GameIntro ,meta:{title:'游戏Intro'}},

    { path: '/contract/info', name: 'ContractInfo', component: ContractInfo ,meta:{title:'交易对信息'}},

    { path: '/wechat/pay', name: 'WeChatPay', component: WeChatPay ,meta:{title:'微信支付'}},

    { path: '/lucky', name: 'LuckyWheel', component: LuckyWheel ,meta:{title:'幸运大转盘'}},
  ]
})
