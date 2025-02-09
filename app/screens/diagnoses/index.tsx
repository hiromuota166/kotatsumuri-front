import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DiagnosesForm } from '../../../types/diagnosesForm';
import { get_plant_regist } from '../../api/plant_regist';
import { RegisteredPlant } from '../../../types/plant';
import { Picker } from '@react-native-picker/picker';
import Selector from '../../../components/Selector';
import * as ImagePicker from 'react-native-image-picker';
import { location, sunlight, ventilation, soil_type, temperature, fartilizer_type, pesticide_history } from '../../../types/diagnosesForm';

const Diagnoses = () => {
  const { height, width } = Dimensions.get('window');
  const vw = width / 100;
  const vh = height / 100;
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [diagnosesForm, setDiagnosesForm] = useState<DiagnosesForm | null>(null);
  const [registPlants, setRegistPlants] = useState<RegisteredPlant[] | null>([]);
  const PlaceholderImage = require('../../../assets/images/react-logo.png');
  const [response, setResponse] = React.useState<any>(null);

  useEffect(() => {
    get_plant_regist().then((response) => {
      setRegistPlants(response);
    });
  }, [diagnosesForm]);

  const handleSelect = (field: keyof DiagnosesForm, value: any) => {
    setDiagnosesForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    } as DiagnosesForm));
  };

  const handleSubmit = () => {
    router.push({
      pathname: 'screens/diagnoses/diagnosesDetail',
      params: { data: JSON.stringify(diagnosesForm) },
    });
  }

  const onButtonPress = React.useCallback((options: any) => {
      ImagePicker.launchImageLibrary(options, setResponse).then((response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else {
          if (response.assets){
            setDiagnosesForm((prevForm) => ({
              ...prevForm,
              image: response.assets ? response.assets[0].uri : undefined,
            } as DiagnosesForm));
          } else {
            Alert.alert('画像の取得に失敗しました');
          }
        }})
  }, []);



  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.card}>
          <Text style={styles.title}>🪴診断書🩺</Text>
          <View style={
                        {
                          borderBottomWidth: 1,
                          borderBottomColor: '#ccc',
                          paddingBottom: 60,
                          marginBottom: 20,
                        }
          }>
            <Text style={styles.label}>植物名</Text>
            <Picker
              key={registPlants?.length}
              selectedValue={diagnosesForm?.plant_id}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => {
                setDiagnosesForm((prevForm) => ({
                  ...prevForm,
                  plant_id: itemValue as string,
                  name: registPlants?.find((plant) => plant.id === itemValue)?.name || '',
                } as DiagnosesForm));
              }}
            >
              {registPlants?.map((plant) => (
                <Picker.Item key={plant.id} label={plant.name} value={plant.id} />
              ))}
            </Picker>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>栽培場所</Text>
            <Selector
              options={Object.values(location)}
              onSelect={(value: string) => handleSelect('location', value)}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>日照時間</Text>
            <Selector
              options={Object.values(sunlight)}
              onSelect={(value: string) => handleSelect('sunlight', value)}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>通風状況</Text>
            <Selector
              options={Object.values(ventilation)}
              onSelect={(value: string) => handleSelect('ventilation', value)}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>土壌の種類</Text>
            <Selector
              options={Object.values(soil_type)}
              onSelect={(value: string) => handleSelect('soil_type', value)}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>気温と湿度の状況</Text>
            <Selector
              options={Object.values(temperature)}
              onSelect={(value: string) => handleSelect('temperature', value)}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>葉の変色</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleSelect('leaf_color', value)}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>茎や根への影響(例: 週3)</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleSelect('stem_root_condition', value)}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>水やり頻度(例: 週3)</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleSelect('watering_frequency', value)}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>肥料の種類</Text>
            <Selector
              options={Object.values(fartilizer_type)}
              onSelect={(value: string) => handleSelect('fertilizer_type', value)}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>施肥頻度(例: 週3)</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleSelect('fertilizing_frequency', value)}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>使用薬剤の有無</Text>
            <Selector
              options={Object.values(pesticide_history)}
              onSelect={(value: string) => handleSelect('pesticide_history', value)}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>最近の気候(寒くなり始めた)</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleSelect('recent_weather', value)}
            />
          </View>
          <View style={styles.section}>
            {/* <Image source={{ uri: response || PlaceholderImage }} style={{ width: 100, height: 100 }} /> */}

                    {response?.assets &&
          response?.assets.map(({uri}: {uri: string}) => (
            <View key={uri} style={styles.imageContainer}>
              <Image
                resizeMode="cover"
                resizeMethod="scale"
                style={styles.image}
                source={{uri: uri}}
              />
            </View>
          ))}
                      <Button
              title="画像を選択"
              color={'#68A98A'}
              onPress={() => {
                onButtonPress({ mediaType: 'photo', quality: 1 })
              }}
            ></Button>

          </View>
          <Button title="診断する!"
            color={'#68A98A'}
           onPress={() => { handleSubmit}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFBF3',
  },
  scrollView: {
    padding: 20,
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
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#68A98A',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  imageContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 360,
    borderRadius: 10,
  },
  picker: {
    top: -80,
    height: 50,
    width: '100%',
  },
});

export default Diagnoses;