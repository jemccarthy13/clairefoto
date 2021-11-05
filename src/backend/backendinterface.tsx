/**
 * Contains information on an image.
 *
 * @member {string} title Title of the image
 * @member {number} width Width of the image
 * @member {number} height Height of the image
 * @member {string} srcSet Source set for the image
 * @member {string} src Source path of the image
 */
export interface ImageList {
  title: string;
  width: number;
  height: number;
  srcSet: string;
  src: string;
}

/**
 * Contains information on a pricing option.
 *
 * @member {string} id ID number of the price option
 * @member {string} title Title of the price option
 * @member {string} price Price cost of the price option
 * @member {Object} options num_images, print_rel, custom_text
 */
export interface PricingData {
  id: string;
  title: string;
  price: string;
  options: {
    num_images: string;
    print_rel: string;
    custom_txt: string[];
  };
  booking: boolean;
}

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

export type Attendee = {
  email: string;
  displayName?: string;
};

export type BookingAppointment = {
  end: { dateTime: string };
  start: { dateTime: string };
  status: string;
  summary: string;
  attendees: Attendee[];
};
