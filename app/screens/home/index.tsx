import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from 'expo-router';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CarePeriod, carePeriods } from '@/app/api/carePeriods';
import apiClient from '@/app/api';

const Home = () => {
  const { height, width } = Dimensions.get('window');
  const vw = width / 100;
  const vh = height / 100;
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('ALL');
  const [flowers, setFlowers] = useState<CarePeriod[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFlowers = async () => {
    try {
      const response = await carePeriods();
      setFlowers(response); // APIのデータをflowersにセット
      console.log('Fetched data:', response);
      setLoading(false); // ローディングを終了
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // エラーが発生してもローディングを終了
    }
  };

  // useEffectでコンポーネントの初回レンダリング時にAPIを呼び出す
  useEffect(() => {
    fetchFlowers();
  }, [selectedTab]);

  const tabs = ['ALL', '開花時期', '植え付け時期', '植え替え時期', '肥料時期', '剪定時期'];

  // タブごとにデータをフィルタリングする関数
  const filterFlowersByTab = (tab: string) => {
    if (tab === 'ALL') return flowers;
    if (tab === '開花時期') return flowers.filter(flower => flower.period_type === 'blooming_period');
    if (tab === '植え付け時期') return flowers.filter(flower => flower.period_type === 'planting_period');
    if (tab === '植え替え時期') return flowers.filter(flower => flower.period_type === 'repotting_period');
    if (tab === '肥料時期') return flowers.filter(flower => flower.period_type === 'fertilizing_period');
    if (tab === '剪定時期') return flowers.filter(flower => flower.period_type === 'pruning_period');
    return [];
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={[styles.header, { height: 15 * vh, marginHorizontal: 10 * vw }]}>
        <View style={[styles.topHeader]}>
          <View style={[styles.leftTopHeader, { width: 6 * vw }]} />
          <View style={[styles.titleArea, { marginLeft: 8 * vw }]}>
            <Text style={styles.line1}>MY</Text>
            <Text style={styles.line2}>Garden</Text>
          </View>
        </View>
        <View style={[styles.bottomHeader]}>
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

      {/* Tabs */}
      <View style={{ height: 8 * vh, marginBottom: 2 * vh }}>
        <ScrollView
          horizontal={true}  // 横スクロールを有効化
          showsHorizontalScrollIndicator={false} // スクロールバーを非表示
          contentContainerStyle={[styles.containerTab]}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.activeTab, {
                height: 4 * vh,
                paddingVertical: 1 * vh,
                paddingHorizontal: 2 * vw,
              }]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Flower Sections */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 10 * vw,
          paddingBottom: 10 * vh,
        }}
      >
        {(selectedTab === 'ALL' ? tabs : [selectedTab]).map((tab) => (
          <View key={tab} style={[styles.section, { marginVertical: 2 * vh }]}>
            <Text style={styles.sectionTitle}>{tab}</Text>
            <ScrollView
              horizontal={true}
              style={[styles.horizontalScroll, { paddingVertical: 2 * vh }]}
              showsHorizontalScrollIndicator={false}
            >
              {filterFlowersByTab(tab).map((flower) => (
                <View key={flower.id} style={[styles.flowerItem, { width: 20 * vw, marginRight: 8 * vw }]}>
                  <Image
                    source={{ uri: flower.image_url}}
                    style={styles.flowerImage}
                  />
                  <Text style={styles.flowerName}>{flower.plant_name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFBF3',
  },
  header: {
    justifyContent: 'center',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '50%',
  },
  titleArea: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '50%',
  },
  leftTopHeader: {
    backgroundColor: '#68A98A',
    height: '100%',
  },
  line1: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  line2: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchArea: {
    flex: 1,
    height: '60%',
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchText: {
    marginLeft: 10,
    fontSize: 16,
  },
  containerTab: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', // 垂直方向に揃える
  },
  tab: {
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#000',
  },
  tabText: {
    color: '#757575',
    fontSize: 14,
    textAlign: 'center', // テキストを中央揃え
  },
  activeTabText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  section: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  horizontalScroll: {
    paddingVertical: 10,
  },
  flowerItem: {
    alignItems: 'center',
  },
  flowerImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  flowerName: {
    marginTop: 5,
    fontSize: 14,
  },
});

export default Home;
