import { Alert, Platform } from "react-native";

/**
 * `Alert.alert` is a no-op in react-native-web, so web falls back to the
 * browser dialogs. Native keeps the platform alert.
 */
export function showAlert(title: string, message?: string) {
  if (Platform.OS === "web") {
    window.alert(message ? `${title}\n\n${message}` : title);
    return;
  }

  Alert.alert(title, message);
}

type ConfirmOptions = {
  title: string;
  message?: string;
  confirmLabel: string;
  onConfirm: () => void;
};

export function confirmAction({ title, message, confirmLabel, onConfirm }: ConfirmOptions) {
  if (Platform.OS === "web") {
    if (window.confirm(message ? `${title}\n\n${message}` : title)) {
      onConfirm();
    }
    return;
  }

  Alert.alert(title, message, [
    { text: "Cancel", style: "cancel" },
    { text: confirmLabel, style: "destructive", onPress: onConfirm },
  ]);
}
