import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { autoLogin } from "../app/api/autoLogin";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Login screen mounted");
    handleAutoLogin();
  }, []);

  const handleAutoLogin = async () => {
    console.log("Auto login");
    const result = await autoLogin();
    if (result) {
      router.replace({ pathname: "../screens/tabScreen" });
    } else {
      console.log("Not logged in");
    }
  };

  const handleLogin = async () => {
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await credential.user.getIdToken();
      const refreshToken = credential.user.refreshToken;
      SecureStore.setItemAsync("idToken", idToken);
      SecureStore.setItemAsync("refreshToken", refreshToken);

      router.replace({ pathname: "../screens/tabScreen" });
    } catch (error) {
      setError("メールアドレスまたはパスワードが間違っています");
    }
  };

  const handleSignUp = () => {
    router.push({ pathname: "../screens/signUp" });
  };

  return (
    // <KeyboardAvoidingView
    // behavior="padding" // キーボードが表示された時に、画面を上にスクロールさせる
    //     style={{flex: 1}}
    //     accessible={false}
    // >
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={{ backgroundColor: "#000000" }}
    >
      <View style={styles.container}>
        <Image
          source={require("../assets/images/logo.png")}
          style={{
            width: 150,
            height: 150,
            alignSelf: "center",
            top: 150,
          }}
        />
        <Text
          style={{
            fontSize: 38,
            marginBottom: 16,
            textAlign: "center",
            fontWeight: "bold",
            color: "green",
            top: 180,
          }}
        >
          GardenMaster
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginBottom: 16,
            textAlign: "center",
            fontWeight: "bold",
            color: "green",
            top: 180,
          }}
        >
          あなたのガーデニングをより快適に
        </Text>
        <View>
          <Text
            style={{
              color: "red",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
              top: 200,
            }}
          >
            {error}
          </Text>
        </View>
        <View
          style={{
            top: 200,
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder="メールアドレス"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="パスワード"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          onPress={handleLogin}
          style={{ width: 200, alignSelf: "center", top: 250 }}
        >
          <View
            style={{
              backgroundColor: "green",
              padding: 10,
              margin: 10,
              borderRadius: 10,
              width: 200,
              height: 60,
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 20,
                marginTop: 10,
              }}
            >
              ログイン
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignUp}
          style={{ width: 200, alignSelf: "center", top: 250 }}
        >
          <View
            style={{
              padding: 10,
              margin: 10,
              borderRadius: 10,
              width: 200,
              height: 60,
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                color: "green",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              初めての方はこちら
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
    //  </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: 300,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default Login;
