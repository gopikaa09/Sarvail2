import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorage as WebStorage } from "@react-native-async-storage/async-storage-web";

// Set up AsyncStorage for the web
if (Platform.OS === "web") {
  AsyncStorage = WebStorage;
}

// Your app rendering logic here
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);
