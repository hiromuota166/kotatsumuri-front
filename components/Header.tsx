import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Animated,
  TouchableOpacity,
  Keyboard,
  Image,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import SearchBar from "@/components/SearchBar";

const Header = () => {
  const [query, setQuery] = useState<string>(""); // 検索バーの入力値

  const [focus, setFocus] = useState<boolean>(false); // フォーカス状態

  const router = useRouter();
  // const [query, setQuery] = useState<string>(''); // 検索バーの入力値
  const barWidth = useRef(new Animated.Value(240)).current; // 初期幅
  const handleFocus = () => {
    setFocus(true);
    Animated.timing(barWidth, {
      toValue: 300, // 拡大幅
      duration: 300,
      useNativeDriver: false, // width の変更は useNativeDriver をサポートしない
    }).start();
  };
  const handleBlur = () => {
    setFocus(false);
    Animated.timing(barWidth, {
      toValue: 240, // 元の幅
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const db = SQLite.openDatabaseAsync("searchSql.db");

  const saveSearchHistory = (query: string) => {
    db.then((database) => {
      database.runAsync(
        `INSERT INTO History (query)
        SELECT ?
         WHERE NOT EXISTS (
         SELECT 1 FROM History WHERE query = ?
      );
         `,
        [query, query]
      );
    });
  };
  return (
    <>
      <View style={styles.zstack}>
        <View style={styles.con}>
          <TouchableOpacity
            onPress={() => {
              router.push({ pathname: "../screens/search" });
            }}
          >
            <Image
              source={require("@/assets/images/search.png")}
              style={{ alignSelf: "center" }}
            ></Image>
          </TouchableOpacity>
        </View>
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
  zstack: {
    display: "flex",
    height: 180,
    backgroundColor: "#68A98A",
    justifyContent: "center",
    ...StyleSheet.absoluteFillObject,
    borderBottomWidth: 1,
  },
  searchContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingLeft: 30,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    position: "absolute",
    left: -90,
    top: -10,
  },
  con: {
    flex: 1,
    borderWidth: 2, // 枠線の太さ
    borderColor: "#103E28", // 枠線の色(緑)
    backgroundColor: "#FFFFFF",
    borderRadius: 45,
    marginVertical: 60,
    width: "70%",
    top: 40,
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default Header;
