import t from "bignumber.js";
t.config({ POW_PRECISION: 2 });
class u {
  // 将传入值转为BigNumber
  bigNumber(e) {
    return new t(e);
  }
  validate(...e) {
    const r = e.map((i) => ({
      origin: i,
      isValid: !this.bigNumber(i).isNaN()
    }));
    return r.every(({ isValid: i }) => i) ? !0 : (r.every(({ isValid: i }) => !i) ? console.error("NUMERIC：传入的参数都不是数字类型或不可隐式转为数字。") : console.error(
      `NUMERIC：传入的 ${r.filter(({ isValid: i }) => !i).map(({ origin: i }) => i)} 不是数字类型或不可隐式转为数字。`
    ), !1);
  }
  add(e, r) {
    return this.validate(e, r) ? this.bigNumber(e).plus(r).toNumber() : null;
  }
  subtract(e, r) {
    return this.validate(e, r) ? this.bigNumber(e).minus(r).toNumber() : null;
  }
  multiply(e, r) {
    return this.validate(e, r) ? this.bigNumber(e).multipliedBy(r).toNumber() : null;
  }
  divide(e, r) {
    return this.validate(e, r) ? this.bigNumber(e).dividedBy(r).toNumber() : null;
  }
}
const s = new u();
export {
  s as default
};
