function getPropInfo(axios, localProps, blockProp) {
    let cpurl = blockProp.cp.url + "/prop/" + blockProp.pid;
    //console.log("getCpInfo", cpurl);
    axios.get(cpurl)
    .then(res => {
      if (!!res.data) {
        const data = res.data;
        //console.log(data);
        blockProp.prop_id = data.prop_id;
        blockProp.prop_name = data.prop_name;
        blockProp.prop_icon = data.prop_icon;
        blockProp.prop_info = data.prop_info; 
      } else {
        //console.log("not prop");
        blockProp.prop_id = 0;
        blockProp.prop_name = '';
        blockProp.prop_icon = 'static/img/noprop.png';
        blockProp.prop_info = '暂无'; 
      }
      localProps.push(blockProp);
    });
}

function getPropByOid(vueSelf, item, callback) {
  var data = { func: 'GetPropByOid', control: 'cpprop', oemInfo: vueSelf.GLOBAL.oemInfo, 
    oid: item.oid, 
  };
  let blockProp = {};
  vueSelf.axios.post(vueSelf.GLOBAL.apiUrl, data).then(res => {
    //console.log('res.data.prop', res.data.prop);
    if (!!res.data.prop) {
      const prop = res.data.prop;
      blockProp.oid = item.oid;
      blockProp.prop_id = prop.prop_id;
      blockProp.prop_name = prop.prop_name;
      blockProp.prop_icon = prop.prop_icon;
      blockProp.prop_info = prop.prop_info; 
      blockProp.gold = item.gold;
    } else {
      blockProp.oid = item.oid;
      blockProp.prop_id = 0;
      blockProp.prop_name = '暂无';
      blockProp.prop_icon = 'static/img/noprop.png';
      blockProp.prop_info = '暂无'; 
      blockProp.gold = item.gold;
    }
    callback(blockProp);
  });
}

function getBlockProp(axios, url, callback) {
  let blockProp = {};
  axios.get(url)
  .then(res => {
    console.log('data', data);
    if (!!res.data) {
      const data = res.data;
      blockProp.prop_id = data.prop_id;
      blockProp.prop_name = data.prop_name;
      blockProp.prop_icon = data.prop_icon;
      blockProp.prop_info = data.prop_info; 
    } else {
      blockProp.prop_id = 0;
      blockProp.prop_name = '';
      blockProp.prop_icon = 'static/img/noprop.png';
      blockProp.prop_info = '暂无'; 
    }
    callback(blockProp);
  });
}

export {
    getPropInfo, getBlockProp, getPropByOid
}
