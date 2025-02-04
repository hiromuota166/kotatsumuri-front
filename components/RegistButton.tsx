import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface RegistButtonProps {
    onPress: () => void;
    title: string;
    isRegist?: boolean;
}

const RegistButton: React.FC<RegistButtonProps> = ({ onPress, title, isRegist }) => {
    return (
        <TouchableOpacity style={
            isRegist ? styles.buttonRegisted : styles.button
        } onPress={onPress}>
            <Text style={
                isRegist ? styles.buttonTextRegisted : styles.buttonText
            }>{
                isRegist ? '登録済み' : title
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