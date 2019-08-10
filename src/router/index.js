import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Market from '@/pages/Market'
import Crowds from '@/pages/Crowds'
import Pocket from '@/pages/Pocket'
import ItemInfo from '@/pages/ItemInfo'
import Stocks from '@/pages/Stocks'
import CrowdInfo from '@/pages/CrowdInfo'
import CrowdOrder from '@/pages/CrowdOrder'
import StockInfo from '@/pages/StockInfo'
import StocksMine from '@/pages/StocksMine'
import MyStockInfo from '@/pages/MyStockInfo'
import MyStockSale from '@/pages/MyStockSale'
import CrowdPrePay from '@/pages/CrowdPrePay'
import StockOrder from '@/pages/StockOrder'
import Mine from '@/pages/Mine'
import Wallet from '@/pages/Wallet'
import WalletSend from '@/pages/WalletSend'
import WalletReceive from '@/pages/WalletReceive'
import WalletTrans from '@/pages/WalletTrans'
import WalletDetail from '@/pages/WalletDetail'
import Props from '@/pages/Props'
import GameInfo from '@/pages/GameInfo'
import PropDetail from '@/pages/PropDetail'
import MailReader from '@/pages/MailReader'
import PropSend from '@/pages/PropSend'
import PropSaleInfo from '@/pages/PropSaleInfo'
import PropReceive from '@/pages/PropReceive'
import ContractInfo from '@/pages/ContractInfo'
import About from '@/pages/About'
import Member from '@/pages/Member'
import WeChatPay from '@/pages/WeChatPay'
import Message from '@/pages/Message'
import RedPackAct from '@/pages/RedPackAct'
import MyGame from '@/pages/MyGame'
import Login from '@/pages/Login'
import LuckyWheel from '@/pages/luckywheel'
import RedPackShared from '@/pages/RedPackShared';
import RedPackSharedSend from '@/pages/RedPackSharedSend';
import RedPackSharedCommit from '@/pages/RedPackSharedCommit';
import RedPackSharedReceive from '@/pages/RedPackSharedReceive';
import RedPackSharedOpen from '@/pages/RedPackSharedOpen';
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
  mode: 'history',
  base: __dirname,
  routes: [
    { path:'/', redirect:'Login' },
    { path: '/login', name: 'Login', component: Login ,meta:{title:'Vallnet'}},
    { path: '/home', name: 'Home', component: Home,meta:{title:'Vallnet'} },
    { path: '/about', name: 'About', component: About ,meta:{title:'关于我们'}},
    { path: '/member', name: 'Member', component: Member ,meta:{title:'成员'}},
    { path: '/mine', name: 'Mine', component: Mine ,meta:{title:'我的'}},
    { path: '/mygame', name: 'MyGame', component: MyGame ,meta:{title:'我的游戏'}},

    { path: '/message', name: 'Message', component: Message ,meta:{title:'消息'}},
    { path: '/message/read', name: 'MailReader', component: MailReader ,meta:{title:'邮件阅读'}},

    { path: '/market', name: 'Market', component: Market,meta:{title:'Market'} },

    { path: '/pocket', name: 'Pocket', component: Pocket,meta:{title:'背包'} },
    { path: '/pocket/info', name: 'ItemInfo', component: ItemInfo ,meta:{title:'背包 - 道具详情'}},

    { path: '/crowds', name: 'Crowds', component: Crowds,meta:{title:'众筹-百谷王游戏金链'} },
    { path: '/crowd/my', name: 'StocksMine', component: StocksMine ,meta:{title:'StocksMine'}},
    { path: '/crowd/my/info', name: 'MyStockInfo', component: MyStockInfo ,meta:{title:'代练宝宝'}},
    { path: '/crowd/my/sale', name: 'MyStockSale', component: MyStockSale ,meta:{title:'挂单出售中'}},
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

    { path: '/stocks', name: 'Stocks', component: Stocks, meta:{title:'自由市场'} },
    { path: '/stocks/order', name: 'StockOrder', component: StockOrder ,meta:{title:'自由市场-确认订单'}},
    { path: '/stocks/info', name: 'StockInfo', component: StockInfo ,meta:{title:'游戏元宝信息-百谷王游戏金链'}},

    { path: '/wallet', name: 'Wallet', component: Wallet ,meta:{title:'我的钱包'}},
    { path: '/wallet/send', name: 'WalletSend', component: WalletSend ,meta:{title:'转账'}},
    { path: '/wallet/receive', name: 'WalletReceive', component: WalletReceive ,meta:{title:'接受转账'}},
    { path: '/wallet/trans', name: 'WalletTrans', component: WalletTrans ,meta:{title:'交易对'}},
    { path: '/wallet/detail', name: 'WalletDetail', component: WalletDetail ,meta:{title:'交易流水'}},

    { path: '/redpack/act', name: 'RedPackAct', component: RedPackAct ,meta:{title:'红包Act'}},
    { path: '/redpackshared',name:'RedPackShared', component: RedPackShared, meta:{title:'多人红包管理'}},
    { path: '/redpackshared/send',name:'RedPackSharedSend', component:RedPackSharedSend, meta:{title:'多人红包发送'}},
    { path: '/redpackshared/justSend/:send_id',name:'RedPackSharedCommit', component:RedPackSharedCommit, meta:{title:'多人红包-即将发送'}},
    { path: '/redpackshared/unpack/:send_id',name:'RedPackSharedOpen',component:RedPackSharedOpen, meta:{title:'打开多人红包'}},
    { path: '/redpackshared/receive/:send_id',name:'RedPackSharedReceive', component:RedPackSharedReceive, meta:{title:'多人红包接收'}},

    { path: '/props', name: 'Props', component: Props ,meta:{title:'道具背包'}},
    { path: '/prop/detail', name: 'PropDetail', component: PropDetail ,meta:{title:'道具详情'}},
    { path: '/prop/receive', name: 'PropReceive', component: PropReceive ,meta:{title:'道具接收'}},
    { path: '/prop/send', name: 'PropSend', component: PropSend ,meta:{title:'道具发送'}},
    { path: '/prop/sale/info', name: 'PropSaleInfo', component: PropSaleInfo ,meta:{title:'道具销售'}},

    { path: '/game/info', name: 'GameInfo', component: GameInfo ,meta:{title:'游戏信息'}},

    { path: '/contract/info', name: 'ContractInfo', component: ContractInfo ,meta:{title:'交易对信息'}},

    { path: '/wechat/pay', name: 'WeChatPay', component: WeChatPay ,meta:{title:'微信支付'}},

    { path: '/lucky', name: 'LuckyWheel', component: LuckyWheel ,meta:{title:'幸运大转盘'}},
  ]
})
