import { router } from "expo-router";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  LockKeyhole,
  Minus,
  Plus,
  Ticket,
  Trash2,
} from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getEventPalette } from "@/constants/event-colors";
import { DisplayFont } from "@/constants/theme";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const SERVICE_FEE_RATE = 0.1;

type CartLine = {
  id: string;
  title: string;
  category: string;
  date: string;
  unitPrice: number;
  quantity: number;
  color: string;
};

const initialLine: CartLine = {
  id: "midnight-market",
  title: "The Midnight Market",
  category: "Food & drink",
  date: "Sat, Jun 14 · 7:00 PM",
  unitPrice: 24,
  quantity: 2,
  color: "#d7a36c",
};

function CartArt({ color }: { color: string }) {
  const palette = getEventPalette(color);

  return (
    <View
      style={{ backgroundColor: palette.background }}
      className="h-24 w-24 overflow-hidden rounded-2xl"
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

export default function CheckoutPage() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const muted = isDark ? "#a9a9a3" : "#777773";
  const { width } = useWindowDimensions();
  const sideBySide = width >= 960;

  const [line, setLine] = useState<CartLine | null>(initialLine);

  const quantity = line?.quantity ?? 0;
  const subtotal = (line?.unitPrice ?? 0) * quantity;
  const fee = subtotal * SERVICE_FEE_RATE;
  const total = subtotal + fee;

  function changeQuantity(next: number) {
    setLine((current) => (current ? { ...current, quantity: next } : current));
  }

  function continueToPayment() {
    if (!line) return;
    Alert.alert("Payment", `${currency.format(total)} is ready to check out.`);
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f7f6f2] dark:bg-[#0b1020]">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between px-5 py-4">
          <Pressable
            onPress={() => router.push("/")}
            accessibilityRole="button"
            className="flex-row items-center gap-2.5 active:opacity-70"
          >
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
          </Pressable>
          <View className="flex-row items-center gap-2">
            <LockKeyhole size={16} color={muted} />
            <Text className="text-sm text-[#777773] dark:text-[#a9a9a3]">Secure checkout</Text>
          </View>
        </View>

        <View className="px-5 pb-16 pt-6">
          <Pressable
            onPress={() => router.push("/")}
            accessibilityRole="button"
            className="mb-8 flex-row items-center gap-2 self-start active:opacity-60"
          >
            <ArrowLeft size={16} color={muted} />
            <Text className="text-sm font-medium text-[#777773] dark:text-[#a9a9a3]">
              Continue exploring
            </Text>
          </Pressable>

          <View className={sideBySide ? "flex-row items-start gap-8" : "gap-8"}>
            <View className={sideBySide ? "flex-1" : ""}>
              <Text className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#ff775d]">
                Almost there
              </Text>
              <Text
                style={{ fontFamily: DisplayFont }}
                className="mt-2 text-5xl font-bold tracking-[-2px] text-[#111111] dark:text-[#f5f2ec]"
              >
                Your cart
              </Text>

              {line ? (
                <View className="mt-8 overflow-hidden rounded-3xl border border-black/10 bg-white dark:border-white/10 dark:bg-[#151b2e]">
                  <View className="flex-row gap-5 p-6">
                    <CartArt color={line.color} />
                    <View className="min-w-0 flex-1">
                      <Text className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#ff775d]">
                        {line.category}
                      </Text>
                      <Text
                        style={{ fontFamily: DisplayFont }}
                        className="mt-1 text-2xl font-bold tracking-[-0.8px] text-[#111111] dark:text-[#f5f2ec]"
                      >
                        {line.title}
                      </Text>
                      <View className="mt-2 flex-row items-center gap-2">
                        <CalendarDays size={16} color={muted} />
                        <Text className="text-sm text-[#777773] dark:text-[#a9a9a3]">
                          {line.date}
                        </Text>
                      </View>
                      <View className="mt-5 flex-row items-center justify-between gap-4">
                        <View className="flex-row items-center gap-3 rounded-full border border-black/10 p-1 dark:border-white/10">
                          <Pressable
                            onPress={() => changeQuantity(Math.max(1, line.quantity - 1))}
                            accessibilityRole="button"
                            accessibilityLabel="Decrease quantity"
                            className="h-7 w-7 items-center justify-center rounded-full active:bg-black/5 dark:active:bg-white/10"
                          >
                            <Minus size={14} color={isDark ? "#f5f2ec" : "#111111"} />
                          </Pressable>
                          <Text className="w-4 text-center text-sm font-bold text-[#111111] dark:text-[#f5f2ec]">
                            {line.quantity}
                          </Text>
                          <Pressable
                            onPress={() => changeQuantity(line.quantity + 1)}
                            accessibilityRole="button"
                            accessibilityLabel="Increase quantity"
                            className="h-7 w-7 items-center justify-center rounded-full active:bg-black/5 dark:active:bg-white/10"
                          >
                            <Plus size={14} color={isDark ? "#f5f2ec" : "#111111"} />
                          </Pressable>
                        </View>
                        <Text className="font-bold text-[#111111] dark:text-[#f5f2ec]">
                          {currency.format(subtotal)}
                        </Text>
                      </View>
                    </View>
                    <Pressable
                      onPress={() => setLine(null)}
                      accessibilityRole="button"
                      accessibilityLabel="Remove item"
                      className="h-9 w-9 items-center justify-center rounded-full active:bg-black/5 dark:active:bg-white/10"
                    >
                      <Trash2 size={16} color="#999991" />
                    </Pressable>
                  </View>
                  <View className="border-t border-black/5 px-6 py-4 dark:border-white/10">
                    <Text className="text-xs text-[#999991] dark:text-[#a9a9a3]">
                      General admission · Tickets are mobile-only
                    </Text>
                  </View>
                </View>
              ) : (
                <View className="mt-8 rounded-3xl border border-black/10 bg-white p-8 dark:border-white/10 dark:bg-[#151b2e]">
                  <Text className="text-base text-[#777773] dark:text-[#a9a9a3]">
                    Your cart is empty.
                  </Text>
                </View>
              )}
            </View>

            <View
              className={`rounded-3xl bg-[#162c67] p-7 ${sideBySide ? "w-[340px]" : ""}`}
            >
              <Text
                style={{ fontFamily: DisplayFont }}
                className="text-2xl font-bold tracking-[-0.8px] text-white"
              >
                Order summary
              </Text>
              <View className="mt-7 gap-4">
                <View className="flex-row justify-between">
                  <Text className="text-sm text-white/65">Tickets ({quantity})</Text>
                  <Text className="text-sm text-white/65">{currency.format(subtotal)}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-white/65">Service fee</Text>
                  <Text className="text-sm text-white/65">{currency.format(fee)}</Text>
                </View>
                <View className="border-t border-white/15 pt-4">
                  <View className="flex-row justify-between">
                    <Text className="text-lg font-bold text-white">Total</Text>
                    <Text className="text-lg font-bold text-white">{currency.format(total)}</Text>
                  </View>
                </View>
              </View>
              <Pressable
                onPress={continueToPayment}
                disabled={!line}
                accessibilityRole="button"
                className="mt-8 flex-row items-center justify-center gap-2 rounded-full bg-[#ff775d] py-4 active:bg-[#ed654e] disabled:opacity-40"
              >
                <Text className="text-base font-bold text-white">Continue to payment</Text>
                <Check size={16} color="#ffffff" />
              </Pressable>
              <Text className="mt-4 text-center text-xs leading-5 text-white/50">
                By continuing, you agree to going&apos;s terms and ticketing policy.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
