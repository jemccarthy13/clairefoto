import { Cookies } from "react-cookie-consent";

const baseURL = process.env.REACT_APP_BASE_URL;

/**
 * Initial parameters for a request;
 * - Mode: CORS
 * - Cache: no-cache
 * - Credentials: include
 * - Headers: content-type, application/json
 */
const params: RequestInit = {
  method: "GET", // *GET, POST, PUT, DELETE, etc.
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache",
  credentials: "include", // include, *same-origin, omit
  headers: {
    "Content-Type": "application/json",
  },
  referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
};

/**
 * An object containing the http wrappers for request methods
 */
export const httputils = {
  /**
   * HTTP GET fetch wrapper
   *
   * @param url The API url endpoint
   * @returns response promise
   */
  async get(url = ""): Promise<any> {
    const response = await fetch(baseURL + url, {
      ...params,
      headers: {
        ...params.headers,
      },
    });
    return response.json();
  },

  /**
   * HTTP POST fetch wrapper
   *
   * @param url the API url endpoint
   * @param data POST data
   * @param stringify true iff should JSON.stringify the body
   * @returns response promise
   */
  async post(url: string, data: any = "", stringify = true) {
    const response = await fetch(baseURL + url, {
      ...params,
      headers: {
        Authorization: "Bearer " + Cookies.get("fotojwt"),
        ...params.headers,
      },
      method: "POST",
      body: stringify ? JSON.stringify(data) : data,
    });
    return response;
  },

  /**
   * HTTP PUT fetch wrappper
   *
   * @param url the API url endpoint
   * @param data PUT body
   * @param stringify true iff should JSON.stringify the body
   * @returns
   */
  async put(url: string, data: any = "", stringify = true): Promise<Response> {
    const response = await fetch(baseURL + url, {
      ...params,
      headers: {
        Authorization: "Bearer " + Cookies.get("fotojwt"),
        ...params.headers,
      },
      method: "PUT",
      body: stringify ? JSON.stringify(data) : data,
    });
    return response;
  },

  /**
   * HTTP DELETE fetch wrapper
   *
   * @param url the API url endpoint
   * @param data data for the delete message
   * @param stringify true iff should JSON.stringify the result
   * @returns response promise
   */
  async delete(url: string, data: any = "", stringify = true) {
    const response = await fetch(baseURL + url, {
      ...params,
      headers: {
        Authorization: "Bearer " + Cookies.get("fotojwt"),
        ...params.headers,
      },
      method: "DELETE",
      body: stringify ? JSON.stringify(data) : data,
    });
    return response;
  },
};

export default httputils;
