import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Text,
  Alert,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Header from "@/components/Header";
import { router } from "expo-router";

export default function TestScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState("dddddddddd");

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("画像ライブラリへのアクセスが許可されていません！");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const createTwoButtonAlert = () =>
    Alert.alert("適用されました", "", [
      {
        text: "キャンセル",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const createlogoutAlert = () =>
    Alert.alert("本当にログアウトしますか", "", [
      {
        text: "キャンセル",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "ログアウト",
        style: "default",
        onPress: () => router.push({ pathname: "../screens/signUp" }),
      },
    ]);

  const createsignoutAlert = () =>
    Alert.alert("本当にアカウントを削除しますか", "", [
      {
        text: "キャンセル",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "削除",
        style: "destructive",
        onPress: () => router.push({ pathname: "../screens/signUp" }),
      },
    ]);

  return (
    <>
      <Header />
      {/* <ScrollView> */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ height: "130%" }}
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">アカウント設定</ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedView style={styles.mypageimage}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.image} />
            ) : (
              <View style={styles.imagePlaceholder} />
            )}
            <Pressable style={styles.buttonStyle} onPress={pickImage}>
              <Text style={styles.buttonText}>画像を選択</Text>
            </Pressable>
          </ThemedView>
          <ThemedView style={styles.mypagedata}>
            <ThemedText type="subtitle">名前</ThemedText>
            {isEditingName ? (
              <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                onBlur={() => setIsEditingName(false)}
              />
            ) : (
              <Pressable onPress={() => setIsEditingName(true)}>
                <ThemedText type="p">{name}</ThemedText>
              </Pressable>
            )}
          </ThemedView>
          <ThemedView style={styles.mypagedata}>
            <ThemedText type="subtitle">メールアドレス</ThemedText>
            <ThemedText type="p">dddddddddd</ThemedText>
          </ThemedView>
          <ThemedView style={styles.mypagedata}>
            <ThemedText type="subtitle">パスワード</ThemedText>
            <ThemedText type="p">dddddddddd</ThemedText>
          </ThemedView>
          <View style={styles.button}>
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {
                router.push({ pathname: "../(tabs)" });
              }}
            >
              <Text style={styles.buttonText}>キャンセル</Text>
            </Pressable>
            <Pressable
              style={styles.buttonStyle}
              onPress={createTwoButtonAlert}
            >
              <Text
                style={{
                  backgroundColor: "#68A98A",
                  width: 150,
                  height: 40,
                  color: "#FFFFFF",
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 50,
                }}
              >
                適用
              </Text>
            </Pressable>
          </View>
          <Pressable onPress={createlogoutAlert}>
            <Text
              style={{
                color: "#000",
                borderTopWidth: 1,
                borderTopEndRadius: 100,
                borderTopStartRadius: 100,
                paddingTop: 30,
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ログアウト
            </Text>
          </Pressable>
          <Pressable onPress={createsignoutAlert}>
            <Text
              style={{
                margin: 20,
                color: "red",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              アカウント削除
            </Text>
          </Pressable>
        </ThemedView>
      </ScrollView>
      {/* </ScrollView> */}
    </>
  );
}

const styles = StyleSheet.create({
  // scrollContainer: {
  //   minHeight: "100%",
  //   backgroundColor: "#FFFBF3",
  //   paddingVertical: 20, // 上下に余白を追加
  // },
  container: {
    top: 200,
    display: "flex",
    // alignItems: "center",
    width: "100%",
    maxHeight: "190%",
    backgroundColor: "#FFFBF3",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
    height: 100,
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#FFFBF3",
  },
  stepContainer: {
    gap: 8,
    display: "flex",
    marginBottom: 8,
    paddingTop: 8,
    borderBlockColor: "#000",
    borderWidth: 0,
    borderRadius: 40,
    borderTopColor: "#000",
    width: "100%",
    shadowColor: "#1D3D47",
    shadowOffset: {
      width: 0,
      height: 0, // ここを修正
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mypageimage: {
    flexDirection: "row",
    width: "80%",
    top: 10,
    left: 30,
    height: 130,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: "center",
    right: 30,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: "center",
    right: 30,
    borderColor: "#000",
  },
  mypagedata: {
    fontSize: 16,
    position: "relative",
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    color: "#1D3D47",
    alignItems: "center",
  },
  DataContainer: {
    gap: 10,
    flexDirection: "column",
    width: "100%",
    height: "10%",
  },
  textInput: {
    fontSize: 16,
    color: "#1D3D47",
    borderBottomWidth: 1,
    borderBottomColor: "#1D3D47",
  },
  button: {
    justifyContent: "center",
    columnGap: 30,
    alignItems: "center",
    flexDirection: "row",
    height: 80,
    marginTop: 10,
    width: "100%",
  },
  buttonStyle: {
    backgroundColor: "#E7E7E7",
    width: 150,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
});
