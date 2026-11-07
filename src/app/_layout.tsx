import "../../global.css";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { SessionProvider, useSession } from "@/context/session";
import { useFonts } from "expo-font";
import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import { Stack } from "expo-router/stack";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "nativewind";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const [fontsLoaded, fontError] = useFonts([
    {
      fontFamily: "PlusJakartaSans",
      fontDefinitions: [
        {
          path: require("../../assets/fonts/PlusJakartaSans-Variable.ttf"),
          weight: "200 800",
        },
        {
          path: require("../../assets/fonts/PlusJakartaSans-VariableItalic.ttf"),
          weight: "200 800",
          style: "italic",
        },
      ],
    },
  ]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SessionProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        <RootNavigator />
      </ThemeProvider>
    </SessionProvider>
  );
}

function RootNavigator() {
  const { colorScheme } = useColorScheme();
  const { access } = useSession();
  const entered = access !== null;
  const signedIn = access === "signed-in";

  return (
    <Stack
      screenOptions={{
        statusBarStyle: colorScheme === "dark" ? "light" : "dark",
      }}
    >
      <Stack.Protected guard={entered} redirectTo="/auth">
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="notifications" options={{ headerShown: false }} />
        <Stack.Screen
          name="orders/[id]"
          options={{ headerShown: false, statusBarStyle: "light" }}
        />
        <Stack.Screen name="events/[slug]" options={{ headerShown: false }} />
        <Stack.Protected
          guard={signedIn}
          redirectTo={{ pathname: "/auth", params: { next: "/checkout" } }}
        >
          <Stack.Screen name="checkout" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected
          guard={signedIn}
          redirectTo={{ pathname: "/auth", params: { next: "/events/create" } }}
        >
          <Stack.Screen name="events/create" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack.Protected>
      <Stack.Screen name="auth" options={{ headerShown: false }} />
    </Stack>
  );
}
