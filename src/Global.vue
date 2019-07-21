<script type="text/javascript">
//#region 通讯设置
const UrlHead = 'http';
const Host = 'wallet.vallnet.cn';
const siteUri = `${UrlHead}://${Host}`;
const remote = new toolkit.gameconn({
  "UrlHead": UrlHead,
  "webserver": { 
      "host": Host,
      "authPort": 9601,           //签证主机端口
      "port": 9901
  },
});
remote.setmode(remote.CommMode.ws);

//#endregion

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
];

/**
 * 配置信息管理
 */
const ConfigMgr = {
  files: {},
};
ConfigMgr.get = (file, callback) => {
    if(!ConfigMgr.files[file]) {
      remote.fetching({func:'config.get', file: file}).then(res => {
          if(res.code == 0) {
            //获得指定配置表，放入全局缓存
            ConfigMgr.files['crowd'] = res.data;
            callback(null, res.data);
          } else {
            callback(new Error(`error: ${res.code}`));
          }
      }).catch(e => {
        callback(e);
      })
    } else {
      callback(null, ConfigMgr.files[file]);
    }
  }

const colorListLength = 20;

const gameGoldUnit = '千克'

//存储认证信息的对象
var userBase = {userAgent: 0, uid: 0, user_name: null, openid: null}

var games = []
var cplist = []
var crowdlist = []
var vipGetNotifyTime = 0

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

//输出全局数据仓库
export default
{
  colorList, colorListLength, getRandColor, siteUri, ConfigMgr,
  formatGameGold, gameGoldOrigin, gameGoldUnit, myAlert, formatDateStr, 
  checkAddr, userBase, games, cplist, crowdlist, vipGetNotifyTime, remote
}
</script>