import remote from './remote'

/**
 * 配置信息管理
 */
const ConfigMgr = {
    files: {},
    get: async (file, callback) => {
      if(!ConfigMgr.files[file]) {
          try {
            let res = await remote.fetching({func:'config.get', file: file});
            if(res.code == 0) {
              //获得指定配置表，放入全局缓存
              ConfigMgr.files[file] = res.data;
              callback(null, res.data);
            } else {
              callback(new Error(`error: ${res.code}`));
            }
          } catch(e) {
            callback(e);
          }
      } else {
        callback(null, ConfigMgr.files[file]);
      }
    }
};

export default ConfigMgr;
  