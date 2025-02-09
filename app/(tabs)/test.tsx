import React from "react";
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Text,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Header from "@/components/Header";
import { useImage } from "@/context/ImageContext";
import { router } from "expo-router";

export default function TestScreen() {
  const { selectedImage, setSelectedImage } = useImage();

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

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

  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">アカウント設定</ThemedText>
          </ThemedView>

          <ThemedView style={styles.stepContainer}>
            <ThemedView style={styles.mypageimage}>
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                    justifyContent: "center",
                    right: 30,
                  }}
                />
              )}
              <Pressable style={styles.buttonStyle} onPress={pickImage}>
                <Text style={styles.buttonText}>画像を選択</Text>
              </Pressable>
            </ThemedView>
            <ThemedView style={styles.mypagedata}>
              <ThemedText type="subtitle">名前</ThemedText>
              <ThemedText type="p">dddddddddd</ThemedText>
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
          </ThemedView>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#FFFBF3",
    justifyContent: "flex-end",
  },
  container: {
    display: "flex",
    position: "relative",
    top: -40,
    alignItems: "center",
    width: "100%",
    backgroundColor: "#FFFBF3",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
    top: 110,
    height: "40%",
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
      height: -4,
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