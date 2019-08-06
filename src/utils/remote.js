import cfg from '../config'

//#region 通讯设置

const remote = new toolkit.gameconn({
  "UrlHead": cfg.UrlHead,
  "webserver": { 
      "host": cfg.Host,
      "authPort": 9601,           //签证主机端口
      "port": 9901
  },
});
remote.setmode(remote.CommMode.ws);
remote.appConfig = cfg;

//#endregion

export default remote;

