// プロフィールを設定する画面, ユーザー名を入力して登録するとタブ画面に遷移する
// ユーザー名は未入力の場合は登録できない
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';

const SettingProfile = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const router = useRouter();
    const handleRegister = () => {
        if (username.trim() === '') {
            Alert.alert('エラー', 'ユーザー名を入力してください');
            return;
        }
        // 登録処理をここに追加
        router.replace('../../(tabs)');
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <Text style={styles.label}>ユーザー名</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="ガーデン太郎"
            />
            <TouchableOpacity
                onPress={handleRegister}
                style={{ width: 200, alignSelf: 'center', top: 180 }}
            >
                <View
                    style={{
                        backgroundColor: 'green',
                        padding: 10,
                        margin: 10,
                        borderRadius: 10,
                        width: 200,
                        height: 60,
                        alignSelf: 'center',
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 20,
                            marginTop: 10,
                        }}
                    >
                        登録
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    label: {
        fontSize: 20,
        marginBottom: 8,
        fontWeight: 'bold',

    },
    input: {
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        borderRadius: 10,
    },
});

export default SettingProfile;