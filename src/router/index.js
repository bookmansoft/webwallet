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

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'Home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/market',
      name: 'Market',
      component: Market
    },
    {
      path: '/crowd',
      name: 'Crowd',
      component: Crowd
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
    {
      path: '/wallet',
      name: 'Wallet',
      component: Wallet
    },
    {
      path: '/wallet/send',
      name: 'WalletSend',
      component: WalletSend
    },
    {
      path: '/wallet/receive',
      name: 'WalletReceive',
      component: WalletReceive
    },
    {
      path: '/wallet/trans',
      name: 'WalletTrans',
      component: WalletTrans
    },
    {
      path: '/wallet/detail',
      name: 'WalletDetail',
      component: WalletDetail
    },
    {
      path: '/props',
      name: 'Props',
      component: Props
    }
  ]
})
