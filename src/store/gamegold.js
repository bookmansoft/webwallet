const gamegold = {
    //namespaced: true, //独立命名空间

    // 数据属性
    state: {
        balance: {confirmed: 0, unconfirmed: 0},
    },
    // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
    mutations: {
    balanceChanged(state, msg) {
        console.log('mutations.balanceChanged', msg);
        state.balance = msg;
    }, 
    },  
    // actions类似于mutations,不过Action 提交的是 mutation，而不是直接变更状态,而且可以包含任意异步操作。
    actions:{},     
}

export default gamegold;