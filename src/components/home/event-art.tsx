import { Text, View } from "react-native";

import { getEventPalette } from "@/constants/event-colors";

type EventArtProps = {
  color: string;
  label: string;
  height?: number;
};

export function EventArt({ color, label, height = 200 }: EventArtProps) {
  const palette = getEventPalette(color);

  return (
    <View
      style={{ backgroundColor: palette.background, height }}
      className="relative overflow-hidden rounded-[20px]">
      <Text
        style={{ color: palette.label }}
        className="absolute left-[18px] top-[17px] z-10 text-[10px] font-extrabold uppercase tracking-[1.6px]">
        {label}
      </Text>

      <View
        style={{
          position: "absolute",
          right: "-15%",
          bottom: "-38%",
          width: "80%",
          height: "90%",
          borderRadius: 999,
          backgroundColor: palette.shapeOne,
          transform: [{ rotate: "-24deg" }],
        }}
      />
      <View
        style={{
          position: "absolute",
          left: "28%",
          bottom: "-56%",
          width: "42%",
          height: "90%",
          borderRadius: 999,
          backgroundColor: palette.shapeTwo,
          transform: [{ rotate: "-24deg" }],
        }}
      />

      <View
        style={{ position: "absolute", right: 18, top: 16, transform: [{ rotate: "9deg" }] }}
        className="items-center">
        <Text className="text-[10px] font-bold tracking-[1.2px] text-white/80">LIVE</Text>
        <Text className="text-[18px] font-extrabold tracking-[-0.7px] text-white">NYC</Text>
      </View>
    </View>
  );
}
