import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../../../components/SearchBar';
import { useFocusEffect, useRouter } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const { width } = Dimensions.get('window'); // 画面の幅を取得

const Search = () => {
  const [query, setQuery] = useState<string>(''); // 検索バーの入力値
  const [focus, setFocus] = useState<boolean>(false); // フォーカス状態
  const [searchHistory, setSearchHistory] = useState<string[]>([]); // 検索履歴
  const router = useRouter();
  const db = SQLite.openDatabaseAsync('searchSql.db');

  useFocusEffect(
    useCallback(() => {
      getSearchHistory();
    }, []
    ));

  useEffect(() => {
    createSearchHistoryTable();
    const databasePath = `${FileSystem.documentDirectory}SQLite/searchSql.db`;
    console.log('Database path:', databasePath);
  }, []);


  // expo-sqliteを使って検索クエリを保存するテーブルを作成する
  const createSearchHistoryTable = () => {
    db.then(database => {
      database.execAsync(
        `CREATE TABLE IF NOT EXISTS History (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          query TEXT NOT NULL
        );`
      ).then(result => {
        console.log('Created search history table:', result);
      }).catch(error => {
        console.error('Failed to create search history table:', error);
      });
    });
  }

  // expo-sqliteを使って検索クエリを保存する
  const saveSearchHistory = (query: string) => {
    db.then(database => {
      database.runAsync(
        `INSERT INTO History (query)
        SELECT ?
         WHERE NOT EXISTS (
         SELECT 1 FROM History WHERE query = ?
      );
         `, [query, query]
      )
    });
  };

  // 検索履歴を取得する
  const getSearchHistory = () => {
    db.then(database => {
      database.getAllAsync(`SELECT * FROM  "History";`).then(result => {
        if (result.length != 0) {
          setSearchHistory(result.map((item: any) => item.query));
        }
      })
    })
  };

  const deleteSearchHistory = (query: string) => {
    db.then(database => {
      database.runAsync(
        `DELETE FROM History WHERE query = ?;`, [query]
      )
    });
  }
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
    <SafeAreaView style={[styles.safeAreaView, { width }]}>
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
                  saveSearchHistory(query);
                  router.push({
                    pathname: 'screens/search/detail',
                    params: { data: JSON.stringify(query) },
                  });
                }}
                onFocas={handleFocus}
                onBlur={handleBlur}
              />
            </Animated.View>
            {focus && (
              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss();
                  handleBlur(); // キャンセル時もフォーカスを外す
                }}
              >
                <Text style={styles.cancelButtonText}>キャンセル</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <View style={styles.historyContainer}>
        <Text style={{
          paddingLeft: 25,
          paddingTop: 30,
          fontSize: 35,
          fontWeight: 'bold',
        }}>
          検索履歴
        </Text>
        <ScrollView>
          {
            searchHistory.map((item, index) =>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center', // 垂直方向に中央揃え

              }}
                key={index}
              >
                <TouchableOpacity
                  onPress={() => {
                    router.push({
                      pathname: 'screens/search/detail',
                      params: { data: JSON.stringify(item) },
                    });
                  }}
                >
                <Text style={{
                  paddingLeft: 25,
                  paddingTop: 30,
                  fontSize: 20,
                }}
                >{item}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    deleteSearchHistory(item);
                    getSearchHistory();
                  }}
                >
                  <Text style={{
                  paddingRight: 25,
                  paddingTop: 30,
                    fontSize: 30,
                  }}
                  >×</Text>
                </TouchableOpacity>
              </View>
            )
          }
        </ScrollView>
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
    position: 'absolute',
    top: 0,
    height: 150,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    position: 'absolute',
    left: -90,
    top: -10,
  },
  dataText: {
    fontFamily: 'monospace',
    fontSize: 14,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    padding: 16,
  },
  zstack: {
    height: 170,
    backgroundColor: '#68A98A',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
    borderBottomWidth: 1,
  },
  searchContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingLeft: 30,
    top: 20,
  },
  historyContainer: {
    flex: 1,
    position: 'relative',
    top: 100,
    padding: 10,
  },
});

export default Search;
