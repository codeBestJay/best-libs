import $ from "axios";
import x from "qs";
const g = ({ baseURL: R, headers: j, beforeRequestHandler: r, response401: a, responseErrorCallback: y, responseCallback: h, errorMessageCallback: n }) => {
  const u = $.create({
    baseURL: R,
    withCredentials: !1,
    timeout: 12e4,
    headers: j
  }), q = (e) => (e.mock && (e.baseURL = "/", e.url = `/mock${e.url}`), e.header && (e.headers = {
    ...e.headers,
    ...e.header || {}
  }), typeof r == "function" && (e = r(e)), e), E = ({ data: e, status: s, headers: i, config: o }) => {
    var w;
    const { code: t, data: p, message: H, msg: d, errorCode: c, errorMessage: l } = e, { legacy: P, useHeaders: _ } = o, f = window.__NUWA_CODE_MESSAGE;
    if (h && h(e), s === 200 && (+t == 200 || c === "NO-ERROR"))
      return _ ? {
        data: p,
        headers: i
      } : p;
    if (P && e.suc)
      return p;
    if (c && c !== "NO-ERROR")
      return n && n(l), Promise.reject(e);
    if (t && ((w = t == null ? void 0 : t.toString()) == null ? void 0 : w.length) === 10) {
      let m;
      const S = t.toString().slice(2, 3);
      return f && (f != null && f[t]) ? m = f[t] : d ? m = S === "S" ? `${d}；错误码：${t}` : d : S === "S" ? m = `系统繁忙，请稍后重试；错误码：${t}` : m = "网络请求错误，请稍后重试", n && n(m), Promise.reject(e);
    } else
      return t ? t === 200 ? p : (t !== 4001 && n && n(d ?? H ?? l), Promise.reject(e)) : e;
  }, O = (e) => {
    var i, o;
    let s = "网络请求错误，请重试";
    if (e != null && e.response) {
      switch (e.response.status) {
        case 401:
          s = e.response.data.message, typeof a == "function" && a();
          break;
        case 404:
          s = "接口不存在";
          break;
      }
      const t = (i = e == null ? void 0 : e.response) == null ? void 0 : i.data;
      t != null && t.msg && (s = t.msg), (o = t == null ? void 0 : t.errors) != null && o.length && (s = t == null ? void 0 : t.errors.join(","));
    }
    return n && n(s), typeof y == "function" && y(e), Promise.reject(e);
  };
  return u.interceptors.request.use(q), u.interceptors.response.use(E, O), {
    get: async (e, s, i) => await u.get(e, {
      params: s,
      ...i ?? {},
      paramsSerializer: {
        serialize: (o) => x.stringify(o, { arrayFormat: "repeat" })
      }
    }),
    post: async (e, s, i) => await u.post(e, s, i),
    del: async (e, s) => await u.delete(e, s),
    request: async (e) => await u.request(e)
  };
};
export {
  g as default
};
