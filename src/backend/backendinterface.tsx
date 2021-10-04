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

export interface Backend {
  getPrices: { (): PricingData[] };
}
