// import { randomizeStuff } from "@/utils";
// import {
//   airline,
//   durations,
//   faq,
//   flight,
//   flightClasses,
//   location,
//   onBoardingScreenText,
//   tripType,
// } from "./types";
import { ImageSourcePropType } from "react-native";

import type { EventItem, order, PopularEventItem } from "./types";

export const popularEvents: PopularEventItem[] = [
  {
    rank: 1,
    title: "Solange: Night Bloom",
    meta: "Fri, Jun 20 · Pier 17",
    type: [""],
    color: "music",
    ticketsSold: "2.4k",
  },
  {
    rank: 2,
    title: "House of Yes: Genesis",
    meta: "Sat, Jun 28 · Queens",
    type: [""],
    color: "house",
    ticketsSold: "1.8k",
  },
  {
    rank: 3,
    title: "The Midnight Market",
    meta: "Sat, Jun 14 · Brooklyn",
    type: [""],
    color: "market",
    ticketsSold: "1.2k",
  },
];

export const eventCategories = [
  "For you",
  "Music",
  "Food & drink",
  "Arts & culture",
  "Nightlife",
  "Wellness",
];

export const AvailableEvents: EventItem[] = [
  {
    title: "The Midnight Market",
    type: ["Food & drink"],
    date: "Sat, Jun 14",
    time: "7:00 PM",
    location: "The Foundry, Brooklyn",
    price: "$24",
    color: "market",
  },
  {
    title: "Solange: Night Bloom",
    type: ["Music"],
    date: "Fri, Jun 20",
    time: "8:30 PM",
    location: "Pier 17, New York",
    price: "$68",
    color: "music",
    featured: true,
  },
  {
    title: "Modern Makers Fair",
    type: ["Arts & culture"],
    date: "Sun, Jun 22",
    time: "11:00 AM",
    location: "Industry City, Brooklyn",
    price: "$12",
    color: "makers",
  },
  {
    title: "Rooftop Cinema Club",
    type: ["Film"],
    date: "Thu, Jun 26",
    time: "9:00 PM",
    location: "The Skylark, Manhattan",
    price: "$18",
    color: "cinema",
  },
  {
    title: "House of Yes: Genesis",
    type: ["Nightlife"],
    date: "Sat, Jun 28",
    time: "10:00 PM",
    location: "House of Yes, Queens",
    price: "$35",
    color: "house",
  },
  {
    title: "Sunday Sounds",
    type: ["Music"],
    date: "Sun, Jun 29",
    time: "2:00 PM",
    location: "Central Park, New York",
    price: "$0",
    color: "sounds",
  },
];


export const orders:order[] = [  { id: 'GO-240614-01', title: 'The Midnight Market', date: 'Sat, Jun 14 · 7:00 PM', location: 'The Foundry, Brooklyn', ticketCount: 2, price:48, status: 'Upcoming', color: 'market' },
  { id: 'GO-240528-09', title: 'Spring Studio Sessions', date: 'Wed, May 28 · 8:00 PM', location: 'Public Records, Brooklyn', ticketCount: 1, price: 32, status: 'Past', color: 'music' },
]