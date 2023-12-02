/**
 * @description 延迟执行
 * @param {number} t 延迟执行的事件，单位秒
 * @returns {Promise<unknown>}
 */
export default function delay(t = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, t * 1e3)
    })
  }