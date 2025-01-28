import React, { useState } from 'react';
import {
    View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView,
    ScrollView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const signUp = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [focus, setFocus] = useState(false);
    const [errormessage, setError] = useState('');
    
    const handleSignUp = async () => {
        if (!email || !password) {
            Alert.alert('エラー', 'メールアドレスとパスワードを入力してください。');
            return;
        }
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            router.replace({ pathname: './signUp/settingProfile' });
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert("エラー", 'このメールアドレスは既に使用されています');
            } else {
                Alert.alert("エラー", 'エラーが発生しました');
            }
        }
    };

    return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} 
            style={{ backgroundColor: '#000000' }}
            >
                    <View
                        style={styles.container}
                    >
                        <Image
                            source={require('../../../assets/images/logo.png')}
                            style={{
                                width: 100,
                                height: 100,
                                alignSelf: 'center',
                                top: 80,
                            }}
                        />
                        <Text
                            style={{
                                fontSize: 28,
                                marginBottom: 12,
                                textAlign: 'center',
                                fontWeight: 'bold',
                                color: 'green',
                                top: 110,
                            }}
                        >GardenMaster</Text>
                        <Text
                            style={{
                                fontSize: 12,
                                marginBottom: 12,
                                textAlign: 'center',
                                fontWeight: 'bold',
                                color: 'green',
                                top: 110,
                            }}
                        >あなたのガーデニングをより快適に</Text>
                        <View
                            style={{
                                top: 130,
                                alignItems: 'center'
                            }}
                        >
                            <TextInput
                                placeholder="メールアドレス"
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                            />
                            <TextInput
                                placeholder="パスワード(6文字以上)"
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>
                        <TouchableOpacity
                            onPress={handleSignUp}
                            style={{width: 200, alignSelf: 'center', top: 180}}
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
        //  </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        width: 300,
        borderRadius: 10,
        marginTop: 10,
    },
});

export default signUp;