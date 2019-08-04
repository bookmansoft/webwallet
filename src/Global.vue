<script type="text/javascript">
//#region 通讯设置
const UrlHead = 'http';
const Host = 'wallet.vallnet.cn';
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

//APP设置
const appConfig = {
  appid: 'wx4a5e9d7ae34ad4b4',      //此项配置必须和服务端保持一致
  siteUri: `${UrlHead}://${Host}`,
}

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
          ConfigMgr.files[file] = res.data;
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
var crowdlist = [];
var propList = [];
var stocklist = [];     //我的凭证
var pocketlist = [];
//支付相关配置
var base = {
  "ton": 100000000,
  "kg": 100000,
  "price": 0.015,
};
var crowdConfig = null;

var ResType = {
  '99000': '众筹凭证',
}

var RecordType = {
    1: '发行凭证',           
    2: '购买凭证',
    3: '转让凭证',
    4: '凭证分成',
    5: '媒体分成',
    6: '拍卖凭证',
    7: '竞买凭证',
}

function getRandColor () {
  var tem = Math.round(Math.random() * colorListLength)
  return colorList[tem]
}

/**
 * 复制一个对象
 * @param obj
 * @returns {*}
 */
function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    if (obj instanceof Date) {// Handle Date
        let copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    else if (obj instanceof Array) {// Handle Array
        let copy = [];
        for (let i = 0, len = obj.length; i < len; ++i) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }
    else if (obj instanceof Object) {// Handle Object
        let copy = {};
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

/**
 * 尘转换为公斤
 */
function toGamegoldKg(v) {
  let k = v / 100000
  return parseFloat(k.toFixed(3))
}

/**
 * 公斤转换为尘
 */
function toGamegoldOrigin(v) {
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
  clone, colorList, colorListLength, getRandColor, appConfig, ConfigMgr,
  toGamegoldKg, toGamegoldOrigin, gameGoldUnit, myAlert, formatDateStr, 
  checkAddr, userBase, games, cplist, crowdlist, stocklist, pocketlist, ResType, remote, base, crowdConfig, RecordType, propList
}
</script>