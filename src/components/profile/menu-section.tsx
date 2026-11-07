import { ChevronRight } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { ComponentType, memo } from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";

type IconType = ComponentType<{ size?: number; color?: string }>;

export type MenuLinkItem = {
  kind: "link";
  key: string;
  icon: IconType;
  label: string;
  detail?: string;
  destructive?: boolean;
  onPress: () => void;
};

export type MenuToggleItem = {
  kind: "toggle";
  key: string;
  icon: IconType;
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export type MenuItem = MenuLinkItem | MenuToggleItem;

const MenuRow = memo(function MenuRow({
  icon: Icon,
  label,
  detail,
  destructive,
  onPress,
}: Omit<MenuLinkItem, "kind" | "key">) {
  const { colorScheme } = useColorScheme();
  const mutedColor = colorScheme === "dark" ? "#a9a9a3" : "#777773";
  const tint = destructive ? "#d64545" : "#ff775d";

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      className="flex-row items-center gap-3 px-4 py-3.5 active:bg-black/5 dark:active:bg-white/5">
      <View
        style={{ backgroundColor: destructive ? "rgba(214,69,69,0.1)" : "rgba(255,119,93,0.1)" }}
        className="h-9 w-9 items-center justify-center rounded-xl">
        <Icon size={17} color={tint} />
      </View>

      <Text
        className={`flex-1 text-base font-medium ${
          destructive ? "text-[#d64545]" : "text-[#111111] dark:text-[#f5f2ec]"
        }`}>
        {label}
      </Text>

      {detail ? (
        <Text className="text-sm text-[#777773] dark:text-[#a9a9a3]">{detail}</Text>
      ) : null}

      <ChevronRight size={16} color={mutedColor} />
    </Pressable>
  );
});

const ToggleRow = memo(function ToggleRow({
  icon: Icon,
  label,
  value,
  onValueChange,
}: Omit<MenuToggleItem, "kind" | "key">) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="flex-row items-center gap-3 px-4 py-2.5">
      <View className="h-9 w-9 items-center justify-center rounded-xl bg-[#ff775d]/10">
        <Icon size={17} color="#ff775d" />
      </View>

      <Text className="flex-1 text-base font-medium text-[#111111] dark:text-[#f5f2ec]">
        {label}
      </Text>

      <Switch
        value={value}
        onValueChange={onValueChange}
        accessibilityLabel={label}
        trackColor={{ false: isDark ? "#3a3f52" : "#d9d7d1", true: "#ff775d" }}
        thumbColor="#ffffff"
        ios_backgroundColor={isDark ? "#3a3f52" : "#d9d7d1"}
      />
    </View>
  );
});

type MenuSectionProps = {
  title: string;
  items: MenuItem[];
};

export function MenuSection({ title, items }: MenuSectionProps) {
  return (
    <View className="gap-2">
      <Text className="px-1 text-[11px] font-extrabold uppercase tracking-[2px] text-[#ff775d]">
        {title}
      </Text>

      <View
        style={styles.card}
        className="overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-[#151b2e]">
        {items.map((item, index) => (
          <View
            key={item.key}
            className={index > 0 ? "border-t border-black/5 dark:border-white/5" : ""}>
            {item.kind === "link" ? (
              <MenuRow
                icon={item.icon}
                label={item.label}
                detail={item.detail}
                destructive={item.destructive}
                onPress={item.onPress}
              />
            ) : (
              <ToggleRow
                icon={item.icon}
                label={item.label}
                value={item.value}
                onValueChange={item.onValueChange}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderCurve: "continuous",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.04)",
  },
});
