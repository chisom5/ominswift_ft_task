import {
  makeHttpRequest,
  makeFormDataHttpRequest
} from "../helper/httpHelpers";
import baseUrl from "../config/baseUrl";


export const makePostRequest = (url, data = {}, params = {}) =>
  makeHttpRequest(`${baseUrl}${url}`, data, "POST", params || {});

export const makeGetRequest = (url, params = {}) =>
  makeHttpRequest(`${baseUrl}${url}`, {}, "GET", params || {});

  export const makePostFormDataRequest = (url, data = {}, params = {}) =>
  makeFormDataHttpRequest(`${baseUrl}${url}`, data, "POST", params || {});

  
