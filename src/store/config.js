import remote from '../utils/remote'

/**
 * 凭证数据集合
 */
const mod = {
    namespaced: true, //独立命名空间

    /**
     * 状态集
     */
    state: {
        dict: {},           //配置表字典
    },
    /**
     * 状态修改函数，必须是同步函数
     * @description 更改状态的唯一方法是提交 mutation: this.$store.commit
     */
    mutations: {
        clear(state) {
            state.dict = {};
        },
        add(state, msg) {
            state.dict[msg.type] = msg.content;
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
        /**
         * 从网络获取内容
         * @param {*} context 
         */
        async pull(context, params) {
            let res = await remote.fetching({
                func:'config.get', 
                file: params.file,
            });
            if(res.code == 0) {
                context.commit('add', {
                    type: params.file,
                    content: res.data,
                })
            }
            return res;
        },
    },     
}

export default mod;
