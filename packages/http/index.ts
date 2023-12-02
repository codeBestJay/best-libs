import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import qs from 'qs';

interface RequestConfig extends AxiosRequestConfig {
  mock?: boolean; // 是否执行接口mock
  [key: string]: unknown;
}
export interface ResponseWrapper<T> {
  code: number | string;
  success: boolean;
  message: string;
  msg: string;
  data: T;
  errorCode: string;
  errorMessage: string;
}

interface ResponseError extends AxiosError, Omit<ResponseWrapper<unknown>, 'code'> {
  type?: 'ERROR_BUSINESS';
}

interface HttpClient {
  baseURL: string; // 地址前缀
  headers: Record<string, string>; // 静态通用的headers
  beforeRequestHandler?: (config: AxiosRequestConfig) => AxiosRequestConfig; // 发送请求前对参数的修饰
  response401?: () => void; // 项目中处理token失效逻辑
  responseErrorCallback?: (error: ResponseError) => void; //http code非200回调
  responseCallback?: (response: any) => void; // http 200回调
  errorMessageCallback?: (error: any) => void; // 报错新题提示回调
}

const createHttpClient = ({ baseURL, headers, beforeRequestHandler, response401, responseErrorCallback, responseCallback, errorMessageCallback }: HttpClient) => {
  const axiosInstance = axios.create({
    baseURL,
    withCredentials: false,
    timeout: 120_000,
    headers,
  });

  // 请求拦截器方法
  const requestHandler = (config: LooseObject) => {
    // 如果参数配置了mock，则启用本地mock数据，添加mock前缀以示区别
    if ((config as RequestConfig).mock) {
      config.baseURL = '/';
      config.url = `/mock${config.url}`;
    }

    if (config.header) {
      config.headers = {
        ...config.headers,
        ...(config.header || {}),
      };
    }
    if (typeof beforeRequestHandler === 'function') {
      config = beforeRequestHandler(config);
    }
    return config;
  };

  // 响应拦截器方法
  const responseHandler = <T>({ data: resData, status, headers, config }: AxiosResponse<ResponseWrapper<T>>) => {
    const { code, data, message: messageInfo, msg: msgInfo, errorCode, errorMessage } = resData;
    const { legacy, useHeaders } = config as RequestConfig;

    const codeMessage = (window as any).__NUWA_CODE_MESSAGE;
    responseCallback && responseCallback(resData);
    if (status === 200 && (+code === 200 || errorCode === 'NO-ERROR')) {
      if (useHeaders) {
        return {
          data,
          headers,
        };
      }
      return data;
    } else if (legacy && (resData as any).suc) {
      return data;
    } else if (errorCode && errorCode !== 'NO-ERROR') {
      errorMessageCallback && errorMessageCallback(errorMessage)
      return Promise.reject(resData);
    }
    //标准异常码 例: HDB0103001
    else if (code && code?.toString()?.length === 10) {
      let messageTip;
      const codeType = code.toString().slice(2, 3);
      if (codeMessage && codeMessage?.[code]) {
        messageTip = codeMessage[code];
      } else if (msgInfo) {
        messageTip = codeType === 'S' ? `${msgInfo}；错误码：${code}` : msgInfo;
      } else if (codeType === 'S') {
        messageTip = `系统繁忙，请稍后重试；错误码：${code}`;
      } else {
        messageTip = '网络请求错误，请稍后重试';
      }
      errorMessageCallback && errorMessageCallback(messageTip)
      return Promise.reject(resData);
    } else {
      // 兼容处理不返回data数据格式的情况
      if (code) {
        if (code === 200) {
          return data;
        } else {
          if (code !== 4001) {
            errorMessageCallback && errorMessageCallback(msgInfo ?? messageInfo ?? errorMessage)
          }
          return Promise.reject(resData);
        }
      } else {
        return resData as ResponseWrapper<T>['data'];
      }
    }
  };

  // 响应拦截器错误(http code非200)
  const responseErrorHandler = (error: ResponseError) => {
    let toastMessage = '网络请求错误，请重试';
    if (error?.response) {
      switch (error.response.status) {
        case 401:
          toastMessage = (error.response.data as ResponseWrapper<unknown>).message;
          if (typeof response401 === 'function') {
            response401();
          }
          break;
        case 404:
          toastMessage = '接口不存在';
          break;
        default:
          break;
      }
      const errData: any = error?.response?.data;
      if (errData?.msg) {
        toastMessage = errData.msg;
      }
      if (errData?.errors?.length) {
        toastMessage = errData?.errors.join(',');
      }
    }
    errorMessageCallback && errorMessageCallback(toastMessage)
    if (typeof responseErrorCallback === 'function') {
      responseErrorCallback(error);
    }
    return Promise.reject(error);
  };

  axiosInstance.interceptors.request.use(requestHandler as any);

  axiosInstance.interceptors.response.use(responseHandler, responseErrorHandler);

  const get = async <T>(url: string, params?: TypeObject, config?: RequestConfig): Promise<T> => {
    return await axiosInstance.get(url, {
      params,
      ...(config ?? {}),
      paramsSerializer: {
        serialize: (r) => qs.stringify(r, { arrayFormat: 'repeat' }),
      },
    });
  };

  const post = async <T>(url: string, data?: TypeObject | FormData, config?: RequestConfig): Promise<T> => {
    return await axiosInstance.post(url, data, config);
  };

  const del = async <T>(url: string, config?: RequestConfig): Promise<T> => {
    return await axiosInstance.delete(url, config);
  };
  const request = async <T>(config: RequestConfig): Promise<T> => {
    return await axiosInstance.request(config);
  };

  return {
    get,
    post,
    del,
    request,
  };
};

export default createHttpClient;
