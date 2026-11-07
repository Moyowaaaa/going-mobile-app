export type EventPalette = {
  background: string;
  label: string;
  shapeOne: string;
  shapeTwo: string;
};

const fallbackShapes = {
  label: "rgba(255,255,255,0.8)",
  shapeOne: "rgba(255,255,255,0.2)",
  shapeTwo: "rgba(12,22,68,0.45)",
};

/** Keyed by the accent hex users pick. The first five are the create-event swatches; the rest are the event-art looks. */
export const eventPalettes: Record<string, EventPalette> = {
  "#ff775d": {
    background: "#ff775d",
    label: "rgba(255,255,255,0.9)",
    shapeOne: "rgba(255,214,196,0.55)",
    shapeTwo: "rgba(90,24,16,0.35)",
  },
  "#f4b942": {
    background: "#f4b942",
    label: "#3d2c08",
    shapeOne: "rgba(255,255,255,0.45)",
    shapeTwo: "rgba(90,52,8,0.35)",
  },
  "#55b8a3": {
    background: "#55b8a3",
    label: "rgba(255,255,255,0.9)",
    shapeOne: "rgba(214,245,236,0.5)",
    shapeTwo: "rgba(12,58,48,0.4)",
  },
  "#8f8cf5": {
    background: "#8f8cf5",
    label: "rgba(255,255,255,0.9)",
    shapeOne: "rgba(226,224,255,0.55)",
    shapeTwo: "rgba(32,24,92,0.4)",
  },
  "#e878b5": {
    background: "#e878b5",
    label: "rgba(255,255,255,0.9)",
    shapeOne: "rgba(255,214,236,0.5)",
    shapeTwo: "rgba(92,20,56,0.38)",
  },
  "#d7a36c": {
    background: "#d7a36c",
    ...fallbackShapes,
  },
  "#2a3070": {
    background: "#2a3070",
    label: "rgba(255,255,255,0.8)",
    shapeOne: "rgba(252,124,87,0.85)",
    shapeTwo: "rgba(255,190,148,0.45)",
  },
  "#bdc7bb": {
    background: "#bdc7bb",
    label: "#344336",
    shapeOne: "rgba(51,92,67,0.4)",
    shapeTwo: "rgba(12,22,68,0.45)",
  },
  "#d76e4d": {
    background: "#d76e4d",
    label: "rgba(255,255,255,0.8)",
    shapeOne: "rgba(247,194,98,0.65)",
    shapeTwo: "rgba(12,22,68,0.45)",
  },
  "#e19a4c": {
    background: "#e19a4c",
    label: "rgba(255,255,255,0.8)",
    shapeOne: "rgba(65,34,81,0.5)",
    shapeTwo: "rgba(12,22,68,0.45)",
  },
  "#7f9eaf": {
    background: "#7f9eaf",
    label: "rgba(255,255,255,0.8)",
    shapeOne: "rgba(210,229,196,0.45)",
    shapeTwo: "rgba(12,22,68,0.45)",
  },
};

export const accentOptions = Object.keys(eventPalettes);

export function getEventPalette(color: string): EventPalette {
  const match = eventPalettes[color.toLowerCase()];
  if (match) return match;

  return {
    background: color,
    ...fallbackShapes,
  };
}
