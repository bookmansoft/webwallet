import remote from '../utils/remote'
import utils from '../utils/func'
import assistant from '../utils/assistant'

/**
 * 我的凭证数据集合
 */
const mod = {
    namespaced: true, //独立命名空间

    /**
     * 状态集
     */
    state: {
        list: [],           //众筹条目缓存列表
        logs: [],           //日志列表
        bonus: 0,           //累计收益
        pageMax: 1,         //网络获取的最大页数
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
        merge(state, arr) {
            state.list = state.list.concat(arr);
        },
        add(state, msg) {
            state.list.push(msg);
        },
        mergeLog(state, arr) {
            state.logs = state.logs.concat(arr);
        },
        setBonus(state, val) {
            state.bonus = val;
        },
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
                    func: "stockMgr.MyStock", 
                    page: curPage+1,
                });
                if (res.code == 0) {
                    //设定最大页数
                    if(context.state.pageMax != res.data.total) {
                        context.commit('setPage', res.data.total);
                    }

                    let qryPage = Math.min(res.data.total, res.data.page); //数据修复：查询页数不能大于总页数
                    if(curPage < qryPage) { //说明获得了新的内容
                        console.log('stockMine.pull', res.data.list);
                        res.data.list.forEach(item => {
                            item.validtime = utils.formatDateStr(new Date(Date.parse(new Date()) - (res.data.height - item.period)*600*1000), 'yyyy-MM-dd HH:mm:ss');
                        });
                        context.commit('merge', res.data.list);
                    }
                }
            }

            return curPage < context.state.pageMax;
        },
        async bid(context, params) {
            let res = await remote.fetching({
                func:'stockMgr.bidStock',
                params: {
                  addr: params.addr,
                  cid: params.cid,
                  price: params.price,
                  num: params.num,
                }
            });
            return res;
        },
        async UserStockLogs(context, params) {
            let res = await remote.fetching({
                func: 'stockMgr.UserStockLogs', 
                cid: params.cid, 
                addr: params.addr,
            });

            if(res.code == 0) {
              let bo = 0;
              for(let item of res.data.list) {
                if(item.type == 4) {
                  bo += item.price;
                } else if(item.type == 2 || item.type == 3 || item.type == 7) {
                  item.time = utils.formatDateStr(new Date(Date.parse(new Date()) - (res.data.height - item.height)*600*1000), 'yyyy-MM-dd HH:mm:ss');
                }
              }
              context.commit('mergeLog', res.data.list);
              context.commit('setBonus', parseFloat(bo/assistant.unit.kg).toFixed(3));
            }
    
            return res;
        }
    },     
}

export default mod;
