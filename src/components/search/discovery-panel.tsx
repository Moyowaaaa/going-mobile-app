import { Clock, TrendingUp } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { Pressable, Text, View } from "react-native";

import { popularEvents } from "@/constants/data";
import { DisplayFont } from "@/constants/theme";

const trendingSearches = popularEvents.map((event) => event.title);

type DiscoveryPanelProps = {
  recentSearches: string[];
  onPickSearch: (term: string) => void;
  onClearRecent: () => void;
  categories: string[];
  activeCategory: string | null;
  onPickCategory: (category: string) => void;
};

export function DiscoveryPanel({
  recentSearches,
  onPickSearch,
  onClearRecent,
  categories,
  activeCategory,
  onPickCategory,
}: DiscoveryPanelProps) {
  const { colorScheme } = useColorScheme();
  const mutedColor = colorScheme === "dark" ? "#a9a9a3" : "#777773";

  return (
    <View className="gap-8 pb-6">
      {recentSearches.length > 0 ? (
        <View className="gap-3">
          <View className="flex-row items-center justify-between">
            <Text className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#ff775d]">
              Recent
            </Text>
            <Pressable
              onPress={onClearRecent}
              accessibilityRole="button"
              className="active:opacity-60">
              <Text className="text-xs font-semibold text-[#777773] dark:text-[#a9a9a3]">
                Clear
              </Text>
            </Pressable>
          </View>

          <View className="flex-row flex-wrap gap-2">
            {recentSearches.map((term) => (
              <Pressable
                key={term}
                onPress={() => onPickSearch(term)}
                accessibilityRole="button"
                className="flex-row items-center gap-1.5 rounded-full border border-black/10 bg-white px-3.5 py-2 active:opacity-70 dark:border-white/15 dark:bg-[#151b2e]">
                <Clock size={13} color={mutedColor} />
                <Text className="text-sm text-[#111111] dark:text-[#f5f2ec]">{term}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      ) : null}

      <View className="gap-3">
        <View className="flex-row items-center gap-2">
          <TrendingUp size={14} color="#ff775d" />
          <Text className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#ff775d]">
            Trending in New York
          </Text>
        </View>

        <View className="flex-row flex-wrap gap-2">
          {trendingSearches.map((term) => (
            <Pressable
              key={term}
              onPress={() => onPickSearch(term)}
              accessibilityRole="button"
              className="rounded-full border border-black/10 bg-white px-3.5 py-2 active:opacity-70 dark:border-white/15 dark:bg-[#151b2e]">
              <Text className="text-sm text-[#111111] dark:text-[#f5f2ec]">{term}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View className="gap-3">
        <Text className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#ff775d]">
          Browse by category
        </Text>

        <View className="flex-row flex-wrap gap-2">
          {categories.map((category) => {
            const active = activeCategory === category;
            return (
              <Pressable
                key={category}
                onPress={() => onPickCategory(category)}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                className={`rounded-full border px-4 py-2 active:opacity-80 ${
                  active
                    ? "border-[#111111] bg-[#111111] dark:border-[#f5f2ec] dark:bg-[#f5f2ec]"
                    : "border-black/10 bg-white dark:border-white/15 dark:bg-[#151b2e]"
                }`}>
                <Text
                  className={`text-sm font-medium ${
                    active
                      ? "text-white dark:text-[#111111]"
                      : "text-[#777773] dark:text-[#a9a9a3]"
                  }`}>
                  {category}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View className="rounded-3xl bg-[#f0ede8] p-5 dark:bg-[#111827]">
        <Text
          style={{ fontFamily: DisplayFont }}
          className="text-xl font-bold tracking-[-0.8px] text-[#111111] dark:text-[#f5f2ec]">
          Can&apos;t find it?
        </Text>
        <Text className="mt-1.5 text-sm leading-5 text-[#777773] dark:text-[#a9a9a3]">
          Try an artist, a venue, or a neighborhood — we&apos;ll do the digging.
        </Text>
      </View>
    </View>
  );
}
