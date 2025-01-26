import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        borderWidth: 2, // 枠線の太さ
        borderColor: '#103E28', // 枠線の色(緑)
        backgroundColor: '#FFFFFF',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 45,
        marginVertical: 10 ,
        width: '70%',
    },
    searchBar: {
        fontSize: 15,
    }
});

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  onFocas?: () => void;
  onBlur?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, value, onChangeText, onSubmit, onFocas, onBlur }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder={placeholder || '植物を検索'}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        onFocus={onFocas}
        onBlur={onBlur}
      />
    </View>
  );
};
export default SearchBar;