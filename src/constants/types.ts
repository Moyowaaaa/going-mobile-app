import { ReactNode } from "react";
import { ImageSourcePropType } from "react-native";

export type font = { type: string; font: string };
export type PopularEventItem = {
  rank?: number;
  title: string;
  meta?: string;
  color: string;
  ticketsSold?: string;
  type: string[];
};

export interface EventItem extends PopularEventItem {
  date: string;
  location: string;
  price: string;
  featured?: boolean;
  time: string;
}


export type order = {
  event:EventItem,
  id:string, title:string, date:string; location:string, ticketCount:number, price:number, status:string, color:string}


export type notification = {
  icon?:any,
  title:string,
  body:string,
  time:string,
  unread:Boolean
}