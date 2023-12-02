import type { AxiosError, AxiosRequestConfig } from 'axios';
interface RequestConfig extends AxiosRequestConfig {
    mock?: boolean;
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
    baseURL: string;
    headers: Record<string, string>;
    beforeRequestHandler?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    response401?: () => void;
    responseErrorCallback?: (error: ResponseError) => void;
    responseCallback?: (response: any) => void;
    errorMessageCallback?: (error: any) => void;
}
declare const createHttpClient: ({ baseURL, headers, beforeRequestHandler, response401, responseErrorCallback, responseCallback, errorMessageCallback }: HttpClient) => {
    get: <T>(url: string, params?: TypeObject, config?: RequestConfig) => Promise<T>;
    post: <T_1>(url: string, data?: TypeObject | FormData, config?: RequestConfig) => Promise<T_1>;
    del: <T_2>(url: string, config?: RequestConfig) => Promise<T_2>;
    request: <T_3>(config: RequestConfig) => Promise<T_3>;
};
export default createHttpClient;
