import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, Image } from 'react-native';
import Home from '../screens/home/index';
import Search from '../screens/search/index';
import Diagnoses from '../screens/diagnoses/index';

const Tab = createBottomTabNavigator();

export default function TabScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    if (route.name === 'Home') {
                        return focused ?
                            <Image style={{
                                width: 30,
                                height: 30,
                                tintColor: '#68A98A',
                            }} source={require('../../assets/images/tab-home.png')} />
                            :
                            <Image style={{
                                width: 30,
                                height: 30,
                                tintColor: 'gray',
                            }} source={require('../../assets/images/tab-home.png')} />
                    } else if (route.name === 'Search') {
                        return focused ?
                            <Image style={{
                                width: 30,
                                height: 30,
                                tintColor: '#68A98A',
                            }} source={require('../../assets/images/tab-search.png')} />
                            :
                            <Image style={{
                                width: 30,
                                height: 30,
                                tintColor: 'gray',
                            }} source={require('../../assets/images/tab-search.png')} />
                    } else if (route.name === 'MyPage') {
                        return focused ?
                            <Image style={{
                                width: 30,
                                height: 30,
                                tintColor: '#68A98A',
                            }} source={require('../../assets/images/tab-mypage.png')} />
                            :
                            <Image style={{
                                width: 30,
                                height: 30,
                                tintColor: 'gray',
                            }} source={require('../../assets/images/tab-mypage.png')} />
                    } else if (route.name === 'Diagnoses') {
                        return focused ?
                            <Image style={{
                                width: 30,
                                height: 30,
                                tintColor: '#68A98A',
                            }} source={require('../../assets/images/tab-diagnoses.png')} />
                            :
                            <Image style={{
                                width: 30,
                                height: 30,
                                tintColor: 'gray',
                            }} source={require('../../assets/images/tab-diagnoses.png')} />
                    }
                },
                tabBarStyle: {
                    backgroundColor: '#EDF4F0',
                    height: 100,
                    paddingTop: 15,
                },
                tabBarActiveTintColor: '#68A98A',
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                }
            })}
        >
            <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: 'ホーム' }} />
            <Tab.Screen name="Search" component={Search} options={{ tabBarLabel: '検索' }} />
            <Tab.Screen name="MyPage" component={Search} options={{ tabBarLabel: 'マイページ' }} />
            <Tab.Screen name="Diagnoses" component={Diagnoses} options={{tabBarLabel: '病気診断'}}/>
        </Tab.Navigator>
    );
}

