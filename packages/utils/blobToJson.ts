/**
 * @description 将blob对象转为json
 * @param {Blob} b Blob对象，type: application/json
 * @returns 转成json的Blob
 */
export default function blobToJson(b: Blob): Promise<any> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.readAsText(b);
    fr.onload = (e) => {
      try {
        resolve(JSON.parse(e.target.result as any));
      } catch {
        reject();
      }
    };
    fr.onerror = () => {
      reject();
    };
  });
};