import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { plant, RegisteredPlant } from '../../../types/plant';
import { Todo } from '../../../types/todo';
import { getPlant } from '../../api/searchPlant';
import { get_todos } from '../../api/todo';

type DetailRouteProp = RouteProp<{ params: { plantId: string } }, 'params'>;

const HomeDetail = () => {
  const route = useRoute<DetailRouteProp>();
  const { plantId } = route.params;

  const [plantDetails, setPlantDetails] = useState<plant | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const plantResponse = await getPlant(plantId);
        setPlantDetails(plantResponse);

        const todosResponse = await get_todos(plantId);
        setTodos(todosResponse);
      } catch (error) {
        console.error('データの取得に失敗しました', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [plantId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>読み込み中...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {plantDetails && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{plantDetails.name}</Text>
          <Text style={styles.cardDescription}>{plantDetails.description}</Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>成長条件</Text>
          <Text style={styles.value}>光: {plantDetails.growth_conditions.light}</Text>
          <Text style={styles.value}>土壌: {plantDetails.growth_conditions.soil}</Text>
          <Text style={styles.value}>耐寒ゾーン: {plantDetails.growth_conditions.hardiness_zone}</Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>ケア期間</Text>
          {plantDetails.care_periods.map((period, index) => (
            <View key={index} style={styles.carePeriod}>
              <Text style={styles.value}>開始日: {period.start_date}</Text>
              <Text style={styles.value}>終了日: {period.end_date}</Text>
              <Text style={styles.value}>期間タイプ: {period.period_type}</Text>
            </View>
          ))}
        </View>
      )}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>ToDoリスト</Text>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.task_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.todoItem}>
              <Text style={styles.todoTitle}>{item.task_name}</Text>
              <Text style={styles.todoDescription}>{item.description}</Text>
              <Text style={styles.todoValue}>優先度: {item.priority}</Text>
              <Text style={styles.todoValue}>ステータス: {item.status}</Text>
              <Text style={styles.todoValue}>期限: {item.due_date}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFBF3',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#68A98A',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#68A98A',
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  carePeriod: {
    marginBottom: 10,
  },
  todoItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#68A98A',
    marginBottom: 5,
  },
  todoDescription: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  todoValue: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
});

export default HomeDetail;