import { router } from "expo-router";
import {
  Bell,
  HelpCircle,
  LogOut,
  Moon,
  Pencil,
  Plus,
  QrCode,
  Shield,
  Sun,
  Ticket,
} from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MenuSection, type MenuItem } from "@/components/profile/menu-section";
import { BottomTabInset, DisplayFont } from "@/constants/theme";
import { confirmAction, showAlert } from "@/lib/alert";

const profile = {
  name: "Maya Johnson",
  initials: "MJ",
  email: "maya@going.app",
  memberSince: "2024",
  plan: "Going+ member",
};

const stats = [
  { key: "events", value: "12", label: "Events" },
  { key: "saved", value: "4", label: "Saved" },
  { key: "upcoming", value: "2", label: "Upcoming" },
];

const nextUp = {
  title: "The Midnight Market",
  meta: "Sat, Jun 14 · 7:00 PM · The Foundry, Brooklyn",
};

// Static sections live at module scope so their references never change.
const accountItems: MenuItem[] = [
  {
    kind: "link",
    key: "tickets",
    icon: Ticket,
    label: "My tickets",
    detail: "2 upcoming",
    onPress: () => router.push("/tickets"),
  },
  {
    kind: "link",
    key: "notifications",
    icon: Bell,
    label: "Notifications",
    onPress: () => router.push("/notifications"),
  },
];

const organizeItems: MenuItem[] = [
  {
    kind: "link",
    key: "create",
    icon: Plus,
    label: "Create an event",
    onPress: () => router.push("/events/create"),
  },
];

const supportItems: MenuItem[] = [
  {
    kind: "link",
    key: "help",
    icon: HelpCircle,
    label: "Help & support",
    onPress: () => showAlert("Help & support", "Reach us at help@going.app."),
  },
  {
    kind: "link",
    key: "privacy",
    icon: Shield,
    label: "Terms & privacy",
    onPress: () => showAlert("Terms & privacy", "Our terms are being finalised."),
  },
];

export default function ProfileScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const [pushEnabled, setPushEnabled] = useState(true);

  const preferenceItems: MenuItem[] = [
    {
      kind: "toggle",
      key: "dark",
      icon: isDark ? Sun : Moon,
      label: "Dark mode",
      value: isDark,
      onValueChange: (next) => setColorScheme(next ? "dark" : "light"),
    },
    {
      kind: "toggle",
      key: "push",
      icon: Bell,
      label: "Push notifications",
      value: pushEnabled,
      onValueChange: setPushEnabled,
    },
  ];

  function confirmSignOut() {
    confirmAction({
      title: "Sign out?",
      message: "You can sign back in any time.",
      confirmLabel: "Sign out",
      onConfirm: () => {},
    });
  }

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#f7f6f2] dark:bg-[#0b1020]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: BottomTabInset + 32 }}>
        <View className="gap-6 px-5 py-4">
          <View>
            <Text className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#ff775d]">
              Your account
            </Text>
            <Text
              style={{ fontFamily: DisplayFont }}
              className="mt-2 text-[32px] font-bold tracking-[-1.8px] text-[#111111] dark:text-[#f5f2ec]">
              Profile
            </Text>
          </View>

          {/* Identity */}
          <View style={styles.identity} className="overflow-hidden rounded-[28px] bg-[#162c67] p-6">
            <View
              style={{
                position: "absolute",
                top: -120,
                right: -60,
                width: 240,
                height: 240,
                borderRadius: 999,
                backgroundColor: "#304d9d",
                opacity: 0.6,
              }}
            />

            <View className="flex-row items-center gap-4">
              <View className="h-16 w-16 items-center justify-center rounded-full bg-[#ff775d]">
                <Text
                  style={{ fontFamily: DisplayFont }}
                  className="text-2xl font-bold tracking-[-0.8px] text-white">
                  {profile.initials}
                </Text>
              </View>

              <View className="min-w-0 flex-1">
                <Text numberOfLines={1} className="text-xl font-bold text-white">
                  {profile.name}
                </Text>
                <Text numberOfLines={1} className="mt-0.5 text-sm text-white/60">
                  {profile.email}
                </Text>
              </View>
            </View>

            <View className="mt-5 flex-row flex-wrap items-center gap-2">
              <View className="rounded-full bg-white/15 px-3 py-1.5">
                <Text className="text-xs text-white">Member since {profile.memberSince}</Text>
              </View>
              <View className="rounded-full bg-[#ff775d] px-3 py-1.5">
                <Text className="text-xs font-semibold text-white">{profile.plan}</Text>
              </View>
            </View>

            <Pressable
              onPress={() => showAlert("Edit profile", "Profile editing is coming soon.")}
              accessibilityRole="button"
              className="mt-5 flex-row items-center justify-center gap-2 rounded-full bg-white/15 py-3 active:opacity-70">
              <Pencil size={15} color="#ffffff" />
              <Text className="text-sm font-semibold text-white">Edit profile</Text>
            </Pressable>
          </View>

          {/* Stats */}
          <View className="flex-row gap-3">
            {stats.map((stat) => (
              <View
                key={stat.key}
                style={styles.stat}
                className="flex-1 rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-[#151b2e]">
                <Text
                  style={{ fontFamily: DisplayFont }}
                  className="text-2xl font-bold tracking-[-1px] text-[#111111] dark:text-[#f5f2ec]">
                  {stat.value}
                </Text>
                <Text className="mt-1 text-xs text-[#777773] dark:text-[#a9a9a3]">
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>

          {/* Next up */}
          <View style={styles.nextUp} className="rounded-[24px] bg-[#f8c77e] p-5">
            <Text className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#8b3f2c]">
              Next up
            </Text>
            <Text
              style={{ fontFamily: DisplayFont }}
              className="mt-2 text-2xl font-bold tracking-[-1px] text-[#111111]">
              {nextUp.title}
            </Text>
            <Text className="mt-1 text-sm text-[#111111]/65">{nextUp.meta}</Text>

            <Pressable
              onPress={() => router.push("/tickets")}
              accessibilityRole="button"
              className="mt-4 flex-row items-center gap-2 self-start rounded-full bg-[#111111] px-4 py-2.5 active:opacity-80">
              <QrCode size={15} color="#ffffff" />
              <Text className="text-sm font-semibold text-white">View ticket</Text>
            </Pressable>
          </View>

          <MenuSection title="Account" items={accountItems} />
          <MenuSection title="Organize" items={organizeItems} />
          <MenuSection title="Preferences" items={preferenceItems} />
          <MenuSection title="Support" items={supportItems} />

          <Pressable
            onPress={confirmSignOut}
            accessibilityRole="button"
            className="flex-row items-center justify-center gap-2 rounded-full border border-[#d64545]/30 py-3.5 active:opacity-70">
            <LogOut size={16} color="#d64545" />
            <Text className="text-sm font-semibold text-[#d64545]">Sign out</Text>
          </Pressable>

          <Text className="text-center text-xs text-[#999991]">going. · v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  identity: {
    borderCurve: "continuous",
    boxShadow: "0 18px 50px rgba(22, 44, 103, 0.16)",
  },
  stat: {
    borderCurve: "continuous",
  },
  nextUp: {
    borderCurve: "continuous",
    boxShadow: "0 18px 45px rgba(139, 63, 44, 0.12)",
  },
});
