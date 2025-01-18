import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Dimensions, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { plant } from '@/types/plant';
import SearchBar from '@/components/SearchBar';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window'); // 画面の幅を取得


const Search = () => {
  const [query, setQuery] = useState<string>(''); // 検索バーの入力値
  const [data, setData] = useState<plant | null>(null); // plant型の配列
  const [loading, setLoading] = useState<boolean>(false); // ローディング状態
  const [focus, setFocus] = useState<boolean>(false); // フォーカス状態
  const router = useRouter();

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/plants?query=${query}`);
      const json = await response.json();
      setData(json as plant);
      if (data != null) {
        router.push({
          pathname: '/search/detail',
          params: { data: JSON.stringify(data) },
        });      
      }  
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{width}}>
      <StatusBar barStyle="dark-content" />
      <View style={[styles.container, {width}]}>
        <View style={styles.zstack}>
          <View style={styles.searchContent}>
            {/* 検索バー */}
            <SearchBar
              placeholder="植物を検索"
              value={query}
              onChangeText={setQuery}
              onSubmit={fetchSearchResults}
              onFocas={() => setFocus(true)}
              onBlur={() => setFocus(false)}
            />
            {focus && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => Keyboard.dismiss()}
              >
                <Text style={styles.searchButtonText}>キャンセル</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* ローディング中の表示 */}
        {loading && <Text>Loading...</Text>}

        {/* データを文字列として表示 */}
        <ScrollView>
          <Text style={styles.dataText}>
            {data ? JSON.stringify(data, null, 2) : 'No data to display'}
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {   
    justifyContent: 'center',
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    width: '100%',
    paddingTop: 0, // ステータスバーに被せるためにパディングを0に設定
    flexDirection: 'column',
  },
  searchBar: {
    height: 30,
    width: '60%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    position: 'absolute',
    paddingHorizontal: 0,
  },
  cancelButton: {
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  dataText: {
    fontFamily: 'monospace', // テキストを整列させるためにモノスペースフォントを使用
    fontSize: 14,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    padding: 16,
    paddingTop: 500,
  },
  zstack: {
    height: 150,
    backgroundColor: '#68A98A',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  searchContent: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  }
});

export default Search;