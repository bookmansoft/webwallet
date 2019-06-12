import remote from '../utils/remote'

/**
 * 游戏数据集合
 */
const mod = {
    namespaced: true, //独立命名空间

    state: {
        list: [],   //CP列表，用于分页显示，注意为了节省空间，只存放CP编码
        dict: {},   //CP字典，以CP编码为索引，用于快速索引CP对象
        pageMax: 1, //网络获取的最大页数
    },
    getters: {
        list: (state) => {
            return state.list.map(id=>state.dict[id]);
        },
    },
    mutations: {
        /**
         * 添加新的条目(自动去重)
         * @param {*} state 
         * @param {*} msg 
         */
        add(state, item) {
            state.dict[item.cpid] = item;
            if(!state.list.includes(item.cpid)) {
                state.list.push(item.cpid);
            }
        },
        /**
         * 添加一批新的条目(自动去重)
         * @param {*} state 
         * @param {*} arr 
         */
        merge(state, arr) {
            let ls = [];
            for(let item of arr) {
                state.dict[item.cpid] = item;
                if(!state.list.includes(item.cpid)) {
                    ls.push(item.cpid);
                }
            }
            state.list = state.list.concat(ls);
        },
        setPage(state, page) {
            state.pageMax = page;
        },
        clear(state) {
            state.list = [];
            state.dict = {};
            state.pageMax = 1;
        },
    },  
    actions: {
        merge (context, arr) {
            context.commit('merge', arr);
        },
        clear(context) {
            context.commit('clear');
        },
        add (context, item) {
            context.commit('add', item);
        },
        /**
         * 从网络获取内容追加至列表
         * @param {*} context 
         */
        async pull(context, selection) {
            let curPage = ((context.state.list.length/10)|0) + 1;
            if(context.state.list.length%10==0) {
                curPage--;
            }

            if(curPage < context.state.pageMax) {
                let res = await remote.fetching({
                    func: "cp.List", 
                    category: selection ? (selection.category || 0) : 0,
                    page: curPage+1,
                });
                if (res.code == 0) {
                    //设定最大页数
                    if(context.state.pageMax != res.data.total) {
                        context.commit('setPage', res.data.total);
                    }

                    let qryPage = Math.min(res.data.total, res.data.page); //数据修复：查询页数不能大于总页数
                    if(curPage < qryPage) { //说明获得了新的内容
                        console.log('cp.pull', res.data.list, selection);
                        res.data.list.forEach(item => {
                            //...如果需要进行数据调整，在这里书写
                        });
                        context.commit('merge', res.data.list);
                    }
                }
            }

            return curPage < context.state.pageMax;
        },
        async UserToken(context, params) {
            let res = await remote.fetching({
                func:'cp.UserToken', 
                ...params,
            });
            return res;
        },
        async getProps(context, params) {
            let res = await remote.fetching({
                func:'cp.getProps', 
                ...params,
            });
            return res;
        }
    },     
}

export default mod;