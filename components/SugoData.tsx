import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const DATA = [
  { id: "1", name: "Item 1", type: "A" },
  { id: "2", name: "Item 2", type: "B" },
  { id: "3", name: "Item 3", type: "A" },
  { id: "4", name: "Item 4", type: "C" },
];

// タイプA用コンポーネント
const TypeAList: React.FC<{
  data: Array<{ id: string; name: string; type: string }>;
}> = ({ data }) => (
  <FlatList
    data={data}
    keyExtractor={(item) => item.id}
    horizontal={true}
    contentContainerStyle={{ overflow: "scroll", flexDirection: "row" }}
    renderItem={({ item }) => (
      <View style={styles.item}>
        <Text style={styles.title}>Type A: {item.name}</Text>
      </View>
    )}
  />
);

// タイプB用コンポーネント
const TypeBList: React.FC<{
  data: Array<{ id: string; name: string; type: string }>;
}> = ({ data }) => (
  <FlatList
    data={data}
    keyExtractor={(item) => item.id}
    horizontal={true}
    contentContainerStyle={{ overflow: "scroll", flexDirection: "row" }}
    renderItem={({ item }) => (
      <View style={styles.item}>
        <Text style={styles.title}>Type B: {item.name}</Text>
      </View>
    )}
  />
);

const SugoData = () => {
  // データをタイプごとにフィルタリング
  const typeAData = DATA.filter((item) => item.type === "A");
  const typeBData = DATA.filter((item) => item.type === "B");

  return (
    <ThemedView
      style={{
        flex: 1,
        paddingTop: 50,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        
      }}
      className="contents"
    >
      <ThemedView style={styles.list}>
        <ThemedText style={styles.header}>Type A Table</ThemedText>
        <TypeAList data={typeAData} />

        <ThemedText style={styles.header}>Type B Table</ThemedText>
        <TypeBList data={typeBData} />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  list: {
    display: "flex",
    flexDirection: "row",
    width: "210%",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
});


export default SugoData;