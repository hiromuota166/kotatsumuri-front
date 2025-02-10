import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Diagnosis } from '../../../types/diagnoses';

const DiagnosesDetail = ({ route }) => {
  const { diagnosis } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>診断結果</Text>
      <View style={styles.section}>
        <Text style={styles.label}>病気:</Text>
        <Text style={styles.value}>{diagnosis.disease}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>考えられる原因:</Text>
        {diagnosis.possible_cause.map((cause, index) => (
          <Text key={index} style={styles.value}>{cause}</Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>症状:</Text>
        {diagnosis.symptoms.map((symptom, index) => (
          <Text key={index} style={styles.value}>{symptom}</Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>対処法:</Text>
        {diagnosis.todo.map((todo, index) => (
          <Text key={index} style={styles.value}>{todo.description}</Text>
        ))}
      </View>
    </ScrollView>
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
  },
  section: {
    marginBottom: 20,
  },
  label: {
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
});

export default DiagnosesDetail;