import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const router = useRouter();
  const { height, width } = Dimensions.get('window');
  const vw = width / 100;
  const vh = height / 100;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={[styles.header, {
          height: 15 * vh,
          marginLeft: 10 * vw,
          marginRight: 10 * vw,
        }]}>
          <View style={[styles.topHeader]}>
            <View style={[styles.leftTopHeader, { width: 6 * vw }]} />
            <View style={[styles.titleArea, { marginLeft: 8 * vw }]}>
              <Text style={styles.line1}>MY</Text>
              <Text style={styles.line2}>Garden</Text>
            </View>
          </View>
          <View style={[styles.bottomHeader]}>
            {/* TouchableOpacityはボタンをカスタマイズできてButtonより軽量 */}
            <TouchableOpacity
              style={styles.searchArea}
              onPress={() => {
                navigation.navigate("Search" as never);
              }}
            >
              <Icon name="search" size={16} color="#000" style={{ marginLeft: 2 * vw }} />
              <Text style={styles.searchText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFBF3',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleArea: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
  header: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '50%',
  },
  bottomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '50%',
  },
  leftTopHeader: {
    backgroundColor: '#68A98A',
    height: '100%',
  },
  line1: {
    height: '50%',
    fontSize: 24,
    fontWeight: 'bold',
  },
  line2: {
    height: '50%',
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchArea: {
    height: '50%',
    width: '100%',
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default Home;
