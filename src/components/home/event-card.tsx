import { ArrowRight, CalendarDays, Heart, MapPin } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { Pressable, Text, View } from "react-native";

import { EventArt } from "@/components/home/event-art";
import type { EventItem } from "@/constants/types";

type EventCardProps = {
  event: EventItem;
  favorite: boolean;
  onToggleFavorite: () => void;
  onGetTickets: () => void;
};

export function EventCard({ event, favorite, onToggleFavorite, onGetTickets }: EventCardProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const category = event.type[0] ?? "Event";
  const price = event.price === "$0" ? "Free" : `From ${event.price}`;

  return (
    <View>
      <View className="relative">
        <EventArt color={event.color} label={category} />

        <Pressable
          onPress={onToggleFavorite}
          accessibilityRole="button"
          accessibilityLabel={`${favorite ? "Remove" : "Add"} ${event.title} ${
            favorite ? "from" : "to"
          } favorites`}
          className="absolute bottom-3.5 right-3.5 h-[38px] w-[38px] items-center justify-center rounded-full border border-white/35 bg-black/30 active:opacity-70">
          <Heart
            size={17}
            color={favorite ? "#ff775d" : "#ffffff"}
            fill={favorite ? "#ff775d" : "transparent"}
          />
        </Pressable>

        {event.featured ? (
          <View className="absolute bottom-3.5 left-3.5 rounded-full bg-[#ff775d] px-2.5 py-1.5">
            <Text className="text-[10px] font-extrabold uppercase tracking-[0.8px] text-white">
              Featured
            </Text>
          </View>
        ) : null}
      </View>

      <View className="pt-4">
        <View className="mb-2 flex-row items-center justify-between gap-2">
          <Text className="text-[11px] font-extrabold uppercase tracking-[1.3px] text-[#ff775d]">
            {category}
          </Text>
          <Text className="text-sm font-semibold text-[#111111] dark:text-[#f5f2ec]">{price}</Text>
        </View>

        <Text
          numberOfLines={2}
          className="text-xl font-bold tracking-[-0.8px] text-[#111111] dark:text-[#f5f2ec]">
          {event.title}
        </Text>

        <View className="mt-3 gap-1.5">
          <View className="flex-row items-center gap-2">
            <CalendarDays size={15} color="#777773" />
            <Text className="text-sm text-[#777773] dark:text-[#a9a9a3]">
              {event.date} · {event.time}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <MapPin size={15} color="#777773" />
            <Text className="text-sm text-[#777773] dark:text-[#a9a9a3]">{event.location}</Text>
          </View>
        </View>

        <Pressable
          onPress={onGetTickets}
          accessibilityRole="button"
          className="mt-4 flex-row items-center justify-center gap-2 rounded-full bg-[#111111] py-3 active:opacity-80 dark:bg-[#f5f2ec]">
          <Text className="text-sm font-semibold text-white dark:text-[#111111]">Get tickets</Text>
          <ArrowRight size={16} color={isDark ? "#111111" : "#ffffff"} />
        </Pressable>
      </View>
    </View>
  );
}
