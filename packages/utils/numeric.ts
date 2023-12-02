import BigNumber from "bignumber.js";

type TypeNumeric = string | number | BigNumber.Instance;

BigNumber.config({ POW_PRECISION: 2 });

// https://mikemcl.github.io/bignumber.js
class Numeric {
  // 将传入值转为BigNumber
  bigNumber(a: TypeNumeric) {
    return new BigNumber(a);
  }

  validate(...params: TypeNumeric[]): boolean {
    const paramsValid = params.map((v) => ({
      origin: v,
      isValid: !this.bigNumber(v).isNaN(),
    }));
    if (paramsValid.every(({ isValid }) => isValid)) {
      return true;
    } else {
      if (paramsValid.every(({ isValid }) => !isValid)) {
        console.error("NUMERIC：传入的参数都不是数字类型或不可隐式转为数字。");
      } else {
        console.error(
          `NUMERIC：传入的 ${paramsValid
            .filter(({ isValid }) => !isValid)
            .map(({ origin }) => origin)} 不是数字类型或不可隐式转为数字。`,
        );
      }
      return false;
    }
  }

  add(a: TypeNumeric, b: TypeNumeric) {
    if (this.validate(a, b)) return this.bigNumber(a).plus(b).toNumber();
    return null;
  }

  subtract(a: TypeNumeric, b: TypeNumeric) {
    if (this.validate(a, b)) return this.bigNumber(a).minus(b).toNumber();
    return null;
  }

  multiply(a: TypeNumeric, b: TypeNumeric) {
    if (this.validate(a, b)) return this.bigNumber(a).multipliedBy(b).toNumber();
    return null;
  }

  divide(a: TypeNumeric, b: TypeNumeric) {
    if (this.validate(a, b)) return this.bigNumber(a).dividedBy(b).toNumber();
    return null;
  }
}

export default new Numeric();
