import {
  BlackOut,
  BlackOutDate,
  BookingAppointment,
  PricingData,
} from "./backendinterface";
import { httputils } from "./httputils";

class Backend {
  async getImages(dir: string) {
    const formd = { directory: dir };

    return await httputils.post("/database/getimages.php", formd);
  }

  async getPricing() {
    return await httputils.post("/database/getpricing.php");
  }

  //-----------------------------------------------------------------------------
  //
  // Mock data generators for frontend only development
  //
  //-----------------------------------------------------------------------------
  // Mock endpoint for getting unit data
  mockPrice(
    id: string,
    title: string,
    price: string,
    num_images: string,
    print_rel: string,
    custom_txt: string[],
    bkg?: boolean
  ): PricingData {
    return {
      id,
      title,
      price,
      options: {
        num_images,
        print_rel,
        custom_txt,
      },
      booking: bkg !== false,
    };
  }

  //-----------------------------------------------------------------------------
  //
  // Backend API is the gateway to database data.
  //
  // For convenience, these calls have the associated pseudo-SQL
  //
  //-----------------------------------------------------------------------------

  // Mock SELECT * FROM PRICING WHERE BOOKING=1
  getPricingOptions(): string[] {
    return ["30-minute", "45-minute"];
  }

  // Mock SELECT * FROM PRICING
  getPrices(): PricingData[] {
    const array: PricingData[] = [];

    array.push(this.mockPrice("1", "30-minute", "$75", "20+", "Full", []));
    array.push(this.mockPrice("2", "45-minute", "$95", "35+", "Full", []));
    array.push(
      this.mockPrice(
        "3",
        "Seasonal",
        "TBD",
        "",
        "",
        ["Details will be published on social media"],
        false
      )
    );
    array.push(
      this.mockPrice(
        "4",
        "Packages",
        "Contact Me",
        "",
        "",
        ["Birthdays", "Weddings", "Special Events"],
        false
      )
    );
    return array;
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
