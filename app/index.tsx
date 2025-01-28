import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Handle login logic here
        // 成功したらタブ画面に遷移
        router.replace({ pathname: '../(tabs)' });
    };

    return (
       <View
       style={styles.container}
       >
        <Image
            source={require('../assets/images/logo.png')}
            style={{ width: 150,
                 height: 150 ,
                    alignSelf: 'center',
                    top: 150,
                }}
        />
        <Text
        style={{
            fontSize: 38,
            marginBottom: 16,
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'green',
            top: 180,
        }}
        >GardenMaster</Text>
                <Text
        style={{
            fontSize: 16,
            marginBottom: 16,
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'green',
            top: 180,
        }}
        >あなたのガーデニングをより快適に</Text>

        <TouchableOpacity
        onPress={handleLogin}
        >
            <View
            style={{
                backgroundColor: 'green',
                padding: 10,
                margin: 10,
                borderRadius: 5,
                top: 260,
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
                Lineログイン
            </Text>
            
            </View>
        </TouchableOpacity>
       </View>
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
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default Login;