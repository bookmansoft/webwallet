/**
 * 游戏金辅助对象
 */
class Assistant
{
    static singleton() {
        if(!this.instance) {
            this.instance = new Assistant('singleton');
        }
        return this.instance;
    }

    constructor(type) {
        this.gameGoldAccount = '游戏金账户';
        this.gameGoldUnit = '千克';
        this.ResType = {
            '10000': '道具',
            '20000': '场景',
            '30000': '英雄',
            '99000': '众筹凭证',
        }
          
        this.$unit = {
            "ton": 100000000,
            "kg": 100000,
            "price": 0.015,
        };
    }

    get unit() {
        return this.$unit;
    }
    set unit(val) {
        this.$unit = val;
    }

    /**
     * 尘转换为公斤
     */
    toKg(v) {
        return parseFloat(v/100000).toFixed(3);
    }
    
    /**
     * 公斤转换为尘
     */
    toAtom(v) {
        return v * 100000
    }
}

export default Assistant.singleton();
