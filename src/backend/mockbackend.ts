import { Backend, PricingData } from "./backendinterface";

class mBackend implements Backend {
  //-----------------------------------------------------------------------------
  //
  // Mock data generators for frontend only development
  //
  //-----------------------------------------------------------------------------
  // Mock endpoint for getting unit data
  mockPrice(
    title: string,
    price: string,
    num_images: string,
    print_rel: string,
    custom_txt: string[],
    bkg?: boolean
  ): PricingData {
    return {
      title: title,
      price: price,
      options: {
        num_images: num_images,
        print_rel: print_rel,
        custom_txt: custom_txt,
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

  // Mock SELECT * FROM PRICING
  getPrices(): PricingData[] {
    const array: PricingData[] = [];

    array.push(this.mockPrice("30-minute", "$75", "20+", "Full", []));
    array.push(this.mockPrice("45-minute", "$95", "35+", "Full", []));
    array.push(
      this.mockPrice(
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
}

const mockBackend = new mBackend();

export default mockBackend;
