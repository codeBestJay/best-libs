/**
 * @description 通过文件地址下载
 * @param {string} url 文件地址
 * @param {string} filename 文件名
 */
export default async function downloadFileUrl(url: string, filename?: string) {
  const aLink = document.createElement("a");
  aLink.href = url;
  aLink.download = filename as string;
  document.body.appendChild(aLink);
  aLink.click();
  document.body.removeChild(aLink);
}