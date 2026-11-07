import { useSession } from "@/context/session";
import { DisplayFont } from "@/constants/theme";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowRight, Mail, Moon, Sun, Ticket } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Mode = "signin" | "signup";

function continuePath(next: string | string[] | undefined) {
  const value = Array.isArray(next) ? next[0] : next;
  if (value === "/checkout" || value === "/events/create") return value;
  return "/";
}

function BrandMark() {
  return (
    <View className="flex-row items-center gap-3">
      <View
        style={{ transform: [{ rotate: "-7deg" }] }}
        className="h-10 w-10 items-center justify-center rounded-[14px] bg-[#ff775d]"
      >
        <View style={{ transform: [{ rotate: "7deg" }] }}>
          <Ticket size={20} color="#ffffff" />
        </View>
      </View>
      <Text
        style={{ fontFamily: DisplayFont }}
        className="text-2xl font-bold tracking-[-1.4px] text-[#111111] dark:text-[#f5f2ec]"
      >
        going.
      </Text>
    </View>
  );
}

function BrandPanel() {
  return (
    <View className="flex-1 justify-between bg-[#162c67] p-12">
      <View className="flex-row items-center gap-3">
        <View
          style={{ transform: [{ rotate: "-7deg" }] }}
          className="h-10 w-10 items-center justify-center rounded-[14px] bg-[#ff775d]"
        >
          <View style={{ transform: [{ rotate: "7deg" }] }}>
            <Ticket size={20} color="#ffffff" />
          </View>
        </View>
        <Text
          style={{ fontFamily: DisplayFont }}
          className="text-2xl font-bold tracking-[-1.4px] text-white"
        >
          going.
        </Text>
      </View>
      <View>
        <Text className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#fdbb9a]">
          A little more living
        </Text>
        <Text
          style={{ fontFamily: DisplayFont }}
          className="mt-4 max-w-lg text-6xl font-bold leading-[58px] tracking-[-2px] text-white"
        >
          Your next{"\n"}
          <Text className="text-[#ff9e7d]">favorite thing.</Text>
        </Text>
        <Text className="mt-6 max-w-sm text-base leading-6 text-white/65">
          Keep your tickets close, follow your favorite spaces, and never miss a
          good night out.
        </Text>
      </View>
      <Text className="text-sm text-white/50">© 2026 going.</Text>
    </View>
  );
}

export default function AuthPage() {
  const { signIn, skip } = useSession();
  const { next } = useLocalSearchParams<{ next?: string }>();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const iconColor = isDark ? "#f5f2ec" : "#111111";
  const muted = isDark ? "#a9a9a3" : "#777773";
  const { width } = useWindowDimensions();
  const wide = width >= 960;
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const prompted = continuePath(next) !== "/";

  function submit() {
    if (mode === "signup" && name.trim().length === 0) {
      Alert.alert("Add your name", "We use it on your tickets and profile.");
      return;
    }
    if (!email.includes("@") || password.length === 0) {
      Alert.alert("Check your details", "Enter an email and a password to continue.");
      return;
    }
    signIn();
    router.replace(continuePath(next));
  }

  function browse() {
    skip();
    router.replace("/");
  }

  const form = (
    <View className="w-full max-w-md">
      <View className="mb-8 flex-row items-start justify-between">
        {wide ? null : <BrandMark />}
        <Pressable
          onPress={toggleColorScheme}
          accessibilityRole="button"
          accessibilityLabel={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="ml-auto h-10 w-10 items-center justify-center rounded-full active:bg-black/5 dark:active:bg-white/10"
        >
          {isDark ? <Sun size={20} color={iconColor} /> : <Moon size={20} color={iconColor} />}
        </Pressable>
      </View>

      <Text className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#ff775d]">
        Welcome back
      </Text>
      <Text
        style={{ fontFamily: DisplayFont }}
        className="mt-3 text-4xl font-bold tracking-[-1.6px] text-[#111111] dark:text-[#f5f2ec]"
      >
        {mode === "signin" ? "Good to see you." : "Join the going."}
      </Text>
      <Text className="mt-3 text-base leading-6 text-[#777773] dark:text-[#a9a9a3]">
        {prompted
          ? "Sign in to purchase tickets or create an event."
          : mode === "signin"
            ? "Sign in to find your tickets and saved events."
            : "Create an account to start making plans."}
      </Text>

      <View className="mb-6 mt-8 flex-row rounded-full bg-black/5 p-1 dark:bg-white/10">
        {(
          [
            ["signin", "Sign in"],
            ["signup", "Create account"],
          ] as const
        ).map(([value, label]) => {
          const selected = mode === value;
          return (
            <Pressable
              key={value}
              onPress={() => setMode(value)}
              accessibilityRole="button"
              className={`flex-1 items-center rounded-full px-4 py-2 ${selected ? "bg-white dark:bg-[#151b2e]" : ""}`}
            >
              <Text
                className={`text-sm font-semibold ${selected ? "text-[#111111] dark:text-[#f5f2ec]" : "text-[#777773] dark:text-[#a9a9a3]"}`}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View className="gap-4">
        {mode === "signup" ? (
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor={muted}
            accessibilityLabel="Your name"
            autoCapitalize="words"
            className="h-12 rounded-xl border border-black/10 bg-white px-4 text-sm text-[#111111] dark:border-white/10 dark:bg-[#151b2e] dark:text-[#f5f2ec]"
          />
        ) : null}
        <View className="h-12 flex-row items-center gap-3 rounded-xl border border-black/10 bg-white px-4 dark:border-white/10 dark:bg-[#151b2e]">
          <Mail size={18} color={muted} />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email address"
            placeholderTextColor={muted}
            accessibilityLabel="Email address"
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            className="h-12 flex-1 text-sm text-[#111111] dark:text-[#f5f2ec]"
          />
        </View>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor={muted}
          accessibilityLabel="Password"
          secureTextEntry
          autoCapitalize="none"
          className="h-12 rounded-xl border border-black/10 bg-white px-4 text-sm text-[#111111] dark:border-white/10 dark:bg-[#151b2e] dark:text-[#f5f2ec]"
        />
        <Pressable
          onPress={submit}
          accessibilityRole="button"
          className="h-12 flex-row items-center justify-center gap-2 rounded-full bg-[#111111] active:bg-[#343434] dark:bg-[#f5f2ec] dark:active:opacity-90"
        >
          <Text className="text-sm font-semibold text-white dark:text-[#111111]">
            {mode === "signin" ? "Sign in" : "Create account"}
          </Text>
          <ArrowRight size={16} color={isDark ? "#111111" : "#ffffff"} />
        </Pressable>
      </View>

      <Pressable
        onPress={browse}
        accessibilityRole="button"
        className="mt-5 items-center py-2 active:opacity-70"
      >
        <Text className="text-sm font-semibold text-[#ff775d]">Skip for now</Text>
      </Pressable>
      <Text className="mt-2 text-center text-xs leading-5 text-[#777773] dark:text-[#a9a9a3]">
        Skip to browse Explore and get tickets. Sign in to purchase or create an
        event. By continuing, you agree to our Terms and Privacy Policy.
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      edges={wide ? [] : ["top", "bottom"]}
      className="flex-1 bg-[#f7f6f2] dark:bg-[#0b1020]"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className={wide ? "flex-1 flex-row" : "flex-1"}>
          {wide ? <BrandPanel /> : null}
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              paddingHorizontal: 24,
              paddingVertical: 32,
            }}
            className="flex-1"
          >
            {form}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
