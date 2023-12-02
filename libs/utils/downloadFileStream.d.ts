/**
 * @description 通过文件流下载
 * @param {object} params 参数
 * @param {string} filename 文件名
 * @param {Promise<Blob>} request 获取 二进制文件流方法
 * @returns {Promise<void>}
 */
export default function downloadFileStream(request: () => Blob | PromiseLike<Blob>, filename: string): Promise<any>;
