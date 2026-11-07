import { ArrowRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { popularEvents } from "@/constants/data";
import { DisplayFont } from "@/constants/theme";
import { RelativePathString, useRouter } from "expo-router";

export function PopularBillboard() {
  const router = useRouter();
  return (
    <View className="overflow-hidden rounded-[28px] bg-[#f8c77e] px-6 py-8">
      <View className="mb-4 flex-row items-center gap-2">
        <View className="h-[7px] w-[7px] rounded-full bg-[#8b3f2c]" />
        <Text className="text-[11px] font-extrabold uppercase tracking-[2.4px] text-[#8b3f2c]">
          The city is talking
        </Text>
      </View>

      <Text
        style={{ fontFamily: DisplayFont }}
        className="text-[40px] font-bold leading-[38px] tracking-[-2.4px] text-[#111111]"
      >
        Popular right{"\n"}
        <Text className="text-[#8b3f2c]">now.</Text>
      </Text>

      <Text className="mt-4 max-w-sm text-sm leading-5 text-[#111111]/65">
        The events your city is saving, sharing, and showing up for this week.
      </Text>

      <View className="mt-6 gap-2">
        {popularEvents.map((event) => (
          <Pressable
            key={event.title}
            accessibilityRole="button"
            onPress={() =>
              router.push({
                pathname: "/events/[slug]" as RelativePathString,
                params: {
                  slug: event.title
                    .toLowerCase()
                    .replaceAll(" ", "-")
                    .replaceAll(":", ""),
                },
              })
            }
            className="flex-row items-center gap-4 rounded-2xl border border-[#8b3f2c]/10 bg-white/55 p-3 active:bg-white"
          >
            <Text
              style={{ fontFamily: DisplayFont }}
              className="w-8 text-2xl font-bold tracking-[-1.2px] text-[#8b3f2c]/55"
            >
              {String(event.rank ?? 0).padStart(2, "0")}
            </Text>

            <View
              style={{ backgroundColor: event.color }}
              className="h-[54px] w-[54px] shrink-0 rounded-[14px]"
            />

            <View className="min-w-0 flex-1">
              <Text
                numberOfLines={1}
                className="text-lg font-bold tracking-[-0.6px] text-[#111111]"
              >
                {event.title}
              </Text>
              <Text
                numberOfLines={1}
                className="mt-1 text-xs text-[#111111]/55"
              >
                {event.meta}
              </Text>
            </View>

            <ArrowRight size={18} color="#111111" />
          </Pressable>
        ))}
      </View>
    </View>
  );
}
