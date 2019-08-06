import ConfigMgr from '../utils/ConfigMgr'
import remote from '../utils/remote'

/**
 * 众筹数据集合
 */
const mod = {
    namespaced: true, //独立命名空间

    /**
     * 状态集
     */
    state: {
        list: [],           //众筹条目缓存列表
        pageMax: 1,         //网络获取的最大页数
        configList: [],     //配置信息列表形式
        configDict: {},     //配置信息属性对象形式
    },
    /**
     * 状态修改函数，必须是同步函数
     * @description 更改状态的唯一方法是提交 mutation: this.$store.commit
     */
    mutations: {
        configChanged(state, msg) {
            state.configList = msg;
            state.configDict = msg.reduce((sofar,cur)=>{
                sofar[cur.payType] = cur;
                return sofar;
              }, {});
        }, 
        setpage(state, page) {
            state.pageMax = page;
        },
        clear(state) {
            state.list = [];
        },
        add(state, msg) {
            state.list.push(msg);
        }
    },  
    /**
     * 交互函数，可以是同步或者异步函数，可以完全封装状态修改函数(就像 React 的做法)
     * 在交互函数内部还可以继续 context.dispatch 或者 context.commit, 可以使用 await 语法
     * @description actions 类似于mutations, 不过Action 提交的是 mutation，而不是直接变更状态,而且可以包含任意异步操作: this.$store.dispatch
     */
    actions: {
        async getConfig (context) {
            return new Promise((resolve, reject) =>{
                ConfigMgr.get('crowd', (err, config) => {
                    if(!err) {
                        context.commit('configChanged', config);
                        resolve(config);
                    } else {
                        reject(err);
                    }
                });
            });
        },
        clear(context) {
            context.commit('clear');
        },
        merge(context, list) {
            for(let crowdItem of list) {
                crowdItem.percent2 = ((crowdItem.sum - crowdItem.sum_left) * 100 / crowdItem.sum) | 0;
                crowdItem.pic_urls = JSON.parse(crowdItem.pic_urls);
                context.commit('add', crowdItem);
            }
        },
        /**
         * 从网络获取内容追加至列表
         * @param {*} context 
         */
        async pull(context) {
            let curPage = (context.state.list.length/10)|0 + 1;
            if(context.state.list.length%10==0) {
                curPage--;
            }

            if(curPage < context.state.pageMax) {
                let res = await remote.fetching({
                    func: "stockMgr.getCrowdList", 
                    page: curPage+1,
                });
                if (res.code == 0) {
                    //设定最大页数
                    if(context.state.pageMax != res.data.total) {
                        context.commit('setPage', res.data.total);
                    }

                    let qryPage = Math.min(res.data.total, res.data.page); //数据修复：查询页数不能大于总页数
                    if(curPage < qryPage) { //说明获得了新的内容
                        console.log('crowd.pull', res.data.list);
                        res.data.list.forEach(item => {
                            context.commit('add', item);
                        });
                    }
                }
            }

            return curPage < context.state.pageMax;
        },
    },     
}

export default mod;
