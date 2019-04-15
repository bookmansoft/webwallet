import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Market from '@/pages/Market'
import Crowd from '@/pages/Crowd'
import CrowdInfo from '@/pages/CrowdInfo'
import CrowdOrder from '@/pages/CrowdOrder'
import CrowdPay from '@/pages/CrowdPay'
import CrowdFreeInfo from '@/pages/CrowdFreeInfo'
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
import UserBind from '@/components/UserBind'
import Login from '@/components/Login'
import LuckyWheel from '@/components/luckywheel'
import ManyRedManage from '@/pages/ManyRedManage';
import ManyRedSend from '@/pages/ManyRedSend';
import ManyRedJustSend from '@/pages/ManyRedJustSend';
import ManyRedReceive from '@/pages/ManyRedReceive';

Vue.use(Router)

export default new Router({
  routes: [
    { path:'/', redirect:'Login' },
    { path: '/home', name: 'Home', component: Home },
    { path: '/market', name: 'Market', component: Market },
    { path: '/crowd', name: 'Crowd', component: Crowd },
    { path: '/crowd/info', name: 'CrowdInfo', component: CrowdInfo },
    { path: '/crowd/order', name: 'CrowdOrder', component: CrowdOrder },
    { path: '/crowd/pay', name: 'CrowdPay', component: CrowdPay },
    { path: '/crowd/free/info', name: 'CrowdFreeInfo', component: CrowdFreeInfo },
    { path: '/mine', name: 'Mine', component: Mine },
    { path: '/wallet', name: 'Wallet', component: Wallet },
    { path: '/wallet/send', name: 'WalletSend', component: WalletSend },
    { path: '/wallet/receive', name: 'WalletReceive', component: WalletReceive },
    { path: '/wallet/trans', name: 'WalletTrans', component: WalletTrans },
    { path: '/wallet/detail', name: 'WalletDetail', component: WalletDetail },
    { path: '/props', name: 'Props', component: Props },
    { path: '/member', name: 'Member', component: Member },
    { path: '/game/info', name: 'GameInfo', component: GameInfo },
    { path: '/game/intro', name: 'GameIntro', component: GameIntro },
    { path: '/prop/detail', name: 'PropDetail', component: PropDetail },
    { path: '/contract/info', name: 'ContractInfo', component: ContractInfo },
    { path: '/prop/sale/info', name: 'PropSaleInfo', component: PropSaleInfo },
    { path: '/about', name: 'About', component: About },
    { path: '/order/pay', name: 'OrderPay', component: OrderPay },
    { path: '/wechat/pay', name: 'WeChatPay', component: WeChatPay },
    { path: '/member/draw/log', name: 'MemberDrawLog', component: MemberDrawLog },
    { path: '/message', name: 'Message', component: Message },
    { path: '/prop/order/pay', name: 'PropOrderPay', component: PropOrderPay },
    { path: '/redpack', name: 'RedPack', component: RedPack },
    { path: '/redpack/act', name: 'RedPackAct', component: RedPackAct },
    { path: '/mygame', name: 'MyGame', component: MyGame },
    { path: '/user/bind', name: 'UserBind', component: UserBind },
    { path: '/login', name: 'Login', component: Login },
    { path: '/prop/receive', name: 'PropReceive', component: PropReceive },
    { path: '/lucky', name: 'LuckyWheel', component: LuckyWheel },
    { path: '/manyRed/manage',name:'ManyRedManage',component:ManyRedManage},
    { path: '/manyRed/send',name:'ManyRedSend',component:ManyRedSend},
    { path: '/manyRed/justSend',name:'ManyRedJustSend',component:ManyRedJustSend},
    { path: '/manyRed/receive',name:'ManyRedReceive',component:ManyRedReceive},
  ]
})
