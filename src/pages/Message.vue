<!-- 消息中心
数据接口
1. message/pull
[
  {
      id: item.id,                            //邮件索引号
      from: item.src,                         //发件人
      dst: item.dst,                          //收件人
      time: item.time,                        //发送时间
      state: item.state,                      //状态 0 未读 1已读
      type: item.content.type,                //邮件类型
      content: item.content.info.content,     //邮件内容
      bonus: item.content.info.bonus,         //附加奖励
  }
]

// 账户变更通知(10001) content 格式：
// {
//     "aname": "authwx.081PHnJu13v1Ge01svIu1ebqJu1PHnJv",                              //账号名称
//     "aidx": 2,                                                                       //账号索引
//     "height": 120,                                                                   //日志所在高度
//     "hash": "ce301be39a1724af9b6a39ccc9a39117cf66bd069003e4224b94d26d7b3e378f",      //日志所在交易哈希
//     "in": [                                                                          //所有关联输入的列表 [索引, 金额] - 代表支出
//       [0, 50000]
//     ],
//     "out": [                                                                         //所有关联输出的列表 [索引, 金额] - 代表收入
//       [0,17200],
//       [1,30000]
//     ],
//     "balance": {                                                                     //期末账户余额
//       "wid": 1,                                                                      //钱包编号
//       "id": "primary",                                                               //钱包名称
//       "account": 2,                                                                  //账户编号
//       "unconfirmed": 401600,                                                         //未确认金额
//       "confirmed": 341600,                                                           //已确认金额
//       "locked": 0                                                                    //锁仓金额
//     }
// }

-->
<template>
  <div>
    <!-- <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header> -->
    <ScrollList :config="config">
      <template v-slot:default="props">
        <div v-for="(item, index) in props.content" :key="index" class="gameItem">
            <group v-if="item.type==10001">
                <flexbox class="crowdItem"  @click.native="itemClick(item)">
                    <flexbox-item>
                        <div style="padding-left:6px;">
                          <p><span style="font-size:15px;">账户变更</span></p>
                          <p><span style="font-size:15px;">{{`${moment(item.time * 1000).format("MM-DD HH:mm")}`}}</span></p>
                          <p><span style="color: coral; font-size:14px;">{{`${(item.content.height > 0)?'已确认':'未确认'}`}}</span></p>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                      <div>
                        <div v-for="(it, index) in item.content.out" :key="index">
                          <div class="flex-demo-left">
                            <img src='/static/img/wallet/rec.png' class="img-game-list" />
                            <span style="font-size:15px;">{{parseFloat(it[1]/unit.kg).toFixed(3)}}千克</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div v-for="(it, index) in item.content.in" :key="index">
                          <div class="flex-demo-left">
                            <img src='/static/img/wallet/send.png' class="img-game-list" />
                            <span style="font-size:15px;">{{parseFloat(it[1]/unit.kg).toFixed(3)}}千克</span>
                          </div>
                        </div>
                      </div>
                    </flexbox-item>
                </flexbox>
            </group>
            <group v-if="item.type==3">
                <flexbox class="crowdItem"  @click.native="itemClick(item)">
                    <flexbox-item :span="2.5" style="padding:0.3rem;">
                        <div class="flex-demo-left"><img src="/static/img/mine/msg.png" class="img-game-list" /></div>
                    </flexbox-item>
                    <flexbox-item>
                        <div style="padding-left:6px;">
                          <p><span style="font-size:15px;">{{`${moment(item.time * 1000).format("MM-DD HH:mm")}`}}</span></p>
                          <p><span style="color: coral; font-size:14px;">{{`${JSON.stringify(item.content)} - ${(item.state == 0)?'未处理':'已处理'}`}}</span></p>
                        </div>
                    </flexbox-item>
                </flexbox>
            </group>
            <group v-if="item.type==10002">
                <flexbox class="crowdItem"  @click.native="itemClick(item)">
                    <flexbox-item :span="2.5" style="padding:0.3rem;">
                        <div class="flex-demo-left"><img src="/static/img/mine/msg.png" class="img-game-list" /></div>
                    </flexbox-item>
                    <flexbox-item>
                        <div style="padding-left:6px;">
                          <p><span style="font-size:15px;">{{`${moment(item.time * 1000).format("MM-DD HH:mm")}`}}</span></p>
                          <p><span style="color: coral; font-size:14px;">{{`${JSON.stringify(item.content)} - ${(item.state == 0)?'未处理':'已处理'}`}}</span></p>
                        </div>
                    </flexbox-item>
                </flexbox>
            </group>
        </div>
      </template>
    </ScrollList>
  </div>
</template>

<script>
import { 
  XHeader, 
  Group, 
  Flexbox,
  FlexboxItem,
} from 'vux'
import ScrollList from "@/components/ScrollList.vue";
import moment from "moment";

export default {
  name: 'Message',
  components: {
    XHeader,
    Group,
    Flexbox,
    FlexboxItem,
    ScrollList,
  },
  data () {
    return {
      headerTitle: '历史消息',
      config: {
        store: 'message',    //数据中心
        nodata: '/static/img/default/no-games.png',
      },
    }
  },
  computed: {
    unit() {return this.$store.state.config.dict['base'];},
    userBase() {return this.$store.state.user.auth},
  },
  methods: {
    moment(val) {
      return moment(val);
    },
    itemClick(item) {
      this.$router.push({ name: 'MailReader', params: { data: item }})
    },
    onBack() {
        this.$router.push("/mine")
    },
  },
  created() {
    if(!this.userBase.uid) {
      this.$router.push('/login');
    }
  }
}
</script>
<style lang="less" scoped>
.img-game-list {
    width: 1.0rem;
    height: 1.0rem;
    border-radius: 0%;
}
</style>