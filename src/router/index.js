import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Market from '@/pages/Market'
import Crowd from '@/pages/Crowd'
import Mine from '@/pages/Mine'
import Wallet from '@/pages/Wallet'
import WalletSend from '@/pages/WalletSend'
import WalletReceive from '@/pages/WalletReceive'
import WalletTrans from '@/pages/WalletTrans'
import WalletDetail from '@/pages/WalletDetail'
import Props from '@/pages/Props'
import GameInfo from '@/pages/GameInfo'
import PropDetail from '@/pages/PropDetail'
import ContractInfo from '@/pages/ContractInfo'
import PropSaleInfo from '@/pages/PropSaleInfo'
import About from '@/pages/About'
import Member from '@/pages/Member'
import OrderPay from '@/pages/OrderPay'
import MemberDrawLog from '@/pages/MemberDrawLog'
import Message from '@/pages/Message'
import PropOrderPay from '@/pages/PropOrderPay'
import RedPack from '@/pages/RedPack'
import MyGame from '@/pages/MyGame'

Vue.use(Router)

export default new Router({
  routes: [
    { path:'/', redirect:'Home' },
    { path: '/home', name: 'Home', component: Home },
    { path: '/market', name: 'Market', component: Market },
    { path: '/crowd', name: 'Crowd', component: Crowd },
    { path: '/mine', name: 'Mine', component: Mine },
    { path: '/wallet', name: 'Wallet', component: Wallet },
    { path: '/wallet/send', name: 'WalletSend', component: WalletSend },
    { path: '/wallet/receive', name: 'WalletReceive', component: WalletReceive },
    { path: '/wallet/trans', name: 'WalletTrans', component: WalletTrans },
    { path: '/wallet/detail', name: 'WalletDetail', component: WalletDetail },
    { path: '/props', name: 'Props', component: Props },
    { path: '/member', name: 'Member', component: Member },
    { path: '/game/info', name: 'GameInfo', component: GameInfo },
    { path: '/prop/detail', name: 'PropDetail', component: PropDetail },
    { path: '/contract/info', name: 'ContractInfo', component: ContractInfo },
    { path: '/prop/sale/info', name: 'PropSaleInfo', component: PropSaleInfo },
    { path: '/about', name: 'About', component: About },
    { path: '/order/pay', name: 'OrderPay', component: OrderPay },
    { path: '/member/draw/log', name: 'MemberDrawLog', component: MemberDrawLog },
    { path: '/message', name: 'Message', component: Message },
    { path: '/prop/order/pay', name: 'PropOrderPay', component: PropOrderPay },
    { path: '/redpack', name: 'RedPack', component: RedPack },
    { path: '/mygame', name: 'MyGame', component: MyGame },
  ]
})
