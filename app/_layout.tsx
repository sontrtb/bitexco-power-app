
import ModalUpdate from '@/components/commons/ModalUpdate';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Toast from "react-native-toast-message";
import Routers from "./routers";

const queryClient = new QueryClient()

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "PublicSans-Thin": require("../assets/fonts/PublicSans-Thin.ttf"),
    "PublicSans-ExtraLight": require("../assets/fonts/PublicSans-ExtraLight.ttf"),
    "PublicSans-Light": require("../assets/fonts/PublicSans-Light.ttf"),
    "PublicSans-Regular": require("../assets/fonts/PublicSans-Regular.ttf"),
    "PublicSans-Medium": require("../assets/fonts/PublicSans-Medium.ttf"),
    "PublicSans-SemiBold": require("../assets/fonts/PublicSans-SemiBold.ttf"),
    "PublicSans-Bold": require("../assets/fonts/PublicSans-Bold.ttf"),
    "PublicSans-ExtraBold": require("../assets/fonts/PublicSans-ExtraBold.ttf"),
    "PublicSans-Black": require("../assets/fonts/PublicSans-Black.ttf"),
  });


  useEffect(() => {
    if (loaded) {
      SplashScreen.hide();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
          <KeyboardProvider>
            <Routers />
            <Toast
              position="top"
              visibilityTime={3000}
            />
            <ModalUpdate />
          </KeyboardProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  )
}
