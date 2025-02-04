import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface RegistButtonProps {
    onPress: () => void;
    title: string;
}

const RegistButton: React.FC<RegistButtonProps> = ({ onPress, title }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
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
});

export default RegistButton;