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
//const apiUrl = 'https://mini.gamegold.xin/gg-wechat-server/index.html'
const apiUrl = 'http://192.168.1.9:9101/index.html'
const gameGoldUnit = '千克'

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

function getPostData(obj) {
  return {

  }
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

function getOpenId(){
    var request = getRequest();
    var openid = request["openid"];
    if( typeof(openid)=="undefined" || openid=="") {
        openid = "oHvae4rF-nfnTQVxuCw6PS9Y8vw0";
        //openid = "oHvae4vecsyXDJJKREnmkOUxkq_4";
        //openid = "oHvae4kfxyGPY6MSHfEUPYzhXFfI";
    }
    return openid;
}

function getPath(){
    var request = getRequest();
    var path = request["path"];
    if( typeof(path)=="undefined" || path=="") {
        path = '/'
    }
    return path;
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

var adminName = 'root'
var openId = ''
var path = '/'
var uid = 0
var propCount = 0
var userProfile = null
var games = []
var cplist = []
var cpCount = 0

export default
{
  colorList,
  colorListLength,
  getRandColor,
  apiUrl,
  oemInfo,
  formatGameGold,
  gameGoldOrigin, userProfile, gameGoldUnit, formatDateStr, checkAddr, myAlert,
  adminName, openId, uid, propCount, cpCount, cplist, games, path,
  getOpenId, getPath
}
</script>