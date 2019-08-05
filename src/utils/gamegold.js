/**
 * 游戏金辅助对象
 */
class gamegoldAssistant
{
    static singleton() {
        if(!this.instance) {
            this.instance = new gamegoldAssistant('singleton');
        }
        return this.instance;
    }

    constructor(type) {
        this.gameGoldAccount = '游戏金账户';
        this.gameGoldUnit = '千克';
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
        let k = v / 100000
        return parseFloat(k.toFixed(3))
    }
    
    /**
     * 公斤转换为尘
     */
    toAtom(v) {
        return v * 100000
    }
}

export default gamegoldAssistant.singleton();
