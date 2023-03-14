import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

// React Navigation
import RootStack from './app/navigators/RootStack';
import {Provider} from "react-redux";
import configureStore from "./app/redux/store/store";
import {registerRootComponent} from "expo";
import store from "./app/redux/store/store";

/*let appState =
{
    playerName : 'test',
    roomCode: 'test',
    playerColor: { red : 200, green : 200, blue : 200 },
    is_result : false
};*/

export default function App() {
let [fontsLoaded] = useFonts({
  "Karla-Bold": require("./assets/fonts/Karla-Bold.ttf"),
  "Karla-Regular": require("./assets/fonts/Karla-Regular.ttf"),
  "Karla-ExtraBold": require("./assets/fonts/Karla-ExtraBold.ttf"),
  "Karla-BoldItalic": require("./assets/fonts/Karla-BoldItalic.ttf"),
  "Karla-Italic": require("./assets/fonts/Karla-Italic.ttf"),
});

if (!fontsLoaded){
  console.log("Fonts is not loaded");
  return <AppLoading/>;
}

  return (
      <>
          <Provider store={store}>
              <StatusBar style="auto" />
              <RootStack />
          </Provider>
      </>
  );
};

registerRootComponent(App);
