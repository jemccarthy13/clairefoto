const baseURL = process.env.REACT_APP_BASE_URL;

const params: RequestInit = {
  method: "GET", // *GET, POST, PUT, DELETE, etc.
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache",
  credentials: "same-origin", // include, *same-origin, omit
  headers: {
    "Content-Type": "application/json",
  },
  referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
};

export const httputils = {
  // FETCH GET for server API
  async get(url = "") {
    const response = await fetch(baseURL + url, {
      ...params,
    });
    return response.json();
  },

  // FETCH POST for server API
  async post(url: string, data: any = "", stringify = true) {
    const response = await fetch(baseURL + url, {
      ...params,
      method: "POST",
      body: stringify ? JSON.stringify(data) : data,
    });
    return response.json();
  },

  // FETCH PUT for server API
  async put(url: string, data: any = "", stringify = true) {
    const response = await fetch(baseURL + url, {
      ...params,
      method: "PUT",
      body: stringify ? JSON.stringify(data) : data,
    });
    return response;
  },

  // FETCH DETE for server API
  async delete(url: string, data: any = "", stringify = true) {
    const response = await fetch(baseURL + url, {
      ...params,
      method: "DELETE",
      body: stringify ? JSON.stringify(data) : data,
    });
    return response;
  },
};

export default httputils;
