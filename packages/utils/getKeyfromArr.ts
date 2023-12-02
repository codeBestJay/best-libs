
/**
 * @description 根据一个或多个val遍历数组返回val对应的key
 * @param {any} originArr 遍历的数组
 * @param {string | number} val 需要查询的内容val
 * @return {string}  返回val对应的key
 */
export default function getKeyfromArr(
    originArr: any,
    val: string | number,
    key = 'label',
    keyName = 'value',
  ) {
    let res = '';
    if (Array.isArray(originArr) && val) {
      const curVal = val.toString();
      let curValArr;
      if (Array.isArray(val)) {
        curValArr = val;
      } else if (typeof val === 'string') {
        curValArr = curVal.split(',');
      } else if (typeof val === 'number') {
        curValArr = [val];
      }
      curValArr?.forEach((vi) => {
        const curObj = originArr.find((oItem) => oItem[keyName] === vi);
        if (curObj) {
          res += `${curObj[key]},`;
        }
      });
    }
    // 去掉最后一个','
    const finallyRes = res.includes(',') ? res.slice(0, -1) : res;
    return finallyRes || '';
  }