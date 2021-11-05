import { Cookies } from "react-cookie-consent";

const baseURL = process.env.REACT_APP_BASE_URL;

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

export const httputils = {
  // FETCH GET for server API
  async get(url = ""): Promise<any> {
    const response = await fetch(baseURL + url, {
      ...params,
      headers: {
        ...params.headers,
      },
    });
    return response.json();
  },

  // FETCH POST for server API
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

  // FETCH PUT for server API
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

  // FETCH DETE for server API
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
