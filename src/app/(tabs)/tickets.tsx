import { useRouter } from "expo-router";
import {
  CalendarDays,
  MapPin,
  QrCode,
  Ticket,
  User,
} from "lucide-react-native";
import {
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import CustomSafeAreaView from "@/components/shared/CustomSafeAreaView";
import { getEventPalette } from "@/constants/event-colors";
import { BottomTabInset, DisplayFont } from "@/constants/theme";
import { order } from "@/constants/types";

const orders: order[] = [
  {
    id: "GO-240614-01",
    title: "The Midnight Market",
    date: "Sat, Jun 14 · 7:00 PM",
    location: "The Foundry, Brooklyn",
    ticketCount: 2,
    price: 48,
    status: "Upcoming",
    color: "market",
  },
  {
    id: "GO-240528-09",
    title: "Spring Studio Sessions",
    date: "Wed, May 28 · 8:00 PM",
    location: "Public Records, Brooklyn",
    ticketCount: 1,
    price: 32,
    status: "Past",
    color: "music",
  },
];

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

  return (
    <CustomSafeAreaView>
      <ScrollView
        className="flex-1 "
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: BottomTabInset + 32 }}
      >
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

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Profile"
            onPress={() => router.push("/profile")}
            className="h-10 w-10 items-center justify-center rounded-full active:bg-black/5 dark:active:bg-white/10"
          >
            <User size={16} color="#111111" />
          </Pressable>
        </View>

        <View className="gap-6 px-5 py-4">
          <View>
            <Text className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#ff775d]">
              Your plans
            </Text>
            <Text
              style={{ fontFamily: DisplayFont }}
              className="mt-2 text-5xl font-bold tracking-[-2px] text-[#111111] dark:text-[#f5f2ec]"
            >
              My tickets
            </Text>
            <Text className="mt-3 max-w-lg text-[#777773]">
              Everything you&apos;ve booked, all in one place. Your QR code is
              ready when you are.
            </Text>
          </View>

          {orders.map((item) => {
            const upcoming = item.status === "Upcoming";

            return (
              <View
                key={item.id}
                style={{
                  borderCurve: "continuous",
                  boxShadow: "0 12px 35px rgba(0, 0, 0, 0.04)",
                }}
                className="overflow-hidden rounded-3xl border border-black/10 bg-white"
              >
                <View
                  className={
                    wide
                      ? "flex-row items-center justify-between gap-6 p-8"
                      : "gap-6 p-6"
                  }
                >
                  <View className="min-w-0 flex-1 flex-row items-start gap-4">
                    <OrderArt color={item.color} />
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
                        <Text className="text-xs text-[#999991]">
                          Order {item.id}
                        </Text>
                      </View>
                      <Text
                        numberOfLines={1}
                        style={{ fontFamily: DisplayFont }}
                        className="text-2xl font-bold tracking-[-0.8px] text-[#111111]"
                      >
                        {item.title}
                      </Text>
                      <View className="mt-2 gap-1">
                        <View className="flex-row items-center gap-2">
                          <CalendarDays size={16} color="#777773" />
                          <Text className="text-sm text-[#777773]">
                            {item.date}
                          </Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                          <MapPin size={16} color="#777773" />
                          <Text className="flex-1 text-sm text-[#777773]">
                            {item.location}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View className="flex-row items-center gap-3">
                    <View className={wide ? "items-end" : ""}>
                      <Text className="text-xs text-[#999991]">
                        {item.ticketCount} tickets
                      </Text>
                      <Text className="text-lg font-bold text-[#111111]">
                        ${item.price.toFixed(2)}
                      </Text>
                    </View>
                    {upcoming ? (
                      <Pressable
                        accessibilityRole="button"
                        className="flex-row items-center gap-2 rounded-full bg-[#111111] px-4 py-2.5 active:bg-[#343434]"
                      >
                        <QrCode size={16} color="#ffffff" />
                        <Text className="text-sm font-semibold text-white">
                          View ticket
                        </Text>
                      </Pressable>
                    ) : null}
                  </View>
                </View>

                <View className="border-t border-black/5 bg-[#fafaf8] px-6 py-3">
                  <Text className="text-xs text-[#999991]">
                    Purchased securely with going. · Confirmation sent to your
                    account email
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
}
