import { Image } from "expo-image";
import { ArrowRight, Search } from "lucide-react-native";
import { Pressable, Text, TextInput, View } from "react-native";

import heroImage from "@/assets/images/event-hero.png";
import { DisplayFont } from "@/constants/theme";

const styles = {
  fill: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
} as const;

type HeroProps = {
  query: string;
  onChangeQuery: (value: string) => void;
  onSubmit: () => void;
};

export function Hero({ query, onChangeQuery, onSubmit }: HeroProps) {
  return (
    <View className="overflow-hidden rounded-[28px] bg-[#162c67]">
      <Image source={heroImage} contentFit="cover" style={[styles.fill, { opacity: 0.4 }]} />
      <View style={[styles.fill, { backgroundColor: "rgba(22,44,103,0.82)" }]} />
      <View
        style={{
          position: "absolute",
          top: -180,
          left: "30%",
          width: 340,
          height: 340,
          borderRadius: 999,
          backgroundColor: "#304d9d",
          opacity: 0.6,
        }}
      />

      <View className="px-6 py-10">
        <View className="mb-5 flex-row items-center gap-2">
          <View className="h-[7px] w-[7px] rounded-full bg-[#ff775d]" />
          <Text className="text-[11px] font-extrabold uppercase tracking-[2.4px] text-[#fdbb9a]">
            Your city, your plans
          </Text>
        </View>

        <Text
          style={{ fontFamily: DisplayFont }}
          className="text-[44px] font-bold leading-[42px] tracking-[-2.6px] text-white">
          Make plans{"\n"}
          <Text className="text-[#ff9e7d]">worth remembering.</Text>
        </Text>

        <Text className="mt-5 max-w-[430px] text-base leading-6 text-white/70">
          Find the moments that make a city feel alive. Discover, book, and show up.
        </Text>

        <View className="mt-7 flex-row items-center gap-2 rounded-full bg-white p-2 pl-4">
          <Search size={18} color="#8b8b87" />
          <TextInput
            value={query}
            onChangeText={onChangeQuery}
            onSubmitEditing={onSubmit}
            returnKeyType="search"
            placeholder="Search events, artists, or venues"
            placeholderTextColor="#8b8b87"
            accessibilityLabel="Search events"
            className="min-w-0 flex-1 py-1 text-sm text-[#111111]"
          />
          <Pressable
            onPress={onSubmit}
            accessibilityRole="button"
            className="rounded-full bg-[#ff775d] px-5 py-2.5 active:opacity-80">
            <Text className="text-sm font-semibold text-white">Search</Text>
          </Pressable>
        </View>

        <View className="mt-6 flex-row items-center gap-1.5 self-start rounded-full bg-white/15 px-4 py-2">
          <Text className="text-xs text-white">Featured this week</Text>
          <ArrowRight size={12} color="#ffffff" />
        </View>
      </View>
    </View>
  );
}
