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
{
  "aname": "authwx.081PHnJu13v1Ge01svIu1ebqJu1PHnJv",                              //账号名称
  "aidx": 2,                                                                       //账号索引
  "height": 120,                                                                   //日志所在高度
  "hash": "ce301be39a1724af9b6a39ccc9a39117cf66bd069003e4224b94d26d7b3e378f",      //日志所在交易哈希
  "in": [                                                                          //所有关联输入的列表 [索引, 金额] - 代表支出
    [0, 50000]
  ],
  "out": [                                                                         //所有关联输出的列表 [索引, 金额] - 代表收入
    [0,17200],
    [1,30000]
  ],
  "balance": {                                                                     //期末账户余额
    "wid": 1,                                                                      //钱包编号
    "id": "primary",                                                               //钱包名称
    "account": 2,                                                                  //账户编号
    "unconfirmed": 401600,                                                         //未确认金额
    "confirmed": 341600,                                                           //已确认金额
    "locked": 0                                                                    //锁仓金额
  }
}

// 待支付订单(10002) content 格式：
{
  "oper":"notify",
  "sn":"42566d80-beb1-11e9-a451-d783e0e2f568",
  "h":117,
  "body":{
    "src":"tb1q9msqyf7nee72gk4qw2elawa5m7kgj6u8squmjw",
    "content":"{
      \"cid\":\"f97d38e0-bea7-11e9-b0cb-398f3f2fd876\",
      \"oid\":\"cp010061_prop_3\",
      \"price\":\"400000\",
      \"url\":\"http://h5.gamegold.xin/image/1/prop_icon.jpg\",
      \"prop_name\":\"北极50地狱行者-3\",
      \"sn\":\"42513d60-beb1-11e9-b110-01bd2392138e\",
      \"address\":\"tb1q6u64889906kyrss5ymhnh8n02x55xvf5ehsa8h\"
    }",
    "dst":"tb1q6u64889906kyrss5ymhnh8n02x55xvf5ehsa8h"
  },
  "account":"authwx.081PHnJu13v1Ge01svIu1ebqJu1PHnJv",
  "wid":1
}
-->
<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
    <ScrollViewer :config="config">
      <template v-slot:default="props">
        <div v-for="(item, index) in props.content" :key="index" class="gameItem">
            <group v-if="item.type==10001">
                <flexbox class="crowdItem"  @click.native="itemClick(item)">
                    <flexbox-item>
                      <div style="padding-left:6px;">
                        <p><span style="font-size:15px;">{{`${moment(item.time * 1000).format('MM-DD HH:mm')} - 账户变更 - ${(item.content.height > 0 ? '已确认':'未确认')}`}}</span></p>
                      </div>
                      <div>
                        <div v-for="(it, index) in item.content.out" :key="index">
                          <div class="flex-demo-left">
                            <img src='/static/img/wallet/rec.png' class="img-game-list" />
                            <span style="color: coral; font-size:14px;">{{parseFloat(it[1]/unit.kg).toFixed(3)}}千克</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div v-for="(it, index) in item.content.in" :key="index">
                          <div class="flex-demo-left">
                            <img src='/static/img/wallet/send.png' class="img-game-list" />
                            <span style="color: coral; font-size:14px;">{{parseFloat(it[1]/unit.kg).toFixed(3)}}千克</span>
                          </div>
                        </div>
                      </div>
                    </flexbox-item>
                </flexbox>
            </group>
            <group v-if="item.type==10002 && typeof item.content.body.content == 'object'">
                <flexbox class="crowdItem"  @click.native="itemClick(item)">
                    <flexbox-item>
                      <div style="padding-left:6px;">
                        <p><span style="font-size:15px;">{{`${moment(item.time * 1000).format('MM-DD HH:mm')} - 道具购买 - ${(item.state == 0 ? '未支付':'已支付')}`}}</span></p>
                      </div>
                        <div style="padding-left:6px;">
                          <p><span style="color: coral; font-size:14px;">道具名称: {{`${(item.content.body.content.prop_name)}`}}</span></p>
                          <p><span style="color: coral; font-size:14px;">购买价格: {{`${parseFloat(item.content.body.content.price/unit.kg).toFixed(3)} 千克`}}</span></p>
                          <p><span style="color: coral; font-size:14px;">订单编号: {{`${(item.content.sn)}`}}</span></p>
                        </div>
                    </flexbox-item>
                </flexbox>
            </group>
            <group v-if="item.type==10002 && typeof item.content.body.content == 'string'">
                <flexbox class="crowdItem"  @click.native="itemClick(item)">
                    <flexbox-item>
                      <div style="padding-left:6px;">
                        <p><span style="font-size:15px;">{{`${moment(item.time * 1000).format('MM-DD HH:mm')} - 通知 - ${(item.state == 0 ? '未读':'已读')}`}}</span></p>
                      </div>
                        <div style="padding-left:6px;">
                          <p><span style="color: coral; font-size:14px;">消息内容: {{`${(item.content.body.content)}`}}</span></p>
                        </div>
                    </flexbox-item>
                </flexbox>
            </group>
            <group v-if="item.type!=10001 && item.type!=10002">
                <flexbox class="crowdItem"  @click.native="itemClick(item)">
                    <flexbox-item :span="5" style="padding:0.3rem;">
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
    </ScrollViewer>
  </div>
</template>

<script>
import { 
  XHeader, 
  Group, 
  Flexbox,
  FlexboxItem,
} from 'vux'
import ScrollViewer from "@/components/ScrollViewer.vue";
import moment from "moment";

export default {
  name: 'Message',
  components: {
    XHeader,
    Group,
    Flexbox,
    FlexboxItem,
    ScrollViewer,
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