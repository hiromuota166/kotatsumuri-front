import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';

const Home = () => {

    const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ホーム画面</Text>
      <Button
        title="Click Me"
        onPress={() => {
            router.push({ pathname: '../screens/search' });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
});

export default Home;