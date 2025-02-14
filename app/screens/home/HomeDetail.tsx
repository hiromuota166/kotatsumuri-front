import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { plant, RegisteredPlant } from '../../../types/plant';
import { Todo, Priority, Status } from '../../../types/todo';
import { getPlant } from '../../api/searchPlant';
import { get_todos } from '../../api/todo';
import { SafeAreaView } from 'react-native-safe-area-context';


type DetailRouteProp = RouteProp<{ params: { data: string } }, 'params'>;

const HomeDetail = () => {
  const route = useRoute<DetailRouteProp>();
  const plantId = route.params?.data;

  const [plantDetails, setPlantDetails] = useState<plant | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const formatDate = (isoDate: string) => {
    if (!isoDate.includes('T')) return isoDate; // ISO形式でない場合はそのまま返す
    const date = new Date(isoDate);
    return `${date.getMonth() + 1}月${date.getDate()}日`; // 月と日を取得
  };

  useEffect(() => {
    console.log('plantId:', plantId);
    const fetchData = async () => {
      try {
        const plantResponse = await getPlant(plantId);
        console.log('plantResponse:', plantResponse as plant);
        console.log(plantResponse.growth_conditions.light)
        setPlantDetails(plantResponse as plant);

        const todosResponse = await get_todos(plantId);
        console.log('todosResponse:', todosResponse);
        setTodos(todosResponse as Todo[]);
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
        <ActivityIndicator size="large" color="#68A98A" />
        <Text>読み込み中...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFBF3' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {plantDetails && (
          <View style={styles.card}
          key={plantDetails.id}
          >
            <Text style={styles.cardTitle}>{plantDetails.name}</Text>
            <Text style={styles.cardDescription}>{plantDetails.description}</Text>
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>成長条件</Text>
            <Text style={styles.value}>光: {plantDetails?.growth_conditions.light}</Text>
            <Text style={styles.value}>土壌: {plantDetails?.growth_conditions.soil}</Text>
            <Text style={styles.value}>耐寒ゾーン: {plantDetails?.growth_conditions.hardiness_zone}</Text>
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>ケア期間</Text>
            {plantDetails?.care_periods.map((period, index) => (
                        <View
                          key={index}
                          style={{
                            flexDirection: 'row',
                            borderBottomWidth: index === plantDetails?.care_periods.length - 1 ? 0 : 1,
                            borderColor: '#eee',
                            paddingVertical: 8,
                          }}
                        >
                          <Text style={{ flex: 1 }}>
                            {period.period_type === 'blooming_period'
                              ? '開花期🌸'
                              : period.period_type === 'pruning_period'
                                ? '剪定期🍃'
                                : period.period_type === 'planting_period'
                                  ? '植付期🌱'
                                  : period.period_type === 'fertilizing_period'
                                    ? '肥料期🫘'
                                    : period.period_type === 'repotting_period'
                                      ? '植替期🪴'
                                      : 'No Data'}
                          </Text>
                          <Text style={{ flex: 2,  marginLeft: 30 }}>{formatDate(period.start_date)}</Text>
                          <Text style={{ flex: 2 }}>{formatDate(period.end_date)}</Text>
                        </View>
                      ))}
          </View>
        )}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>ToDoリスト</Text>
          {todos?.map((todo) => (
            <View key={todo.task_id} style={styles.todoItem}>
              <Text style={styles.todoTitle}>{todo.taskname}</Text>
              <Text style={styles.todoDescription}>{todo.discription}</Text>
              <Text style={styles.todoValue}>優先度: {todo.priority}</Text>
              <Text style={styles.todoValue}>ステータス: {todo.status}</Text>
              <Text style={styles.todoValue}>期限: {todo.duedate}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
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