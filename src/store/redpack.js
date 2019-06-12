import remote from '../utils/remote'

/**
 * 红包交互指令
 */
const mod = {
    namespaced: true, //独立命名空间

    /**
     * 状态集
     */
    state: {
    },
    getters: {
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
        async RedPackActCurrent(context, params) {
            let res = await remote.fetching({
                func:'redact.RedPackActCurrent',
                ...params, //用解构符合并 params 中的属性到整个参数数组，如果 params==null 则自动忽略
            });
            return res;
        },
        async UserRedPackAct(context, params) {
            let res = await remote.fetching({
                func:'redact.UserRedPackAct', 
                ...params,
            });
            return res;
        },
        async UserRedPack(context, params) {
            let res = await remote.fetching({
                func:'redact.UserRedPack',  
                ...params,
            });
            return res;
        },
        async UserRedPackAdd(contxt, params) {
            let res = await remote.fetching({
                func:'redact.UserRedPackAdd',
                ...params,
            });
            return res;
        },
        async UserRedPackSend(context, params) {
            let res = await remote.fetching({
                func:'redact.UserRedPackSend',
                ...params,
            });
            return res;
        }
    },     
}

export default mod;
