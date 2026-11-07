import { Colors } from "@/constants/theme";
import { PropsWithChildren } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";

type Props = PropsWithChildren<SafeAreaViewProps>;

const CustomSafeAreaView = ({ children, style, ...rest }: Props) => {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "dark" ? "dark" : "light"];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }, style]}
      {...rest}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
        keyboardVerticalOffset={10}
      >
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CustomSafeAreaView;

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
}); 