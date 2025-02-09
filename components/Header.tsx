import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font"; // 追加
import AppLoading from "expo-app-loading"; // 追加（expo-app-loadingをインストール）

const Header = () => {
  const [focus, setFocus] = useState<boolean>(false); // フォーカス状態
  const router = useRouter();

  // フォントをロード
  const [fontsLoaded] = useFonts({
    "ZenMaruGothic-Medium": require("../assets/fonts/ZenMaruGothic-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }





  return (
    <View style={styles.zstack}>
      <View style={styles.headertop}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Master Garden</Text>
      </View>
      <View style={styles.con}>
        <TouchableOpacity
          onPress={() => {
            router.push({ pathname: "../screens/search" });
          }}
        >
          <Image
            source={require("../assets/images/search.png")}
            style={styles.searchicon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headertop: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    top: -10,
    height: 30,
  },
  logo:{
    width: 40,
    height: 40,
    alignSelf: "center",
    top: 70,
  },
  title: {
    fontSize: 20,
    alignSelf: "center",
    top: 70,
    fontFamily: "ZenMaruGothic-Medium", // フォント適用
    color: "#fff",
  },
  zstack: {
    display: "flex",
    height: 180,
    backgroundColor: "#68A98A",
    justifyContent: "center",
    ...StyleSheet.absoluteFillObject,
    borderBottomWidth: 0,
    zIndex: 100,
  },

  con: {
    flex: 1,
    borderWidth: 2, // 枠線の太さ
    borderColor: "#103E28", // 枠線の色(緑)
    backgroundColor: "#FFFFFF",
    borderRadius: 45,
    marginVertical: 50,
    width: "70%",
    top: 40,
    justifyContent: "center",
    alignSelf: "center",
  },
  searchicon: {
    position: "relative",
    alignSelf: "center",
  },
});

export default Header;
