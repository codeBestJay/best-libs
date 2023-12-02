/**
 * @description 防抖函数
 * @param {function} func 回调函数
 * @param {number} delay 延迟时间
 */
export default function debounce(func: any, delay: number) {
  let debounceTimer: NodeJS.Timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
}