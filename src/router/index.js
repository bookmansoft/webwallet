import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Market from '@/pages/Market'
import Crowd from '@/pages/Crowd'
import CrowdFree from '@/pages/CrowdFree'
import CrowdInfo from '@/pages/CrowdInfo'
import CrowdOrder from '@/pages/CrowdOrder'
import CrowdPay from '@/pages/CrowdPay'
import CrowdFreeInfo from '@/pages/CrowdFreeInfo'
import CrowdMy from '@/pages/CrowdMy'
import CrowdMyInfo from '@/pages/CrowdMyInfo'
import CrowdMySale from '@/pages/CrowdMySale'
import CrowdPrePay from '@/pages/CrowdPrePay'
import Mine from '@/pages/Mine'
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
import OrderPay from '@/pages/OrderPay'
import WeChatPay from '@/pages/WeChatPay'
import MemberDrawLog from '@/pages/MemberDrawLog'
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

Vue.use(Router)

export default new Router({
  routes: [
    { path:'/', redirect:'Login' },
    { path: '/home', name: 'Home', component: Home,meta:{title:'游戏金链'} },
    { path: '/market', name: 'Market', component: Market,meta:{title:'Market'} },
    { path: '/crowd', name: 'Crowd', component: Crowd,meta:{title:'众筹-百谷王游戏金链'} },
    { path: '/crowdFree', name: 'CrowdFree', component: CrowdFree,meta:{title:'自由市场'} },
    { path: '/crowd/info', name: 'CrowdInfo', component: CrowdInfo ,meta:{title:'众筹详情-百谷王游戏金链'}},
    { path: '/crowd/order', name: 'CrowdOrder', component: CrowdOrder ,meta:{title:'确认订单'}},
    { path: '/crowd/pay', name: 'CrowdPay', component: CrowdPay ,meta:{title:'众筹订单支付'}},
    { path: '/crowd/free/info', name: 'CrowdFreeInfo', component: CrowdFreeInfo ,meta:{title:'游戏元宝信息-百谷王游戏金链'}},
    { path: '/crowd/my/info', name: 'CrowdMyInfo', component: CrowdMyInfo ,meta:{title:'我的游戏元宝'}},
    { path: '/crowd/my/sale', name: 'CrowdMySale', component: CrowdMySale ,meta:{title:'挂单出售中'}},
    { path: '/crowd/prePay', name: 'CrowdPrePay', component: CrowdPrePay ,meta:{title:'选择回报'}},
    { path: '/my/stock', name: 'CrowdMy', component: CrowdMy ,meta:{title:'CrowdMy'}},
    { path: '/mine', name: 'Mine', component: Mine ,meta:{title:'我的'}},
    { path: '/wallet', name: 'Wallet', component: Wallet ,meta:{title:'钱包'}},
    { path: '/wallet/send', name: 'WalletSend', component: WalletSend ,meta:{title:'转账'}},
    { path: '/wallet/receive', name: 'WalletReceive', component: WalletReceive ,meta:{title:'接受转账'}},
    { path: '/wallet/trans', name: 'WalletTrans', component: WalletTrans ,meta:{title:'转账交易查询'}},
    { path: '/wallet/detail', name: 'WalletDetail', component: WalletDetail ,meta:{title:'转账交易详情'}},
    { path: '/props', name: 'Props', component: Props ,meta:{title:'道具'}},
    { path: '/member', name: 'Member', component: Member ,meta:{title:'成员'}},
    { path: '/game/info', name: 'GameInfo', component: GameInfo ,meta:{title:'游戏信息'}},
    { path: '/game/intro', name: 'GameIntro', component: GameIntro ,meta:{title:'游戏Intro'}},
    { path: '/prop/detail', name: 'PropDetail', component: PropDetail ,meta:{title:'道具详情'}},
    { path: '/contract/info', name: 'ContractInfo', component: ContractInfo ,meta:{title:'交易对信息'}},
    { path: '/prop/sale/info', name: 'PropSaleInfo', component: PropSaleInfo ,meta:{title:'道具销售'}},
    { path: '/about', name: 'About', component: About ,meta:{title:'关于我们'}},
    { path: '/order/pay', name: 'OrderPay', component: OrderPay ,meta:{title:'订单支付'}},
    { path: '/wechat/pay', name: 'WeChatPay', component: WeChatPay ,meta:{title:'微信支付'}},
    { path: '/member/draw/log', name: 'MemberDrawLog', component: MemberDrawLog ,meta:{title:'成员画图日志'}},
    { path: '/message', name: 'Message', component: Message ,meta:{title:'消息'}},
    { path: '/prop/order/pay', name: 'PropOrderPay', component: PropOrderPay ,meta:{title:'道具订单支付'}},
    { path: '/redpack', name: 'RedPack', component: RedPack ,meta:{title:'红包'}},
    { path: '/redpack/act', name: 'RedPackAct', component: RedPackAct ,meta:{title:'红包Act'}},
    { path: '/mygame', name: 'MyGame', component: MyGame ,meta:{title:'我的游戏'}},
    { path: '/login', name: 'Login', component: Login ,meta:{title:'登录'}},
    { path: '/prop/receive', name: 'PropReceive', component: PropReceive ,meta:{title:'道具接收'}},
    { path: '/lucky', name: 'LuckyWheel', component: LuckyWheel ,meta:{title:'幸运大转盘'}},
    { path: '/manyRed/manage',name:'ManyRedManage',component:ManyRedManage,meta:{title:'多人红包管理'}},
    { path: '/manyRed/send',name:'ManyRedSend',component:ManyRedSend,meta:{title:'多人红包发送'}},
    { path: '/manyRed/justSend/:send_id',name:'ManyRedJustSend',component:ManyRedJustSend,meta:{title:'多人红包-即将发送'}},
    { path: '/manyRed/receive/:send_id',name:'ManyRedReceive',component:ManyRedReceive,meta:{title:'多人红包接收'}},
    { path: '/manyRed/unpack/:send_id',name:'ManyRedUnpack',component:ManyRedUnpack,meta:{title:'打开多人红包'}},
  ]
})
