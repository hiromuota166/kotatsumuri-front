import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface RegistButtonProps {
    onPress: () => void;
    title: string;
    isRegistered?: boolean;
}

const RegistButton: React.FC<RegistButtonProps> = ({ onPress, title, isRegistered }) => {
    return (
        <TouchableOpacity style={
            isRegistered ? styles.buttonRegisted : styles.button
        } onPress={onPress}>
            <Text style={
                isRegistered ? styles.buttonTextRegisted : styles.buttonText
            }>{
                isRegistered ? '登録済み' : title
                }</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        margin: 16,
    },
    buttonText: {
        color: '#68A98A',
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonRegisted: {
        backgroundColor: '#D9D9D9',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        margin: 16,
    },
    buttonTextRegisted: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    
});

export default RegistButton;