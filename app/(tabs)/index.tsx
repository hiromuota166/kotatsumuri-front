import React, { useRef, useState } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native';
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

  const barWidth = useRef(new Animated.Value(240)).current; // 初期幅

  const handleFocus = () => {
    setFocus(true);
    Animated.timing(barWidth, {
      toValue: 350, // 拡大幅
      duration: 300,
      useNativeDriver: false, // width の変更は useNativeDriver をサポートしない
    }).start();
  };

  const handleBlur = () => {
    setFocus(false);
    Animated.timing(barWidth, {
      toValue: 240, // 元の幅
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <SafeAreaView style={[ styles.safeAreaView, {width}]}>
      <StatusBar barStyle="dark-content" />
      <View style={[styles.container, { width }]}>
        <View style={styles.zstack}>
          <View style={styles.searchContent}>
            {/* 検索バー */}
            <Animated.View style={[{ width: barWidth }]}>
              <SearchBar
                placeholder="植物を検索"
                value={query}
                onChangeText={setQuery}
                onSubmit={() => {
                  router.push({
                    pathname: '/search/detail',
                    params: { data: JSON.stringify(query) },
                  });
                }}
                onFocas={handleFocus}
                onBlur={handleBlur}
              />
            </Animated.View>
            {focus && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  Keyboard.dismiss();
                  handleBlur(); // キャンセル時もフォーカスを外す
                }}
              >
                <Text style={styles.searchButtonText}>キャンセル</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#FFFBF3',
    height: '100%',
  },

  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 16,
    backgroundColor: '##FFFBF3',
    width: '100%',
    paddingTop: 0,
    flexDirection: 'column',
  },
  cancelButton: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  dataText: {
    fontFamily: 'monospace',
    fontSize: 14,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    padding: 16,
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
    paddingHorizontal: 10,
  },
});

export default Search;
