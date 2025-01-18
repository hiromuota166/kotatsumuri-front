import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePathname, useSearchParams } from 'expo-router/build/hooks';


const Detail = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const description = searchParams.get('description');
  const growth_conditions = JSON.parse(searchParams.get('growth_conditions') || '{}');
  const care_periods = JSON.parse(searchParams.get('care_periods') || '[]');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.plantDetail}>
        <Text>Current Path: {pathname}</Text>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{description}</Text>
          {care_periods.map((period: { start_date: string; end_date: string }, index: number) => (
            <View key={index}>
              <Text>{period.start_date}</Text>
              <Text>{period.end_date}</Text>
            </View>
          ))}
          <Text>{growth_conditions.light}</Text>
          <Text>{growth_conditions.soil}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  plantDetail: {
    padding: 16,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default Detail;