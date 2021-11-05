import {
  BlackOut,
  // BlackOutDate,
  BookingAppointment,
  ImageList,
  PricingData,
} from "./backendinterface";
import { httputils } from "./httputils";

class Backend {
  // *************** Contact *************//

  /**
   * When the contact form is submitted, send a notification to the
   * admin and the user who submitted the form.
   *
   * @param contactData FormData for contact me (sent to admin)
   * @param confirmData FormData for contact confirm (sent to user)
   * @returns Response to fetch
   */
  async contactFormSubmit(contactData: FormData, confirmData: FormData) {
    let response = {
      ok: false,
    };
    try {
      await Promise.all([
        fetch(process.env.REACT_APP_BASE_URL + "/api/email/contactme.php", {
          method: "POST",
          body: contactData,
        }),
        fetch(
          process.env.REACT_APP_BASE_URL + "/api/email/contactconfirm.php",
          {
            method: "POST",
            body: confirmData,
          }
        ),
      ]).then(([response1, response2]) => {
        response = response1;
      });
    } catch {}

    return response;
  }

  // *************** Images *************//

  /**
   * Get images from the server
   *
   * @param dir The directory on the server to get images from
   * @returns A response that is typecasted to ImageList[]
   */
  async getImages(dir: string, signal: AbortSignal): Promise<ImageList[]> {
    const formd = { directory: dir };
    return httputils
      .post("/api/image/image.php", formd, true, signal)
      .then((data) => {
        return data.json();
      });
  }

  /**
   * Delete an image from the server
   *
   * @param src The src path to delete
   * @returns Response from the fetch API
   */
  async deleteImage(src: string): Promise<Response> {
    return await httputils.delete("/api/image/image.php", {
      file: src,
    });
  }

  // *************** Admin management *************//
  /**
   * Check user credentials on the server. If authenticated,
   * response.json() should include a jwt.
   *
   * @param username Username entered by the user
   * @param password Password entered by the user
   * @returns Response from login API
   */
  async login(username: string, password: string): Promise<Response> {
    return await httputils.post("/api/login/login.php", { username, password });
  }

  /**
   * Change password for a user; no checks on password
   *
   * @param username Username entered by user
   * @param password Password entered by user (current password)
   * @param newpassword New password entered by user (desired password)
   * @returns Response, where response.ok is true iff update is successful
   */
  async changePassword(
    username: string,
    password: string,
    newpassword: String
  ) {
    return await httputils.put("/api/login/login.php", {
      username,
      password,
      newpassword,
    });
  }

  // *************** Pricing *************//
  /**
   * Get prices from server
   * @returns PricingData[] array of prices from server
   */
  async getPricing(): Promise<PricingData[]> {
    return await httputils.get("/api/pricing/pricing.php");
  }

  /**
   * Update a pricing option on the server
   *
   * @param data updated pricing option data
   * @returns Response, where response.ok is true iff update successful
   */
  async updatePrice(data: PricingData): Promise<Response> {
    return await httputils.put("/api/pricing/pricing.php", data);
  }

  /**
   * Add a pricing option to the server
   *
   * @param data new pricing option data
   * @returns Response, where response.ok is true iff add is successful
   */
  async addPricing(data: PricingData) {
    return await httputils.post("/api/pricing/pricing.php", data);
  }

  /**
   * Delete a pricing option from the server
   *
   * @param data the pricing option to delete
   * @returns Response, where resp.ok is true iff delete successful
   */
  async deletePricing(data: PricingData) {
    return await httputils.delete("/api/pricing/pricing.php", data);
  }

  /**
   * Get Pricing options list from the server
   *
   * @returns string[] containing titles of pricing options
   */
  async getPricingOptions(): Promise<string[]> {
    return backend.getPricing().then((data): string[] => {
      let answer: string[] = [];
      data.forEach((d: any) => {
        d.booking = d.booking === "1" ? true : false;
        if (d.booking) {
          answer.push(d.title);
        }
      });
      return answer;
    });
  }

  // *************** Booking / Appointments *************//

  submitBookingAppt(event: BookingAppointment): Promise<boolean> {
    let url = "/api/booking/booking.php";
    const data = JSON.stringify(event);
    httputils.post(data, url);
    return new Promise(() => true);
  }

  getBlackOutDates(): Promise<BlackOut> {
    return new Promise(() => []);
  }
}

const backend = new Backend();

export default backend;

// submitBookingAppt(event: BookingAppointment): Promise<boolean> {
//   // let url = this.calBaseURL + this.cID + "/events?";
//   // // url += "sendUpdates=all&alt=json";
//   // // url += "&key=" + this.calKey;
//   // // const data = JSON.stringify(event);
//   // return post(data, url);

//   let url = "/api/booking/booking.php";
//   const data = JSON.stringify(event);

//   httputils.post(data, url);
//   return new Promise(() => true);
// }

// getBlackOutDates(): Promise<BlackOut> {
//   // const arrDates: BlackOutDate[] = [];
//   // const arrTimes: BlackOutDate[] = [];
//   // let mydata: any;
//   return new Promise(() => []);
//   // return httputils
//   //   .get(this.calBaseURL + this.cID + "/events?key=" + this.calKey)
//   //   .then((data: any) => {
//   //     mydata = data.items;
//   //     mydata.forEach((date: any) => {
//   //       let start = new Date(date.start.dateTime);
//   //       let end = new Date(date.end.dateTime);
//   //       if (isNaN(start.getTime()) && isNaN(end.getTime())) {
//   //         start = new Date(date.start.date + "T00:00:00Z");
//   //         end = new Date(date.end.date + "T17:59:00Z");
//   //         arrDates.push({
//   //           start: start,
//   //           end: end,
//   //         });
//   //       } else {
//   //         arrTimes.push({
//   //           start: start,
//   //           end: end,
//   //         });
//   //       }
//   //     });
//   //     return { dates: arrDates, times: arrTimes };
//   //   });
// }
