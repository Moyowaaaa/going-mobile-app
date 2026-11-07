import { Heart } from "lucide-react-native";
import { memo, useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { getEventPalette } from "@/constants/event-colors";

export type ResultRowProps = {
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  price: string;
  color: string;
  favorite: boolean;
  onPress: (title: string) => void;
  onToggleFavorite: (title: string) => void;
};

/**
 * Memoized list row. Receives primitives only so `memo` can shallow-compare
 * and skip re-renders while the user keeps typing.
 */
export const ResultRow = memo(function ResultRow({
  title,
  category,
  date,
  time,
  location,
  price,
  color,
  favorite,
  onPress,
  onToggleFavorite,
}: ResultRowProps) {
  const palette = getEventPalette(color);
  const handleOpen = useCallback(() => onPress(title), [onPress, title]);
  const handleFavorite = useCallback(() => onToggleFavorite(title), [onToggleFavorite, title]);

  return (
    <Pressable
      onPress={handleOpen}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${date} at ${location}`}
      style={styles.row}
      className="flex-row items-center gap-3 rounded-2xl bg-white p-3 active:opacity-70 dark:bg-[#151b2e]">
      <View style={[styles.thumb, { backgroundColor: palette.background }]}>
        <View style={[styles.thumbShape, { backgroundColor: palette.shapeOne }]} />
      </View>

      <View className="min-w-0 flex-1">
        <Text
          numberOfLines={1}
          className="text-base font-bold text-[#111111] dark:text-[#f5f2ec]">
          {title}
        </Text>
        <Text numberOfLines={1} className="mt-1 text-xs text-[#777773] dark:text-[#a9a9a3]">
          {date} · {time}
        </Text>
        <Text numberOfLines={1} className="mt-0.5 text-xs text-[#777773] dark:text-[#a9a9a3]">
          {location}
        </Text>
      </View>

      <View className="items-end gap-2">
        <Text className="text-sm font-semibold text-[#111111] dark:text-[#f5f2ec]">
          {price === "$0" ? "Free" : price}
        </Text>
        <Pressable
          onPress={handleFavorite}
          accessibilityRole="button"
          accessibilityState={{ selected: favorite }}
          accessibilityLabel={`${favorite ? "Remove" : "Save"} ${title}`}
          hitSlop={8}
          className="active:opacity-60">
          <Heart
            size={18}
            color={favorite ? "#ff775d" : "#a9a9a3"}
            fill={favorite ? "#ff775d" : "transparent"}
          />
        </Pressable>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  row: {
    borderCurve: "continuous",
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 16,
    borderCurve: "continuous",
    overflow: "hidden",
  },
  thumbShape: {
    position: "absolute",
    right: -10,
    bottom: -18,
    width: 44,
    height: 44,
    borderRadius: 999,
    transform: [{ rotate: "-24deg" }],
  },
});
