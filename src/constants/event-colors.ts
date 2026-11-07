export type EventPalette = {
  background: string;
  label: string;
  shapeOne: string;
  shapeTwo: string;
};

export const eventPalettes: Record<string, EventPalette> = {
  market: {
    background: "#d7a36c",
    label: "rgba(255,255,255,0.8)",
    shapeOne: "rgba(255,255,255,0.2)",
    shapeTwo: "rgba(12,22,68,0.45)",
  },
  music: {
    background: "#2a3070",
    label: "rgba(255,255,255,0.8)",
    shapeOne: "rgba(252,124,87,0.85)",
    shapeTwo: "rgba(255,190,148,0.45)",
  },
  makers: {
    background: "#bdc7bb",
    label: "#344336",
    shapeOne: "rgba(51,92,67,0.4)",
    shapeTwo: "rgba(12,22,68,0.45)",
  },
  cinema: {
    background: "#d76e4d",
    label: "rgba(255,255,255,0.8)",
    shapeOne: "rgba(247,194,98,0.65)",
    shapeTwo: "rgba(12,22,68,0.45)",
  },
  house: {
    background: "#e19a4c",
    label: "rgba(255,255,255,0.8)",
    shapeOne: "rgba(65,34,81,0.5)",
    shapeTwo: "rgba(12,22,68,0.45)",
  },
  sounds: {
    background: "#7f9eaf",
    label: "rgba(255,255,255,0.8)",
    shapeOne: "rgba(210,229,196,0.45)",
    shapeTwo: "rgba(12,22,68,0.45)",
  },
};

export function getEventPalette(color: string): EventPalette {
  return eventPalettes[color] ?? eventPalettes.market;
}
