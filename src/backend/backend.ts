import {
  BlackOut,
  BlackOutDate,
  BookingAppointment,
  PricingData,
} from "./backendinterface";
import { httputils } from "./httputils";

class Backend {
  async contactFormSubmit(contactData: any, confirmData: any) {
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

  async getImages(dir: string) {
    const formd = { directory: dir };
    return await httputils.post("/api/getimages.php", formd);
  }

  // *************** Pricing *************//
  async getPricing() {
    return await httputils.get("/api/pricing/pricing.php");
  }

  async updatePrice(data: PricingData) {
    return await httputils.put("/api/pricing/pricing.php", data);
  }

  async addPricing(data: PricingData) {
    return await httputils.post("/api/pricing/pricing.php", data);
  }

  // Mock SELECT * FROM PRICING WHERE BOOKING=1
  getPricingOptions(): string[] {
    return ["30-minute", "45-minute"];
  }

  cID = "jemccarthy13@gmail.com";
  calBaseURL = "https://content.googleapis.com/calendar/v3/calendars/";
  calKey = "AIzaSyCsyQYXAr3wjRTbhvvS--WDFVsESAObrS4";

  submitBookingAppt(event: BookingAppointment): Promise<boolean> {
    // let url = this.calBaseURL + this.cID + "/events?";
    // // url += "sendUpdates=all&alt=json";
    // // url += "&key=" + this.calKey;
    // // const data = JSON.stringify(event);
    // return post(data, url);

    let url = "/api/event.php";
    const data = JSON.stringify(event);

    httputils.post(data, url);
    return new Promise(() => true);
  }

  getBlackOutDates(): Promise<BlackOut> {
    const arrDates: BlackOutDate[] = [];
    const arrTimes: BlackOutDate[] = [];
    let mydata: any;
    return httputils
      .get(this.calBaseURL + this.cID + "/events?key=" + this.calKey)
      .then((data: any) => {
        mydata = data.items;
        mydata.forEach((date: any) => {
          let start = new Date(date.start.dateTime);
          let end = new Date(date.end.dateTime);
          if (isNaN(start.getTime()) && isNaN(end.getTime())) {
            start = new Date(date.start.date + "T00:00:00Z");
            end = new Date(date.end.date + "T17:59:00Z");
            arrDates.push({
              start: start,
              end: end,
            });
          } else {
            arrTimes.push({
              start: start,
              end: end,
            });
          }
        });
        return { dates: arrDates, times: arrTimes };
      });
  }
}

const backend = new Backend();

export default backend;
