import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Animated } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import Header from "@/components/Header";
// import * as Font from "expo-font";import AppLoading from 'expo-app-loading';


// const loadFonts = async () => {
//   await Font.loadAsync({
//     "ZenMaruGothic-Medium": require("./assets/fonts/ZenMaruGothic-Medium.ttf"),
//   });
// };

const Home = () => {
  // const [fontsLoaded, setFontsLoaded] = useState(false);
  // useEffect(() => {
  //   loadFonts().then(() => setFontsLoaded(true));
  // }, []);
  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  const router = useRouter();
  // const [query, setQuery] = useState<string>(''); // 検索バーの入力値

  return (
    <>
      <Header />

      <View style={styles.container}>
        <Text style={styles.title}>ホーム画面</Text>
        <Button
          title="Click Me"
          onPress={() => {
            router.push({ pathname: "../screens/search" });
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFBF3",
  },
  title: {
    fontSize: 24,
  },
});

export default Home;
