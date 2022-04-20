import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
    StyleSheet,
    Text,
    View,
    Button,
    Platform,
    ScrollView,
} from 'react-native';
import { disableExpoCliLogging } from 'expo/build/logs/Logs';
import { Audio } from 'expo-av';
import { render } from 'react-dom';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { styles } from './src/shared/stylesheets/StyleSheet';
import HomeStack from './src/shared/navigators/HomeStack.js';
import Home from './src/shared/components/Home.js';
import MyLibraryStack from './src/shared/navigators/MyLibraryStack.js';
import Login from './src/shared/components/Login.js';
import ProfileStack from './src/shared/navigators/ProfileStack.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MarketplaceStack from './src/shared/navigators/MarketplaceStack';

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.debugging = false;
    }

    // Debugging function -- Helps a lot ฅ^•ﻌ•^ฅ
    LogItAll = async () => {};
    /* --------------------------------------Audio / voice functionality------------------------------ */

    render() {
        return (
            <>
                <NavigationContainer>
                    <Tab.Navigator
                        initialRouteName="Login"
                        style={styles.tabBar}
                        screenOptions={{
                            tabBarActiveTintColor: '#FF9900',
                            tabBarInactiveTintColor: '#CBD9F5',

                            tabBarStyle: {
                                backgroundColor: '#00082F',
                                paddingTop: 8,
                                position: 'absolute',
                                height: 90,
                            },
                            tabBarLabelStyle: {
                                fontSize: 12,
                                marginTop: 10,
                                padding: 2,
                            },
                            header: () => null,
                        }}
                    >
                        <Tab.Screen
                            name="Marketplace"
                            component={MarketplaceStack}
                            options={{
                                unmountOnBlur: true,
                                tabBarIcon: ({ color, size }) => (
                                    <Ionicons
                                        name="book"
                                        color={color}
                                        size={size}
                                    />
                                ),
                            }}
                        />
                        <Tab.Screen
                            name="My Library"
                            component={MyLibraryStack}
                            options={{
                                unmountOnBlur: true,
                                tabBarIcon: ({ color, size }) => (
                                    <Ionicons
                                        name="play-circle"
                                        color={color}
                                        size={size}
                                    />
                                ),
                            }}
                        />
                        <Tab.Screen
                            name="Profile"
                            component={ProfileStack}
                            options={{
                                unmountOnBlur: true,
                                tabBarIcon: ({ color, size }) => (
                                    <Ionicons
                                        name="person"
                                        color={color}
                                        size={size}
                                    />
                                ),
                            }}
                        />
                    </Tab.Navigator>
                </NavigationContainer>
            </>
        );
    }
}

/*

  █▀▀▄░░░░░░░░░░░▄▀▀█
░█░░░▀▄░▄▄▄▄▄░▄▀░░░█
░░▀▄░░░▀░░░░░▀░░░▄▀
░░░░▌░▄▄░░░▄▄░▐▀▀
░░░▐░░█▄░░░▄█░░▌▄▄▀▀▀▀█
░░░▌▄▄▀▀░▄░▀▀▄▄▐░░░░░░█
▄▀▀▐▀▀░▄▄▄▄▄░▀▀▌▄▄▄░░░█
█░░░▀▄░█░░░█░▄▀░░░░█▀▀▀
░▀▄░░▀░░▀▀▀░░▀░░░▄█▀
░░░█░░░░░░░░░░░▄▀▄░▀▄
░░░█░░░░░░░░░▄▀█░░█░░█
░░░█░░░░░░░░░░░█▄█░░▄▀
░░░█░░░░░░░░░░░████▀
░░░▀▄▄▀▀▄▄▀▀▄▄▄█

*/
