import axios, {AxiosPromise, AxiosRequestConfig} from 'axios'
import {API_URL} from "@/constants/GeneralConstants";
import {HTTP_METHODS} from "@/constants/ServiceConstants";
import {HttpMethods} from "@/types/SimplifyTypes";

/**
 * The Axios API.
 */
export const api = axios.create({
  baseURL: API_URL
})

/**
 * Executes the promise.
 * @param promise - The axios promise.
 * @param successCallback - the method that will be called in case of success.
 * @param errorCallback - the method that will be called in case of error.
 * @param finallyCallback - the method that will be called in any case after all.
 */
function executePromise(promise: AxiosPromise, successCallback: (response: any) => void, errorCallback: (response: any) => void, finallyCallback: () => void) {
  const defaultSuccessCallback = (response: any) => {
    successCallback?.(response?.data);
  }
  const defaultErrorCallback = (response: any) => {
    errorCallback?.(response?.data);
  }
  const defaultFinallyCallback = () => {
    finallyCallback?.();
  }
  promise.then(defaultSuccessCallback).catch(defaultErrorCallback).finally(defaultFinallyCallback)
}

/**
 * Performs the request.
 * @param method - The http method.
 * @param url - The url.
 * @param data - The optional data.
 * @returns - The axios promise.
 */
function performRequest(method: HttpMethods, url: string, data?: AxiosRequestConfig): AxiosPromise {
  const requestMethods = {
    [HTTP_METHODS.DELETE]: () => api.delete(url),
    [HTTP_METHODS.GET]: () => api.get(url),
    [HTTP_METHODS.POST]: () => api.post(url, data),
    [HTTP_METHODS.PUT]: () => api.put(url, data)
  }
  return requestMethods[method]?.();
}

export default { executePromise, performRequest }
