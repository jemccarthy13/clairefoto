export type PricingData = {
  title: string;
  price: string;
  options: {
    num_images: string;
    print_rel: string;
    custom_txt: string[];
  };
  booking: boolean;
};

export type GoogleDateTime = {
  dateTime: string;
  timeZone: string;
};

export type BlackOut = {
  dates: BlackOutDate[];
  times: BlackOutDate[];
};

export type BlackOutDate = {
  start: Date;
  end: Date;
};

export interface Backend {
  getPrices: { (): PricingData[] };
  getBlackOutDates: { (): Promise<BlackOut> };
}
