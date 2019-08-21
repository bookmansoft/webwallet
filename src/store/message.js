import moment from "moment";
import assistant from "../utils/assistant"
import remote from '../utils/remote'

/**
 * 背包数据集合
 */
const mod = {
    namespaced: true, //独立命名空间

    /**
     * 状态集
     */
    state: {
        list: [],           //缓存列表
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
        merge(state, list) {
            state.list = state.list.concat(list);
        },
        add(state, msg) {
            state.list = state.list.concat([msg]);
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
        read(context, id) {
            remote.fetching({
                func:'mail.read',
                idx: id,
            }).then(()=>{
                context.commit('clear');
            });
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
                    func:'mail.getList',
                    page: curPage+1,
                });
          
                if (res.code == 0) {
                    //设定最大页数
                    if(context.state.pageMax != res.data.total) {
                        context.commit('setPage', res.data.total);
                    }

                    let qryPage = Math.min(res.data.total, res.data.page); //数据修复：查询页数不能大于总页数
                    if(curPage < qryPage) { //说明获得了新的内容
                        let dt = res.data.list.map(item => {
                            /* 最初的数据格式: item = {
                                id, 
                                src,
                                dst,
                                time,
                                state,
                                content: {
                                    type,
                                    info: {
                                        content: content,
                                        bonus: bonus,
                                    }
                                },
                            } 
                            */

                            if(typeof item.content == 'string') {
                                item.content = JSON.parse(item.content);
                            }
                            if(typeof item.content.info.content == 'string') {
                                item.content.info.content = JSON.parse(item.content.info.content);
                            }
                            if(typeof item.content.info.bonus == 'string') {
                                item.content.info.bonus = JSON.parse(item.content.info.bonus);
                            }

                            let mail = {
                                id: item.id,                            //邮件索引号
                                from: item.src,                         //发件人
                                dst: item.dst,                          //收件人
                                time: item.time,                        //发送时间
                                state: item.state,                      //状态 0 未读 1已读
                                type: item.content.type,                //邮件类型
                                content: item.content.info.content,     //邮件内容
                                bonus: item.content.info.bonus,         //附加奖励
                            };

                            if(!!mail.content.body) {
                                if(typeof mail.content.body.content == 'string') {
                                    try {
                                        mail.content.body.content = JSON.parse(mail.content.body.content);
                                    } catch(e) {
                                        
                                    }
                                }
                            }
                            
                            return mail;
                        })                        
                        context.commit('merge', dt);
                        console.log('message.pull', dt);
                    }
                }
            }

            return curPage < context.state.pageMax;
        },
    },     
}

export default mod;
