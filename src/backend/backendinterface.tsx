export type PricingData = {
  id: string;
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
