import { router } from "expo-router";
import {
  Bell,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Ticket,
} from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useState } from "react";

import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DisplayFont } from "@/constants/theme";

const initialNotifications = [
  {
    icon: Ticket,
    title: "Your ticket is ready",
    body: "Solange: Night Bloom is coming up on Friday, June 20.",
    time: "2h ago",
    unread: true,
  },
  {
    icon: CalendarDays,
    title: "Event reminder",
    body: "The Midnight Market starts tomorrow at 7:00 PM.",
    time: "Yesterday",
    unread: true,
  },
  {
    icon: Heart,
    title: "Something you saved is selling fast",
    body: "Modern Makers Fair has limited tickets left.",
    time: "2 days ago",
    unread: false,
  },
];

export default function NotificationScreen() {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#f5f2ec" : "#111111";
  const [items, setItems] = useState(initialNotifications);

  function markAllRead() {
    setItems((current) => current.map((item) => ({ ...item, unread: false })));
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f7f6f2] dark:bg-[#0b1020]">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between px-5 py-4">
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Back"
            className="h-10 w-10 items-center justify-center rounded-full active:bg-black/5 dark:active:bg-white/10"
          >
            <ChevronLeft size={22} color={iconColor} />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            className="h-10 w-10 items-center justify-center rounded-full active:bg-black/5 dark:active:bg-white/10"
          >
            <Bell size={20} color={iconColor} />
          </Pressable>
        </View>

        <View className="px-5 pb-20 pt-8">
          <View className="flex-row items-end justify-between gap-4">
            <View className="min-w-0 flex-1">
              <Text className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#ff775d]">
                Your inbox
              </Text>
              <Text
                style={{ fontFamily: DisplayFont }}
                className="mt-2 text-5xl font-bold tracking-[-2px] text-[#111111] dark:text-[#f5f2ec]"
              >
                Notifications.
              </Text>
            </View>
            <Pressable
              onPress={markAllRead}
              accessibilityRole="button"
              className="flex-row items-center gap-1 rounded-full px-2 py-2 active:opacity-60"
            >
              <Check size={16} color="#777773" />
              <Text className="text-sm font-medium text-[#777773]">Mark all read</Text>
            </Pressable>
          </View>

          <View className="mt-10 overflow-hidden rounded-3xl border border-black/10 bg-white dark:border-white/10 dark:bg-[#151b2e]">
            {items.map(({ icon: Icon, title, body, time, unread }, index) => (
              <Pressable
                key={title}
                onPress={() => router.push("/tickets")}
                accessibilityRole="button"
                className={`flex-row gap-4 p-5 active:bg-black/5 dark:active:bg-white/5 ${
                  index > 0 ? "border-t border-black/10 dark:border-white/10" : ""
                }`}
              >
                <View className="h-11 w-11 items-center justify-center rounded-2xl bg-[#ff775d]/10">
                  <Icon size={20} color="#ff775d" />
                </View>
                <View className="min-w-0 flex-1">
                  <View className="flex-row items-center gap-2">
                    <Text className="flex-1 font-semibold text-[#111111] dark:text-[#f5f2ec]">
                      {title}
                    </Text>
                    {unread ? (
                      <View
                        accessibilityLabel="Unread"
                        className="h-2 w-2 rounded-full bg-[#ff775d]"
                      />
                    ) : null}
                  </View>
                  <Text className="mt-1 text-sm leading-5 text-[#777773]">{body}</Text>
                  <Text className="mt-2 text-xs text-[#777773]">{time}</Text>
                </View>
                <ChevronRight size={18} color="#777773" />
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
