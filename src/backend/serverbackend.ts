import { Backend, PricingData } from "./backendinterface";

const baseURL = "";

// FETCH GET for server API
async function get(url = "") {
  // Default options are marked with *
  const response = await fetch(baseURL + url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

// FETCH PUT for server API
// eslint-disable-next-line
async function post(data: any, url = "") {
  const response = await fetch(baseURL + url, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}

class sBackend implements Backend {
  async addPrice(price: PricingData): Promise<string> {
    return post(price, "/api/prices.php");
  }

  // SELECT * FROM PRICING
  getPrices(): PricingData[] {
    console.log("get prices s");
    let mydata: PricingData[] = [];
    get("/api/prices.php").then((data: PricingData[]) => {
      mydata = data;
    });
    return mydata;
  }
}

const serverBackend = new sBackend();

export default serverBackend;
