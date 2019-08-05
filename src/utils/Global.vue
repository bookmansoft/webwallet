<script type="text/javascript">

//存储认证信息的对象
var userBase = {userAgent: 0, uid: 0, user_name: null, openid: null}

var games = []
var cplist = []
var crowdlist = [];
var propList = [];
var stocklist = [];     //我的凭证
var pocketlist = [];
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

export default {
  userBase, games, cplist, crowdlist, stocklist, pocketlist, ResType, crowdConfig, RecordType, propList
}
</script>