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

  // FETCH PUT for server API
  async post(data: any, url = "") {
    const response = await fetch(baseURL + url, {
      method: "POST",
      body: JSON.stringify(data),
      ...params,
    });
    return response.json();
  },
};

// class sBackend {
//   // SELECT * FROM PRICING
//   getPrices(): PricingData[] {
//     console.log("get prices s");
//     let mydata: PricingData[] = [];
//     httputils.get("/api/prices.php").then((data: PricingData[]) => {
//       mydata = data;
//     });
//     return mydata;
//   }
// }

export default httputils;
