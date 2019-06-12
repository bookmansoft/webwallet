import remote from '../utils/remote'

/**
 * 道具数据集合
 */
const mod = {
    namespaced: true, //独立命名空间

    /**
     * 状态集
     */
    state: {
        list: [],           //众筹条目缓存列表
        logs: [],           //消费流水
        pageMax: 1,         //网络获取的最大页数
        menu: [
          {
            label: '转账',
            tag: 'send',
            index: 0,
            icon: 'static/img/icon1/7.png',
            link: '/wallet/send'
          }, {
            label: '收款',
            tag: 'receive',
            index: 1,
            icon: 'static/img/icon1/1.png',
            link: '/wallet/receive'
          },{
            label: '交易流水',
            tag: 'detail',
            index: 2,
            icon: 'static/img/icon1/3.png',
            link: '/wallet/detail'
          },{
            label: '发布交易对',
            tag: 'trans',
            index: 3,
            icon: 'static/img/icon1/5.png',
            link: '/wallet/trans'
          },{
            label: '多人红包',
            tag: 'manyRedManage',
            index: 4,
            icon: 'static/img/icon1/5.png',
            link: '/redpackshared'
          },
        ],
    },
    getters: {
        list: (state) => {
            return state.list;
        },
    },
    /**
     * 状态修改函数，必须是同步函数
     * @description 更改状态的唯一方法是提交 mutation: this.$store.commit
     */
    mutations: {
        setPage(state, page) {
            state.pageMax = page;
        },
        clear(state) {
            state.list = [];
            state.pageMax = 1;
        },
        add(state, msg) {
            state.list.push(msg);
        },
        mergeLog(state, arr) {
            state.logs = state.logs.concat(arr);
        }
    },  
    /**
     * 交互函数，可以是同步或者异步函数，可以完全封装状态修改函数(就像 React 的做法)
     * 在交互函数内部还可以继续 context.dispatch 或者 context.commit, 可以使用 await 语法
     * @description actions 类似于mutations, 不过Action 提交的是 mutation，而不是直接变更状态,而且可以包含任意异步操作: this.$store.dispatch
     */
    actions: {
        clear(context) {
            context.commit('clear');
        },
        add(context, item) {
            context.commit('add', item);
        },
        merge(context, list) {
            for(let item of list) {
                context.commit('add', item);
            }
        },
        /**
         * 从网络获取内容追加至列表
         * @param {*} context 
         */
        async pull(context) {
            let curPage = ((context.state.list.length/10)|0) + 1;
            if(context.state.list.length%10==0) {
                curPage--;
            }

            if(curPage < context.state.pageMax) {
                let res = await remote.fetching({
                    func: "wallet.list", 
                    page: curPage+1,
                });
                if (res.code == 0) {
                    //设定最大页数
                    if(context.state.pageMax != res.data.total) {
                        context.commit('setPage', res.data.total);
                    }

                    let qryPage = Math.min(res.data.total, res.data.page); //数据修复：查询页数不能大于总页数
                    if(curPage < qryPage) { //说明获得了新的内容
                        console.log('wallet.pull', res.data.list);
                        res.data.list.forEach(item => {
                            context.dispatch('add', item);
                      });
                    }
                }
            }

            return curPage < context.state.pageMax;
        },
        /**
         * 为当前用户创建一个新的地址
         * @param {*} context 
         * @param {*} params 
         */
        async createaddress(context, params) {
            let res = await remote.fetching({func:'wallet.AddressCreate',});
            return res;
        },
        /**
         * 转账
         * @param {*} context 
         * @param {*} params 
         */
        async send(context, params) {
            let res = await remote.fetching({
                func: "wallet.TxSend",
                addr: params.addr,
                amount: params.amount,
            });
            return res;
        },
        /**
         * 支付订单
         * @param {*} context 
         * @param {*} params 
         */
        async orderpay(context, params) {
            let res = await remote.fetching({
                func:'wallet.NotifyOrderPay',
                sn: params.sn,
            });
            return res;
        },
        async prepay(context, params) {
            let res = await remote.fetching({
                func: 'order.prepay',
                order: params.order,
            });
            return res;
        },
        async OrderPayResult(context, params) {
            let res = await remote.fetching({
                func: 'order.OrderPayResult',
                tradeId: params.tradeId,
                status: params.status,
            });
            return res;
        },
        async getLog(context, params) {
            let res = await remote.fetching({func:'wallet.TxLogs',});
            if(res.code == 0) {
                for(let item of res.data.list) {
                    if(item.amount != 0) {
                        item.is_link = false;
                        item.link = {path:'/wallet'};
                        item.badge = 0;
                        item.title = this.utils.formatDateStr(new Date(item.time*1000), 'MM-dd HH:mm:ss');
                        if(item.category=='receive') {
                            item.img = '/static/img/wallet/rec.png'
                            item.desc = '接收 ' + this.assistant.toKg(item.amount * 10000 * 10000) + '千克'
                        } else {
                            item.img = '/static/img/wallet/send.png'
                            item.desc = '发送 ' + this.assistant.toKg(item.amount * 10000 * 10000) + '千克'
                        }
                    }
                }
                context.commit('mergeLog', res.data.list);
            }
            return res;
        },
        /**
         * 使用游戏金支付
         * @param {*} context 
         * @param {*} params 
         */
        async pay(context, params) {
            let res = await remote.fetching({
                func:'order.OrderPay', 
                cid: params.cid,
                sn: params.sn,
                price: params.price,
            });
            return res;
        }
    }
}

export default mod;
