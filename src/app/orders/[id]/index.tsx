import { orders } from "@/constants/data";
import { DisplayFont } from "@/constants/theme";
import type { order } from "@/constants/types";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeftCircle,
  CalendarDays,
  CheckCircle2,
  Download,
  MapPin,
  QrCode,
  Ticket,
} from "lucide-react-native";
import { useMemo } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

const TicketNotFound = () => (
  <View className="flex-1 items-center justify-center gap-3 px-6">
    <Text className="text-lg font-semibold">Ticket not found</Text>
    <Text className="text-center text-neutral-500">
      This order doesn't exist or may have expired.
    </Text>
  </View>
);

const TicketPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const wide = width >= 640;

  const order = useMemo<order | undefined>(
    () => orders.find((item) => item.id === id),
    [id],
  );

  if (!order) return <TicketNotFound />;

  const upcoming = order.status === "Upcoming";

  return (
    <>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />
      <ScrollView
        contentContainerStyle={{ backgroundColor: order.event.color || "black" }}
        showsVerticalScrollIndicator={false}
        contentContainerClassName={`flex-grow px-5 pt-16 pb-10  `}
      >
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
              className="text-2xl font-bold tracking-[-1.4px] text-[#f5f2ec]"
            >
              going.
            </Text>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Profile"
            onPress={() => router.push("/tickets")}
            className=" flex flex-row items-center justify-center rounded-full text-white active:bg-black/5 dark:active:bg-white/10"
          >
            <ArrowLeftCircle color={"white"} />
            <Text className="text-white"> My tickets </Text>
          </Pressable>
        </View>

        <View className="flex flex-col gap-4 pt-4">
          <View className="mb-8 flex flex-col items-start">
            <View className="mb-4 flex w-full flex-row items-center gap-2 text-white">
              <CheckCircle2 color={"white"} />
              <Text className="text-sm font-bold uppercase text-white">
                {upcoming ? "Ticket confirmed" : "Past booking"}
              </Text>
            </View>
            <Text className="font-display h-max text-5xl font-bold  text-white">
              {order?.title}
            </Text>
            {/* <Text className="mt-5 text-white/65">Order {id} · 2 tickets</Text> */}
          </View>

          <Text className="text-xl font-bold text-white">
            {order.id} · {order.ticketCount} ticket
            {order.ticketCount === 1 ? "" : "s"}
          </Text>
        </View>

        <View className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-2xl">
          <View className="gap-8 p-7">
            <View className={wide ? "flex-row gap-5" : "gap-5"}>
              <View className="flex-1">
                <Text className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#777773]">
                  Date & time
                </Text>
                <View className="mt-2 flex-row items-center gap-2">
                  <CalendarDays size={16} color="#ff775d" />
                  <Text className="flex-1 font-semibold text-[#111111]">
                    {order.date}
                  </Text>
                </View>
              </View>
              <View className="flex-1">
                <Text className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#777773]">
                  Location
                </Text>
                <View className="mt-2 flex-row items-center gap-2">
                  <MapPin size={16} color="#ff775d" />
                  <Text className="flex-1 font-semibold text-[#111111]">
                    {order.location}
                  </Text>
                </View>
              </View>
            </View>

            {upcoming ? (
              <View className="items-center rounded-2xl bg-[#f7f7f5] p-7">
                <View className="mb-4 h-48 w-48 items-center justify-center border-[10px] border-[#111111] bg-white">
                  <QrCode size={144} color="#111111" strokeWidth={1.4} />
                </View>
                <Text className="font-semibold text-[#111111]">
                  Show this code at the door
                </Text>
                <Text className="mt-1 text-center text-xs text-[#777773]">
                  Each ticket admits one person
                </Text>
              </View>
            ) : (
              <View className="gap-4 rounded-2xl bg-[#f7f7f5] p-7">
                <Text className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#777773]">
                  Booking summary
                </Text>
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-[#777773]">Tickets</Text>
                  <Text className="font-semibold text-[#111111]">
                    {order.ticketCount}
                  </Text>
                </View>
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-[#777773]">Total paid</Text>
                  <Text className="font-semibold text-[#111111]">
                    ${order.price.toFixed(2)}
                  </Text>
                </View>
                <Text className="text-sm leading-5 text-[#777773]">
                  This event has already happened, so the entry code is no
                  longer shown.
                </Text>
              </View>
            )}
          </View>

          <View
            className={`gap-3 border-t border-dashed border-black/15 bg-[#fafaf8] p-7 ${wide ? "flex-row items-center justify-between" : ""}`}
          >
            {upcoming ? (
              <Pressable
                accessibilityRole="button"
                onPress={() =>
                  Alert.alert(
                    "Tickets saved",
                    "Your tickets are available in My tickets.",
                  )
                }
                className="flex-row items-center justify-center gap-2 rounded-full border border-black/15 px-5 py-3 active:bg-black/5"
              >
                <Download size={16} color="#111111" />
                <Text className="text-sm font-semibold text-[#111111]">
                  Download tickets
                </Text>
              </Pressable>
            ) : null}
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/")}
              className="items-center justify-center rounded-full bg-[#111111] px-5 py-3 active:bg-[#343434]"
            >
              <Text className="text-sm font-semibold text-white">
                Find another event
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default TicketPage;
