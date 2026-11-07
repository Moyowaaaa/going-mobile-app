import { RelativePathString, useRouter } from "expo-router";
import {
  CalendarDays,
  MapPin,
  QrCode,
  Ticket,
  User,
} from "lucide-react-native";
import {
  FlatList,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import CustomSafeAreaView from "@/components/shared/CustomSafeAreaView";
import { orders } from "@/constants/data";
import { getEventPalette } from "@/constants/event-colors";
import { BottomTabInset, DisplayFont } from "@/constants/theme";
import { useColorScheme } from "nativewind";

const listContentStyle = {
  paddingBottom: BottomTabInset + 32,
  paddingHorizontal: 20,
};

function OrderSeparator() {
  return <View className="h-6" />;
}

function OrderArt({ color }: { color: string }) {
  const palette = getEventPalette(color);

  return (
    <View
      style={{ backgroundColor: palette.background }}
      className="h-20 w-20 overflow-hidden rounded-2xl"
    >
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
    </View>
  );
}

export default function TicketsScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const wide = width >= 640;

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const mutedColor = isDark ? "#a9a9a3" : "#777773";

  return (
    <CustomSafeAreaView>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        className="flex-1 bg-[#f7f6f2] dark:bg-[#0b1020]"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={listContentStyle}
        ItemSeparatorComponent={OrderSeparator}
        ListHeaderComponent={
          <View>
            <View className="flex-row items-center justify-between py-4">
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
                accessibilityRole="button"
                accessibilityLabel="Profile"
                onPress={() => router.push("/profile")}
                className="h-10 w-10 items-center justify-center rounded-full active:bg-black/5 dark:active:bg-white/10"
              >
                <User size={16} color={isDark ? "#f5f2ec" : "#111111"} />
              </Pressable>
            </View>

            <View className="pb-6 pt-4">
              <Text className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#ff775d]">
                Your plans
              </Text>
              <Text
                style={{ fontFamily: DisplayFont }}
                className="mt-2 text-5xl font-bold tracking-[-2px] text-[#111111] dark:text-[#f5f2ec]"
              >
                My tickets
              </Text>
              <Text className="mt-3 max-w-lg text-[#777773] dark:text-[#a9a9a3]">
                Everything you&apos;ve booked, all in one place. Your QR code is
                ready when you are.
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => {
          const upcoming = item.status === "Upcoming";

          return (
            <View
              style={{
                borderCurve: "continuous",
                boxShadow: "0 12px 35px rgba(0, 0, 0, 0.04)",
              }}
              className="overflow-hidden rounded-3xl border border-black/10 bg-white dark:border-white/10 dark:bg-[#151b2e]"
            >
              <View
                className={
                  wide
                    ? "flex-row items-center justify-between gap-6 p-8"
                    : "gap-6 p-6"
                }
              >
                <View className="min-w-0 flex-1 flex-row items-start gap-4">
                  <OrderArt color={item.event.color} />
                  <View className="min-w-0 flex-1">
                    <View className="mb-2 flex-row items-center gap-2">
                      <View
                        className={`rounded-full px-2.5 py-1 ${
                          upcoming ? "bg-[#e9f4e8]" : "bg-[#f0efed]"
                        }`}
                      >
                        <Text
                          className={`text-[10px] font-bold uppercase tracking-[1.2px] ${
                            upcoming ? "text-[#3d6e43]" : "text-[#777773]"
                          }`}
                        >
                          {item.status}
                        </Text>
                      </View>
                      <Text className="text-xs text-[#999991] dark:text-[#a9a9a3]">
                        Order {item.id}
                      </Text>
                    </View>
                    <Text
                      numberOfLines={1}
                      style={{ fontFamily: DisplayFont }}
                      className="text-2xl font-bold tracking-[-0.8px] text-[#111111] dark:text-[#f5f2ec]"
                    >
                      {item.title}
                    </Text>
                    <View className="mt-2 gap-1">
                      <View className="flex-row items-center gap-2">
                        <CalendarDays size={16} color={mutedColor} />
                        <Text className="text-sm text-[#777773] dark:text-[#a9a9a3]">
                          {item.date}
                        </Text>
                      </View>
                      <View className="flex-row items-center gap-2">
                        <MapPin size={16} color={mutedColor} />
                        <Text className="flex-1 text-sm text-[#777773] dark:text-[#a9a9a3]">
                          {item.location}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View className="flex-row items-center justify-between gap-3">
                  <View className={wide ? "items-end" : ""}>
                    <Text className="text-xs text-[#999991] dark:text-[#a9a9a3]">
                      {item.ticketCount} tickets
                    </Text>
                    <Text className="text-lg font-bold text-[#111111] dark:text-[#f5f2ec]">
                      ${item.price.toFixed(2)}
                    </Text>
                  </View>
                  {upcoming ? (
                    <Pressable
                      accessibilityRole="button"
                      className="flex-row items-center gap-2 rounded-full bg-[#111111] px-4 py-2.5 active:bg-[#343434] dark:bg-[#f5f2ec]"
                      onPress={() =>
                        router.push({
                          pathname: "/orders/[id]" as RelativePathString,
                          params: { id: item.id },
                        })
                      }
                    >
                      <QrCode
                        size={16}
                        color={isDark ? "#111111" : "#ffffff"}
                      />
                      <Text className="text-sm font-semibold text-white dark:text-[#111111]">
                        View ticket
                      </Text>
                    </Pressable>
                  ) : null}
                </View>
              </View>

              <View className="border-t border-black/5 bg-[#fafaf8] px-6 py-3 dark:border-white/10 dark:bg-[#10162a]">
                <Text className="text-xs text-[#999991] dark:text-[#a9a9a3]">
                  Purchased securely with going. · Confirmation sent to your
                  account email
                </Text>
              </View>
            </View>
          );
        }}
      />
    </CustomSafeAreaView>
  );
}
