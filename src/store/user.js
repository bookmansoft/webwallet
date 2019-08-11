import remote from '../utils/remote'
import assistant from '../utils/assistant'

/**
 * 用户数据集合
 */
const mod = {
    namespaced: true, //独立命名空间

    /**
     * 状态集
     */
    state: {
        /**
         * 存储认证过的用户对象
         */
        auth: {userAgent: 0, uid: 0, user_name: null, openid: null, vl: 0},
        balance: {confirmed: 0, unconfirmed: 0},
        menu: [
            {
                title: "会员",
                is_link: true,
                img: "/static/img/icon1/4.png",
                badge: 0,
                link: "/member",
                value: "",
                showDot: false
            },
            {
                title: "红包活动",
                is_link: true,
                img: "/static/img/icon3/market3.png",
                badge: 0,
                link: "/redpack/act",
                value: "限时抽红包",
                showDot: false
            },
            {
                title: "我的道具",
                is_link: true,
                img: "/static/img/mine/prop.png",
                badge: 0,
                link: { path: "/props" },
                value: "",
                showDot: false
            },
            {
                title: "我的背包",
                is_link: true,
                img: "/static/img/mine/prop.png",
                badge: 0,
                link: { path: "/pocket" },
                value: "",
                showDot: false
            },
            {
                title: "我的消息",
                is_link: true,
                img: "/static/img/mine/msg.png",
                badge: 0,
                link: { path: "/message" },
                value: "",
                showDot: false
            },
            {
                title: "我的游戏",
                is_link: true,
                img: "/static/img/mine/game.png",
                badge: 0,
                link: { path: "/mygame" },
                value: "",
                showDot: false
            },
        ],
    },
    /**
     * 状态修改函数，必须是同步函数
     * @description 更改状态的唯一方法是提交 mutation: this.$store.commit
     */
    mutations: {
        authChanged(state, msg) {
            state.auth = Object.assign(state.auth, msg);
        }, 
        balanceChanged(state, msg) {
            state.balance = msg;
        }, 
    },  
    /**
     * 交互函数，可以是同步或者异步函数，可以完全封装状态修改函数(就像 React 的做法)
     * 在交互函数内部还可以继续 context.dispatch 或者 context.commit, 可以使用 await 语法
     * @description actions 类似于mutations, 不过Action 提交的是 mutation，而不是直接变更状态,而且可以包含任意异步操作: this.$store.dispatch
     */
    actions: {
        change (context, msg) {
            context.commit('authChanged', msg);
            context.commit('balanceChanged', {
                confirmed: assistant.toKg(msg.confirmed), 
                unconfirmed: assistant.toKg(msg.unconfirmed - msg.confirmed),
            });
        },
        async vipdraw(context, params) {
            let res = await remote.fetching({
                func:'profile.VipDraw',
                draw_count: params.draw_count,
            });
            return res;
        },
        async WechatConfig(context, params) {
            let res = await remote.fetching({
                func: "wechat.WechatConfig", 
                uri: params.uri,
            });
            return res;
        },
    },     
}

export default mod;
