import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePathname, useRouter, useSearchParams } from 'expo-router/build/hooks';
import { plant } from '@/types/plant';




const Detail = () => {

  const [data, setData] = useState<plant | null>(null); // plant型の配列
  const [loading, setLoading] = useState<boolean>(false); // ローディング状態

  const rawQuery = useSearchParams().get('data');
  const query = rawQuery?.replace(/^"|"$/g, '') || ''; // ダブルクォーテーションを削除

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/plants?query=${encodeURIComponent(query)}`);
      const json = await response.json();
      const plantData = json["plant"];
      setData(plantData as plant);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoDate: string) => {
    if (!isoDate.includes('T')) return isoDate; // ISO形式でない場合はそのまま返す
    const date = new Date(isoDate);
    return `${date.getMonth() + 1}月${date.getDate()}日`; // 月と日を取得
  };

  useEffect(() => {
    // コンポーネントが表示されたときに実行される処理
    fetchSearchResults();
  }, []);

  if (loading){
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.plantDetail}>
          {/* <Text>Current Path: {JSON.stringify(data)}</Text> */}
          <Text style={styles.title}>{data?.name}</Text>
          <Text style={styles.features}>特徴</Text>

          <View style={styles.featureContainer}>
            <Text style={styles.feature}>説明</Text>
            <Text style={styles.subtitle}>{data?.description}</Text>
          </View>
          <View style={styles.featureContainer}>
            <Text style={styles.feature}>日当たり</Text>
            <Text style={styles.subtitle}>{data?.growth_conditions.light}</Text>
          </View>
          <View style={styles.featureContainer}>
            <Text style={styles.feature}>土壌</Text>
            <Text style={styles.subtitle}>{data?.growth_conditions.soil}</Text>
          </View>
          <View style={styles.featureContainer}>
            <Text style={styles.feature}>耐寒レベル</Text>
            <Text style={styles.subtitle}>{data?.growth_conditions.hardiness_zone}</Text>
          </View>

          <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ccc', paddingBottom: 8 }}>
            <Text style={{ flex: 1, fontWeight: 'bold' }}>時期</Text>
            <Text style={{ flex: 2, fontWeight: 'bold' }}>開始日</Text>
            <Text style={{ flex: 2, fontWeight: 'bold' }}>終了日</Text>
          </View>
          {data?.care_periods.map((period, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                borderBottomWidth: index === data?.care_periods.length - 1 ? 0 : 1,
                borderColor: '#eee',
                paddingVertical: 8,
              }}
            >
              <Text style={{ flex: 1 }}>
                {period.period_type === 'blooming_period'
                  ? '開花期'
                  : period.period_type === 'pruning_period'
                    ? '剪定期'
                    : period.period_type === 'planting_period'
                      ? '植付期'
                      : period.period_type === 'fertilizing_period'
                        ? '肥料期'
                        : period.period_type === 'repotting_period'
                          ? '植替期'
                          : 'No Data'}
              </Text>
              <Text style={{ flex: 2 }}>{formatDate(period.start_date)}</Text>
              <Text style={{ flex: 2 }}>{formatDate(period.end_date)}</Text>
            </View>
          ))}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFBF3',
  },
  plantDetail: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 21,
  },
  // 上部の特徴の文字
  features: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 'bold',
  },

  // 特徴の項目
  feature: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#000000',
    marginRight: 15,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },

  // セクションの横並び
  featureContainer: {
    flexDirection: 'row',
    marginBottom: 18,

  }
});

export default Detail;