import blobToJson from "./blobToJson";
import downloadFileUrl from "./downloadFileUrl";

/**
 * @description 通过文件流下载
 * @param {object} params 参数
 * @param {string} filename 文件名
 * @param {Promise<Blob>} request 获取 二进制文件流方法
 * @returns {Promise<void>}
 */
export default async function downloadFileStream(
  request: () => Blob | PromiseLike<Blob>,
  filename: string
) {
  try {
    if (request) {
      const data: Blob = await request();
      if (data?.type === "application/json") {
        // 将blob返回结果为json的情况，转为json处理并提示信息，兼容msg和message
        const { msg } = await blobToJson(data);
        // if (msg || mesg) {
        //   message.error(msg || mesg);
        // }
        return Promise.reject(msg);
      } else {
        await downloadFileUrl(URL.createObjectURL(data), filename);
        return Promise.resolve(null);
      }
    } else {
      new Error('请传入request获取文件流')
    }
  } catch (err) {
    return Promise.reject();
  }
}
