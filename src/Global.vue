<script type="text/javascript">
const colorList = [
  '#F9F900',
  '#6FB7B7',
  '#9999CC',
  '#B766AD',
  '#B87070',
  '#FF8F59',
  '#FFAF60',
  '#FFDC35',
  '#FFFF37',
  '#B7FF4A',
  '#28FF28',
  '#1AFD9C',
  '#00FFFF',
  '#2894FF',
  '#6A6AFF',
  '#BE77FF',
  '#FF77FF',
  '#FF79BC',
  '#FF2D2D',
  '#ADADAD'
]

const colorListLength = 20
const oemInfo = { token: '9bcf8939a9c96e14700b2209463af411' }
const apiUrl = 'http://h5.gamegold.xin:9101/index.html'
const siteUri = 'http://h5.gamegold.xin'
//const apiUrl = 'http://192.168.5.73:9101/index.html'
//const siteUri = 'http://test.gamegold.xin'

const gameGoldUnit = '千克'

var userBase = {userAgent: 0, uid: 0, user_name: null, openid: null}
var userProfile = null
var games = []
var cplist = []
var cpCount = 0
var vipGetNotifyTime = 0
var remote = null
var hasMsg = false
var hasProp = false
var hasTx = false
var hasPropAuction = false

function getRandColor () {
  var tem = Math.round(Math.random() * colorListLength)
  return colorList[tem]
}

function formatGameGold(v) {
  let k = v / 100000
  return parseFloat(k.toFixed(3))
}

function gameGoldOrigin(v) {
  return v * 100000
}

function getRequest() {
    var url = window.location.search; //获取url中"?"符后的字串
    var theRequest = {};
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function  myAlert(alert, content, onshow=null, onhide=null) {
  alert.show({
    title: '提示',
    content: content,
    onShow () {
      //console.log('Plugin: I\'m showing')
      if(onshow != null) {
        onshow()
      }
    },
    onHide () {
      //console.log('Plugin: I\'m hiding')
      if(onhide != null) {
        onhide()
      }
    }
  })
}

function formatDateStr(date, fmt) {
    var o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "H+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;  
}

function checkAddr(value) {
    const re =  /^[0-9a-zA-Z]*$/g;  //判断字符串是否为数字和字母组合     //判断正整数 /^[1-9]+[0-9]*]*$/  
    if (!re.test(value)){
      return false;
    }else{
      return true;
    }
}

async function initRemote(uid, callback) {
  //创建连接器对象
  remote = new toolkit.gameconn(
    // CommMode = {
    //     ws: "webSocket",    //Web Socket
    //     get: "get",         //HTTP GET
    //     post: "post",       //HTTP POST
    // }
    toolkit.gameconn.CommMode.ws,      //连接方式
    {
      "UrlHead": "http",              //协议选择: http/https
      "webserver": {
        "host": "h5.gamegold.xin",        //远程主机地址
        "port": 9901                //远程主机端口
      },
      "auth": {
        "openid": "18681223392",    //用户标识
        "openkey": "18681223392",   //和用户标识关联的用户令牌
        "domain": "tx.IOS",         //用户所在的域，tx是提供登录验证服务的厂商类别，IOS是该厂商下的服务器组别
      }
    }
  )
  
  let msg = await remote.login({openid: uid});
  console.log('msg', msg)
  if(remote.isSuccess(msg)) { 
      await remote.watch(msg => {
          if(callback) {
            callback(msg)
          }
      }, '9999')
      //.fetching({func: "test.notify", id: uid});
  }

}

export default
{
  colorList, colorListLength, getRandColor,
  apiUrl, siteUri, oemInfo,
  formatGameGold, gameGoldOrigin, gameGoldUnit, initRemote,
  myAlert, formatDateStr, checkAddr,
  userBase, userProfile, games, cplist, cpCount, vipGetNotifyTime,
  remote, hasMsg, hasProp, hasTx, hasPropAuction
}
</script>