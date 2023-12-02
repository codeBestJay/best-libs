import i from "./blobToJson.js";
import n from "./downloadFileUrl.js";
async function s(r, o) {
  try {
    if (r) {
      const e = await r();
      if ((e == null ? void 0 : e.type) === "application/json") {
        const { msg: t } = await i(e);
        return Promise.reject(t);
      } else
        return await n(URL.createObjectURL(e), o), Promise.resolve(null);
    } else
      new Error("请传入request获取文件流");
  } catch {
    return Promise.reject();
  }
}
export {
  s as default
};
