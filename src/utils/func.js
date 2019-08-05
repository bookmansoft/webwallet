/* eslint-disable */
function getUrlKey(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
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
  
function getRandColor () {
    return colorList[Math.round(Math.random() * colorList.length)];
}
  
/**
 * 获取url中"?"符后的字串
 */
function getRequest() {
    var url = window.location.search;
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

function myAlert(alert, content, onshow=null, onhide=null) {
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
        },
    });
}

function introduce() {
    var xianq = document.getElementById("introduce");
    var img = document.getElementById("gameNameImg");
    var game = document.getElementById("gameProps");
    var txtXianq = document.getElementById("inIntroduce");
    var txtImg = document.getElementById("inGameNameImg");
    var txtGame = document.getElementById("inGameProps");
    txtImg.className = "";
    txtXianq.className = "bottom-orange";
    txtGame.className = "";
    game.style.display = "none";
    xianq.style.display = "block";
    img.style.display = "none";
}

function gameNameImg() {
    var xianq = document.getElementById("introduce");
    var img = document.getElementById("gameNameImg");
    var game = document.getElementById("gameProps");
    var txtXianq = document.getElementById("inIntroduce");
    var txtImg = document.getElementById("inGameNameImg");
    var txtGame = document.getElementById("inGameProps");
    img.style.display = "block";
    xianq.style.display = "none";
    game.style.display = "none";
    txtXianq.className = "";
    txtImg.className = "bottom-orange";
    txtGame.className = "";
}

function gameProps() {
    var xianq = document.getElementById("introduce");
    var img = document.getElementById("gameNameImg");
    var game = document.getElementById("gameProps");
    var txtXianq = document.getElementById("inIntroduce");
    var txtImg = document.getElementById("inGameNameImg");
    var txtGame = document.getElementById("inGameProps");
    img.style.display = "none";
    xianq.style.display = "none";
    game.style.display = "block";
    txtXianq.className = "";
    txtImg.className = "";
    txtGame.className = "bottom-orange";
}

export default {
    gameNameImg: gameNameImg,
    introduce: introduce,
    gameProps: gameProps,
    myAlert: myAlert,
    getRandColor: getRandColor,
    getUrlKey: getUrlKey,
    formatDateStr: formatDateStr,
    checkAddr: checkAddr,
}
