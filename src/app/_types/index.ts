import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      guestId: number | undefined;
    } & DefaultSession["user"];
  }
}

export interface Cabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description?: string;
  image: string;
  created_at?: string;
}

export interface Booking {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice?: number;
  extrasPrice?: number;
  totalPrice: number;
  status?: string;
  hasBreakfast?: boolean;
  isPaid?: boolean;
  observations?: string;
  cabinId: number;
  guestId: number;
  cabins: Cabin;
}

export interface Country {
  names: {
    common: string;
  };
  flag: {
    url_png: string;
  };
}

export interface Guest {
  id?: number;
  fullName: string;
  email: string;
  nationalID?: string;
  nationality?: string;
  countryFlag?: string;
  created_at?: string;
}

export interface Settings {
  minBookingLength: number;
  maxBookingLength: number;
}
