import {
  ArrowRight,
  Bell,
  Moon,
  Plus,
  ShoppingBag,
  Sun,
  Ticket,
} from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { EventCard } from "@/components/home/event-card";
import { Hero } from "@/components/home/hero";
import { PopularBillboard } from "@/components/home/popular-billboard";
import { AvailableEvents, eventCategories } from "@/constants/data";
import { BottomTabInset, DisplayFont } from "@/constants/theme";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const iconColor = isDark ? "#f5f2ec" : "#111111";
  const router = useRouter();

  const { width } = useWindowDimensions();
  const columns = width >= 700 ? 2 : 1;

  const [activeCategory, setActiveCategory] = useState("For you");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartCount, setCartCount] = useState(0);

  const filteredEvents = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return AvailableEvents.filter((event) => {
      const category = event.type[0] ?? "";
      const matchesCategory =
        activeCategory === "For you" || category === activeCategory;
      const matchesQuery =
        needle.length === 0 ||
        `${event.title} ${event.location} ${category}`
          .toLowerCase()
          .includes(needle);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  function toggleFavorite(title: string) {
    setFavorites((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title],
    );
  }

  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 bg-[#f7f6f2] dark:bg-[#0b1020]"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: BottomTabInset + 32 }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-4">
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

          <View className="flex-row items-center gap-1">
            <Pressable
              onPress={() => router.push({ pathname: "/notifications" })}
              accessibilityRole="button"
              accessibilityLabel="Notifications"
              className="h-10 w-10 items-center justify-center rounded-full active:bg-black/5 dark:active:bg-white/10"
            >
              <Bell size={20} color={iconColor} />
            </Pressable>

            <Pressable
              onPress={() => router.push("/checkout")}
              accessibilityRole="button"
              accessibilityLabel={`Shopping cart, ${cartCount} items`}
              className="h-10 w-10 items-center justify-center rounded-full active:bg-black/5 dark:active:bg-white/10"
            >
              <ShoppingBag size={20} color={iconColor} />
              <View className="absolute right-1 top-1 h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#ff775d] px-1">
                <Text className="text-[9px] font-extrabold text-white">
                  {cartCount}
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={toggleColorScheme}
              accessibilityRole="button"
              accessibilityLabel={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
              className="h-10 w-10 items-center justify-center rounded-full active:bg-black/5 dark:active:bg-white/10"
            >
              {isDark ? (
                <Sun size={20} color={iconColor} />
              ) : (
                <Moon size={20} color={iconColor} />
              )}
            </Pressable>
          </View>
        </View>

        {/* Hero */}
        <View className="px-5 pb-8">
          <Hero query={query} onChangeQuery={setQuery} onSubmit={() => {}} />
        </View>

        {/* Popular */}
        <View className="px-5 pb-10">
          <PopularBillboard />
        </View>

        {/* Explore */}
        <View className="px-5 pb-12">
          <View className="mb-5">
            <Text className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#ff775d]">
              Curated for you
            </Text>
            <Text
              style={{ fontFamily: DisplayFont }}
              className="mt-2 text-[32px] font-bold tracking-[-1.8px] text-[#111111] dark:text-[#f5f2ec]"
            >
              What&apos;s happening
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingBottom: 4 }}
          >
            {eventCategories.map((category) => {
              const active = activeCategory === category;
              return (
                <Pressable
                  key={category}
                  onPress={() => setActiveCategory(category)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  className={`rounded-full border px-4 py-2 active:opacity-80 ${
                    active
                      ? "border-[#111111] bg-[#111111] dark:border-[#f5f2ec] dark:bg-[#f5f2ec]"
                      : "border-black/10 bg-white dark:border-white/15 dark:bg-[#151b2e]"
                  }`}
                >
                  <Text
                    className={`text-sm font-medium ${
                      active
                        ? "text-white dark:text-[#111111]"
                        : "text-[#777773] dark:text-[#a9a9a3]"
                    }`}
                  >
                    {category}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <View className="mt-6 flex-row flex-wrap gap-x-4 gap-y-8">
            {filteredEvents.map((event) => (
              <View
                key={event.title}
                style={{ width: columns === 2 ? "47%" : "100%" }}
                className="grow-0"
              >
                <EventCard
                  event={event}
                  favorite={favorites.includes(event.title)}
                  onToggleFavorite={() => toggleFavorite(event.title)}
        
                />
              </View>
            ))}
          </View>

          {filteredEvents.length === 0 ? (
            <View className="mt-6 rounded-3xl bg-white p-10 dark:bg-[#151b2e]">
              <Text className="text-center text-[#777773] dark:text-[#a9a9a3]">
                No events found. Try another search.
              </Text>
            </View>
          ) : null}
        </View>

        {/* Organize */}
        <View className="bg-[#f0ede8] px-5 py-10 dark:bg-[#111827]">
          <Text className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#ff775d]">
            For the ones who make it happen
          </Text>
          <Text
            style={{ fontFamily: DisplayFont }}
            className="mt-2 max-w-xl text-[30px] font-bold leading-[32px] tracking-[-1.6px] text-[#111111] dark:text-[#f5f2ec]"
          >
            Your event deserves a bigger room.
          </Text>
          <Pressable
            onPress={() => router.push("/events/create")}
            accessibilityRole="button"
            className="mt-6 flex-row items-center gap-2 self-start rounded-full bg-[#ff775d] px-6 py-3 active:opacity-80"
          >
            <Text className="text-sm font-semibold text-white">
              Create an event
            </Text>
            <Plus size={16} color="#ffffff" />
          </Pressable>
        </View>

        {/* Footer */}
        <View className="gap-3 px-5 py-8">
          <Text
            style={{ fontFamily: DisplayFont }}
            className="text-lg font-bold tracking-[-0.9px] text-[#111111] dark:text-[#f5f2ec]"
          >
            going.
          </Text>
          <Text className="text-sm text-[#777773] dark:text-[#a9a9a3]">
            Discover your next favorite thing.
          </Text>
          <View className="flex-row items-center gap-5">
            {["Help", "Terms", "Privacy"].map((link) => (
              <Pressable
                key={link}
                accessibilityRole="link"
                className="active:opacity-60"
              >
                <Text className="text-sm text-[#777773] dark:text-[#a9a9a3]">
                  {link}
                </Text>
              </Pressable>
            ))}
            <View className="flex-1" />
            <ArrowRight size={16} color="#777773" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
