import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Animated,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import Header from "@/components/Header";

const Home = () => {


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
    
  },
  title: {
    fontSize: 24,
  },
});

export default Home;
