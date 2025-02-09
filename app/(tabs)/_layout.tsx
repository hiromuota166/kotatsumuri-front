import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Platform, Image, TouchableOpacity, View } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarActiveBackgroundColor: "#D1D7CF",
        tabBarInactiveBackgroundColor: "#D1D7CF",
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            bottom: -30,
            height: 150,
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "ホーム",
          tabBarLabelStyle: { top: 30, left: 10 },
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/images/homebutton.png")}
              style={{ width: 40, height: 40, top: 20, left: 10 }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="hoe"
        options={{
          title: "",
          href: "../screens/search",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/images/searchbutton.png")}
              style={{ width: 100, height: 100 }}
            />
          ),
        }}
      ></Tabs.Screen>

      <Tabs.Screen
        name="test"
        options={{
          title: "マイページ",
          tabBarLabelStyle: { top: 30, right: 10 },
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/images/usericon.png")}
              style={{ width: 40, height: 40, top: 20, right: 10 }}
            />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
