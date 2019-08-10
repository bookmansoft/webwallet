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
        add(state, msg) {
            state.list.push(msg);
        },
        merge(state, list) {
            state.list = state.list.concat(list);
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
            context.commit('merge', list);
        },
        /**
         * 从网络获取内容追加至列表
         * @param {*} context 
         */
        async pull(context) {
            let curPage = ((context.state.list.length/10)|0) + 1; //备注： `|` 的运算等级低于 `+`
            if(context.state.list.length%10==0) {
                curPage--;
            }

            if(curPage < context.state.pageMax) {
                let res = await remote.fetching({
                    func: "prop.list", 
                    page: curPage+1,
                });
                if (res.code == 0) {
                    //设定最大页数
                    if(context.state.pageMax != res.data.total) {
                        context.commit('setPage', res.data.total);
                    }

                    let qryPage = Math.min(res.data.total, res.data.page); //数据修复：查询页数不能大于总页数
                    if(curPage < qryPage) { //说明获得了新的内容
                        res.data.list.forEach(prop => {
                            let url = `${prop.cpurl}/prop/${prop.oid}`;
                            remote.get(encodeURI(url)).then(res => {
                                Object.assign(prop, res);
                                prop.src = prop.icon;
                                prop.title = prop.props_name;
                                prop.desc = prop.props_desc;
                            });
                      });
                      console.log('prop.pull', res.data.list);
                      context.commit('merge', res.data.list);
                    }
                }
            }

            return curPage < context.state.pageMax;
        },
        /**
         * 出售道具
         * @param {*} context 
         * @param {*} params 
         */
        async sale(context, params) {
            let res = await remote.fetching({
                func: 'prop.sale',
                pid: params.pid,
                fixedPrice: params.fixedPrice,
            });
            return res;
        }
    },     
}

export default mod;
