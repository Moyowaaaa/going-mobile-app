import { Image } from "expo-image";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import {
  ArrowLeft,
  CalendarDays,
  ImagePlus,
  MapPin,
  Palette,
  Ticket,
  Upload,
  X,
} from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DisplayFont } from "@/constants/theme";

const accentOptions = ["#ff775d", "#f4b942", "#55b8a3", "#8f8cf5", "#e878b5"];
const defaultCover = require("../../../assets/images/event-create-banner.png");

const fieldClass =
  "rounded-xl border border-black/10 bg-[#f7f6f2] px-4 py-3 text-base font-normal text-[#111111] dark:border-white/10 dark:bg-[#0b1020] dark:text-[#f5f2ec]";

export default function CreateEventPage() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const iconColor = isDark ? "#f5f2ec" : "#111111";
  const muted = isDark ? "#a9a9a3" : "#777773";
  const { width } = useWindowDimensions();
  const sideBySide = width >= 960;

  const [coverUri, setCoverUri] = useState<string | null>(null);
  const [accent, setAccent] = useState(accentOptions[0]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  async function pickCover() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Photos needed", "Allow photo access to upload a banner.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.9,
    });

    if (!result.canceled) {
      setCoverUri(result.assets[0]?.uri ?? null);
    }
  }

  function publish() {
    Alert.alert(
      "Event ready",
      name.trim() ? `${name.trim()} is ready to publish.` : "Add a name, then publish.",
    );
  }

  const form = (
    <View className="gap-6 rounded-3xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#151b2e]">
      <View className="gap-2">
        <Text className="text-sm font-semibold text-[#111111] dark:text-[#f5f2ec]">
          Cover image
        </Text>
        <Pressable
          onPress={pickCover}
          accessibilityRole="button"
          accessibilityLabel="Upload a banner image"
          className="relative min-h-56 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-black/15 dark:border-white/15"
        >
          <Image
            source={coverUri ? { uri: coverUri } : defaultCover}
            contentFit="cover"
            style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
          />
          <View className="absolute inset-0 bg-black/35" />
          <View className="items-center gap-2 px-6">
            <View className="rounded-full bg-white/20 p-3">
              <ImagePlus size={22} color="#ffffff" />
            </View>
            <Text className="text-sm font-semibold text-white">Upload a banner image</Text>
            <Text className="text-center text-xs text-white/75">
              JPG, PNG or WEBP · 1600 × 900 recommended
            </Text>
          </View>
        </Pressable>
        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-[#777773] dark:text-[#a9a9a3]">
            Make the first impression count.
          </Text>
          {coverUri ? (
            <Pressable
              onPress={() => setCoverUri(null)}
              accessibilityRole="button"
              className="flex-row items-center gap-1 active:opacity-60"
            >
              <X size={14} color={muted} />
              <Text className="text-xs text-[#777773] dark:text-[#a9a9a3]">Reset image</Text>
            </Pressable>
          ) : null}
        </View>
      </View>

      <View className="gap-2">
        <Text className="text-sm font-semibold text-[#111111] dark:text-[#f5f2ec]">
          Event name
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Give your event a name"
          placeholderTextColor={muted}
          className={fieldClass}
        />
      </View>

      <View className="gap-2">
        <Text className="text-sm font-semibold text-[#111111] dark:text-[#f5f2ec]">
          Description
        </Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="What should people know?"
          placeholderTextColor={muted}
          multiline
          textAlignVertical="top"
          className={`${fieldClass} min-h-32`}
        />
      </View>

      <View className="gap-5 sm:flex-row">
        <View className="flex-1 gap-2">
          <Text className="text-sm font-semibold text-[#111111] dark:text-[#f5f2ec]">Date</Text>
          <View className="justify-center">
            <View className="absolute left-4 top-3.5 z-10">
              <CalendarDays size={18} color={muted} />
            </View>
            <TextInput
              value={date}
              onChangeText={setDate}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={muted}
              className={`${fieldClass} pl-11`}
            />
          </View>
        </View>
        <View className="flex-1 gap-2">
          <Text className="text-sm font-semibold text-[#111111] dark:text-[#f5f2ec]">
            Location
          </Text>
          <View className="justify-center">
            <View className="absolute left-4 top-3.5 z-10">
              <MapPin size={18} color={muted} />
            </View>
            <TextInput
              value={location}
              onChangeText={setLocation}
              placeholder="Venue or address"
              placeholderTextColor={muted}
              className={`${fieldClass} pl-11`}
            />
          </View>
        </View>
      </View>

      <View className="gap-5 sm:flex-row">
        <View className="flex-1 gap-2">
          <Text className="text-sm font-semibold text-[#111111] dark:text-[#f5f2ec]">
            Ticket price
          </Text>
          <TextInput
            value={price}
            onChangeText={setPrice}
            placeholder="0.00"
            placeholderTextColor={muted}
            keyboardType="decimal-pad"
            className={fieldClass}
          />
        </View>
        <View className="flex-1 gap-2">
          <Text className="text-sm font-semibold text-[#111111] dark:text-[#f5f2ec]">
            Tickets available
          </Text>
          <TextInput
            value={quantity}
            onChangeText={setQuantity}
            placeholder="100"
            placeholderTextColor={muted}
            keyboardType="number-pad"
            className={fieldClass}
          />
        </View>
      </View>

      <Pressable
        onPress={publish}
        accessibilityRole="button"
        style={{ backgroundColor: accent }}
        className="mt-2 flex-row items-center justify-center gap-2 self-start rounded-full px-6 py-3 active:opacity-90"
      >
        <Text className="text-sm font-semibold text-white">Publish event</Text>
        <Upload size={16} color="#ffffff" />
      </Pressable>
    </View>
  );

  const preview = (
    <View className="h-fit gap-5 rounded-3xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-[#151b2e]">
      <View className="flex-row items-center gap-2">
        <Palette size={16} color={iconColor} />
        <Text className="text-sm font-semibold text-[#111111] dark:text-[#f5f2ec]">
          Event accent
        </Text>
      </View>
      <View className="flex-row gap-2">
        {accentOptions.map((color) => {
          const selected = accent === color;
          return (
            <Pressable
              key={color}
              onPress={() => setAccent(color)}
              accessibilityRole="button"
              accessibilityLabel={`Use ${color} accent`}
              style={{
                backgroundColor: color,
                transform: [{ scale: selected ? 1.1 : 1 }],
              }}
              className="h-10 w-10 rounded-full border-4 border-[#f7f6f2] dark:border-[#0b1020]"
            />
          );
        })}
      </View>
      <Text className="text-xs leading-5 text-[#777773] dark:text-[#a9a9a3]">
        Choose a color that carries through your event button, tags, and guest-facing
        details.
      </Text>
      <View className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
        <Image
          source={coverUri ? { uri: coverUri } : defaultCover}
          contentFit="cover"
          style={{ width: "100%", aspectRatio: 16 / 9 }}
        />
        <View className="p-4">
          <Text
            style={{ color: accent }}
            className="text-xs font-bold uppercase tracking-[2px]"
          >
            Your category
          </Text>
          <Text
            style={{ fontFamily: DisplayFont }}
            className="mt-2 text-xl font-bold text-[#111111] dark:text-[#f5f2ec]"
          >
            {name.trim() || "Your event title"}
          </Text>
          <Text className="mt-2 text-sm text-[#777773] dark:text-[#a9a9a3]">
            {description.trim() || "The live preview updates as you customize your listing."}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#f7f6f2] dark:bg-[#0b1020]">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between px-5 py-4">
          <Pressable
            onPress={() => router.back()}
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
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            className="flex-row items-center gap-2 active:opacity-60"
          >
            <ArrowLeft size={16} color={muted} />
            <Text className="text-sm font-medium text-[#777773] dark:text-[#a9a9a3]">
              Back to explore
            </Text>
          </Pressable>
        </View>

        <View className="px-5 pb-16 pt-8">
          <View className="mb-10 max-w-2xl">
            <Text className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#ff775d]">
              Make it happen
            </Text>
            <Text
              style={{ fontFamily: DisplayFont }}
              className="mt-3 text-5xl font-bold tracking-[-2px] text-[#111111] dark:text-[#f5f2ec]"
            >
              Create an event.
            </Text>
            <Text className="mt-4 text-lg text-[#777773] dark:text-[#a9a9a3]">
              Build a beautiful listing with the details your crowd needs.
            </Text>
          </View>

          <View className={sideBySide ? "flex-row items-start gap-8" : "gap-8"}>
            <View className={sideBySide ? "flex-1" : ""}>{form}</View>
            <View className={sideBySide ? "w-[360px]" : ""}>{preview}</View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
