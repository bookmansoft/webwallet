//远程通讯协议设置
const UrlHead = 'http';
//远程通讯主机地址设置
const Host = 'wallet.vallnet.cn';
//站点地址
const siteUri = `${UrlHead}://${Host}`;
//微信协议所需的 appid 字段，该字段将在系统启动时，从服务端获取
const wx_appid = '';

module.exports = {
    UrlHead: UrlHead,
    Host: Host,
    siteUri: siteUri,
    wx_appid: wx_appid,    
}
