import { EventArt } from "@/components/home/event-art";
import CustomSafeAreaView from "@/components/shared/CustomSafeAreaView";
import { AvailableEvents } from "@/constants/data";
import { DisplayFont } from "@/constants/theme";
import type { EventItem } from "@/constants/types";
import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Heart,
  MapPin,
  Minus,
  Plus,
  Share2,
  Ticket,
} from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  Share,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

function ticketAmount(price: string) {
  const amount = Number(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(amount) ? amount : 0;
}

function eventSlug(title: string) {
  return title.toLowerCase().replaceAll(" ", "-").replaceAll(":", "");
}

export default function EventScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const iconColor = isDark ? "#f5f2ec" : "#111111";
  const muted = isDark ? "#a9a9a3" : "#777773";
  const { width } = useWindowDimensions();
  const wide = width >= 960;
  const [quantity, setQuantity] = useState(1);
  const [saved, setSaved] = useState(false);

  const event = useMemo<EventItem | undefined>(() => {
    const value = Array.isArray(slug) ? slug[0] : slug;
    return AvailableEvents.find((item) => eventSlug(item.title) === value);
  }, [slug]);

  if (!event) {
    return (
      <CustomSafeAreaView>
        <View className="flex-1 items-center justify-center gap-3 px-6">
          <Text className="text-lg font-semibold text-[#111111] dark:text-[#f5f2ec]">
            Event not found
          </Text>
          <Pressable
            onPress={() => router.replace("/")}
            accessibilityRole="button"
          >
            <Text className="text-sm font-semibold text-[#ff775d]">
              Back to explore
            </Text>
          </Pressable>
        </View>
      </CustomSafeAreaView>
    );
  }

  const category = event.type[0] || "Event";
  const unitPrice = ticketAmount(event.price);
  const total = quantity * unitPrice;
  const [headlineLead, headlineRest] = event.title.split(":");
  const place = event.location.split(",");
  const placeName = place[0]?.trim() ?? event.location;
  const placeDetail = place.slice(1).join(",").trim();

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  }

  const art = (
    <View>
      <EventArt
        color={event.color}
        label={category}
        height={wide ? 520 : 320}
      />
      <View className="mt-6 flex-row items-center justify-between gap-3">
        <Text className="flex-1 text-[11px] font-extrabold uppercase tracking-[2px] text-[#ff775d]"
        style={{color: event.color || "#ff775d"}}
        >
          {category} · {placeName}
        </Text>
        <View className="flex-row gap-2">
          <Pressable
            onPress={() => setSaved((current) => !current)}
            accessibilityRole="button"
            accessibilityLabel={saved ? "Remove saved event" : "Save event"}
            className="h-11 w-11 items-center justify-center rounded-full border border-black/10 active:bg-black/5 dark:border-white/10 dark:active:bg-white/10"
          >
            <Heart
              size={18}
              color={saved ? event.color || "#ff775d" : iconColor}
              fill={saved ? event.color || "#ff775d" : "transparent"}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              Share.share({
                message: `${event.title} · ${event.date} · ${event.location}`,
              }).catch(() => {});
            }}
            accessibilityRole="button"
            accessibilityLabel="Share event"
            className="h-11 w-11 items-center justify-center rounded-full border border-black/10 active:bg-black/5 dark:border-white/10 dark:active:bg-white/10"
          >
            <Share2 size={18} color={iconColor} />
          </Pressable>
        </View>
      </View>
    </View>
  );

  const details = (
    <View className={wide ? "flex-1 justify-center pl-8" : ""}>
      <Text
        style={{ fontFamily: DisplayFont }}
        className="text-5xl font-bold leading-[48px] tracking-[-2px] text-[#111111] dark:text-[#f5f2ec]"
      >
        {headlineRest ? `${headlineLead}:` : event.title}
        {headlineRest ? (
          <Text
            style={{ color: event.color || "black" }}
          >{`\n${headlineRest.trim()}.`}</Text>
        ) : null}
      </Text>
      <Text className="mt-6 max-w-md text-base leading-6 text-[#777773] dark:text-[#a9a9a3]">
        {category} at {event.location}. {event.date} · {event.time}.
      </Text>

      <View className="mt-8 gap-4 border-y border-black/10 py-6 dark:border-white/10">
        <View className="flex-row gap-3">
          <CalendarDays size={18} color={event.color || "#ff775d"} />
          <View className="flex-1">
            <Text className="text-sm font-bold text-[#111111] dark:text-[#f5f2ec]">
              {event.date}
            </Text>
            <Text className="text-sm text-[#777773] dark:text-[#a9a9a3]">
              {event.time}
            </Text>
          </View>
        </View>
        <View className="flex-row gap-3">
          <MapPin size={18} 
          color={event.color || "#ff775d"}
          />
          <View className="flex-1">
            <Text className="text-sm font-bold text-[#111111] dark:text-[#f5f2ec]">
              {placeName}
            </Text>
            {placeDetail ? (
              <Text className="text-sm text-[#777773] dark:text-[#a9a9a3]">
                {placeDetail}
              </Text>
            ) : null}
          </View>
        </View>
      </View>

      <View className="mt-7 rounded-3xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-[#151b2e]">
        <View className="flex-row items-center justify-between gap-3">
          <View className="flex-1">
            <Text className="font-semibold text-[#111111] dark:text-[#f5f2ec]">
              General admission
            </Text>
            <Text className="mt-1 text-sm text-[#777773] dark:text-[#a9a9a3]">
              ${unitPrice} per ticket
            </Text>
          </View>
          <View className="flex-row items-center gap-3 rounded-full border border-black/10 p-1 dark:border-white/10">
            <Pressable
              onPress={() => setQuantity((current) => Math.max(1, current - 1))}
              accessibilityRole="button"
              accessibilityLabel="Decrease quantity"
              className="h-8 w-8 items-center justify-center rounded-full active:bg-black/5 dark:active:bg-white/10"
            >
              <Minus size={16} color={iconColor} />
            </Pressable>
            <Text className="w-5 text-center text-sm font-semibold text-[#111111] dark:text-[#f5f2ec]">
              {quantity}
            </Text>
            <Pressable
              onPress={() => setQuantity((current) => current + 1)}
              accessibilityRole="button"
              accessibilityLabel="Increase quantity"
              className="h-8 w-8 items-center justify-center rounded-full active:bg-black/5 dark:active:bg-white/10"
            >
              <Plus size={16} color={iconColor} />
            </Pressable>
          </View>
        </View>
        <View className="mt-5 flex-row items-center justify-between border-t border-black/10 pt-4 dark:border-white/10">
          <Text className="text-sm text-[#777773] dark:text-[#a9a9a3]">
            Total
          </Text>
          <Text
            style={{ fontFamily: DisplayFont }}
            className="text-2xl font-bold text-[#111111] dark:text-[#f5f2ec]"
          >
            ${total}
          </Text>
        </View>
        <Pressable
          onPress={() => router.push("/checkout")}
          accessibilityRole="button"
          className="mt-4 flex-row items-center justify-center gap-2 rounded-full 
          py-4 "
          style={{backgroundColor:event.color || "#ff775d"}}
        >
          <Text className="text-sm font-semibold text-white"

          >
            Continue to checkout
          </Text>
          <Check size={16} color="#ffffff" />
        </Pressable>
      </View>
    </View>
  );

  return (
    <CustomSafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-5 pb-10 pt-2"
      >
        <View className="flex-row items-center justify-between py-3">
          <View className="flex-row items-center gap-2.5">
            <View
              style={{ transform: [{ rotate: "-7deg" }] }}
              className="h-[34px] w-[34px] items-center justify-center rounded-[12px] bg-[#ff775d]"
            >
              <View style={{ transform: [{ rotate: "7deg" }] }}>
                <Ticket size={19} color="#ffffff" />
              </View>
            </View>
            <Text
              style={{ fontFamily: DisplayFont }}
              className="text-2xl font-bold tracking-[-1.4px] text-[#111111] dark:text-[#f5f2ec]"
            >
              going.
            </Text>
          </View>
          <Pressable
            onPress={goBack}
            accessibilityRole="button"
            className="flex-row items-center gap-2 active:opacity-70"
          >
            <ArrowLeft size={16} color={muted} />
            <Text className="text-sm font-semibold text-[#777773] dark:text-[#a9a9a3]">
              Back to explore
            </Text>
          </Pressable>
        </View>

        <View className={wide ? "mt-4 flex-row gap-8" : "mt-4 gap-8"}>
          <View className={wide ? "flex-1" : ""}>{art}</View>
          {details}
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
}
