import remote from '../utils/remote'

/**
 * 多人红包交互指令
 */
const mod = {
    namespaced: true, //独立命名空间

    /**
     * 状态集
     */
    state: {
    },
    /**
     * 状态修改函数，必须是同步函数
     * @description 更改状态的唯一方法是提交 mutation: this.$store.commit
     */
    mutations: {
    },  
    /**
     * 交互函数，可以是同步或者异步函数，可以完全封装状态修改函数(就像 React 的做法)
     * 在交互函数内部还可以继续 context.dispatch 或者 context.commit, 可以使用 await 语法
     * @description actions 类似于mutations, 不过Action 提交的是 mutation，而不是直接变更状态,而且可以包含任意异步操作: this.$store.dispatch
     */
    actions: {
        async send(context, params) {
            let res = await remote.fetching({
                func: "sharedredpack.Send",
                total_amount: params.total_amount,
                total_num: params.total_num,
                wishing: params.wishing,
            });
            return res;
        },
        async receive(context, params) {
            let res = await remote.fetching({
                func: "sharedredpack_receive.Receive",
                id: params.id,
            });
            return res;
        },
        /**
         * 查询多人红包详情
         * @param {*} context 
         * @param {*} params 
         */
        async view(context, params) {
            let res = await remote.fetching({
                func: "sharedredpack.Retrieve",
                ...params,
            });
            return res;
        },
    },     
}

export default mod;
