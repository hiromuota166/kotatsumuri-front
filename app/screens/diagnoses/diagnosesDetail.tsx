import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator, Button } from 'react-native';
import { Diagnosis } from '../../../types/diagnoses';
import { DiagnosesForm } from '../../../types/diagnosesForm';
import { RouteProp, useRoute } from '@react-navigation/native';
import { get_diagnoses } from '../../api/diagnoses';
import { SafeAreaView } from 'react-native-safe-area-context';
import { post_todos ,get_todos } from '../../api/todo';

type RawParam = {
  diagnosis: string;
};
type DiagnosesDetailRouteProp = RouteProp<{ params: RawParam }, 'params'>;

const DiagnosesDetail = () => {
  const route = useRoute<DiagnosesDetailRouteProp>();
  const rawDiagnosis = route.params?.diagnosis;
  const diagnosis = JSON.parse(rawDiagnosis) as DiagnosesForm;
  const [registTodo, setRegistTodo] = useState<boolean>(false);

  const [diagnosesDetail, setDiagnosesDetail] = useState<Diagnosis | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleCreateTodo = async () => { 
    if (diagnosesDetail){    
      const status = await post_todos( diagnosesDetail.todo_list, diagnosis.plant_id)
      if (status == 200){
        Alert.alert('登録しました');
        setRegistTodo(true)
      } else {
        Alert.alert('登録に失敗しました');
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get_diagnoses(
          diagnosis.plant_id,
          diagnosis.name,
          diagnosis.location,
          diagnosis.sunlight,
          diagnosis.ventilation,
          diagnosis.soil_type,
          diagnosis.temperature,
          diagnosis.leaf_color,
          diagnosis.stem_root_condition,
          diagnosis.watering_frequency,
          diagnosis.fertilizer_type,
          diagnosis.fertilizing_frequency,
          diagnosis.pesticide_history,
          diagnosis.recent_weather,
          diagnosis.image_url
        );
        setDiagnosesDetail(response);
      } catch (error) {
        Alert.alert('診断の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [diagnosis.fertilizer_type, diagnosis.fertilizing_frequency, diagnosis.leaf_color, diagnosis.location, diagnosis.name, diagnosis.pesticide_history, diagnosis.plant_id, diagnosis.recent_weather, diagnosis.soil_type, diagnosis.stem_root_condition, diagnosis.sunlight, diagnosis.temperature, diagnosis.ventilation, diagnosis.watering_frequency]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFBF3' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>診断結果</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#68A98A" />
        ) : (
          diagnosesDetail && (
            <>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>病気</Text>
                <View style={styles.divider} />
                <Text style={styles.value}>{diagnosesDetail.disease}</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>考えられる原因</Text>
                <View style={styles.divider} />
                {diagnosesDetail.possible_causes && diagnosesDetail.possible_causes.map((cause, index) => (
                  <Text key={index} style={styles.value}>{cause}</Text>
                ))}
              </View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>症状</Text>
                <View style={styles.divider} />
                {diagnosesDetail.symptoms && diagnosesDetail.symptoms.map((symptom, index) => (
                  <Text key={index} style={styles.value}>{symptom}</Text>
                ))}
              </View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>対処法</Text>
                <View style={styles.divider} />
                {diagnosesDetail.todo_list && diagnosesDetail.todo_list.map((todo, index) => (
                  <Text key={index} style={styles.value}>{todo.discription}</Text>
                ))}
              </View>
              <View style={styles.card}>
                {registTodo ? (
                <Button title="登録済"  color={"gray"} />
                ) : (
                  <Button title="対処法をやることリストに登録する！" onPress={() => {handleCreateTodo } } color={"#68A98A"} />
                )}
              </View>
            </>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFBF3',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#68A98A',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#68A98A',
    marginBottom: 10,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
});

export default DiagnosesDetail;