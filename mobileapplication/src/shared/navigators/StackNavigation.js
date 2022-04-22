import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Stories from '../components/Stories.js';
import Marketplace from '../components/Marketplace.js';
import Category from '../components/Category.js';

import Game from '../components/Game.js';
import Horror from '../components/Horror.js';
import MyLibrary from '../components/MyLibrary.js';
import EditProfile from '../components/EditProfile.js';
import Login from '../components/Login.js';
import EditPassword from '../components/EditPassword.js';
import Profile from '../components/Profile.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const screenWidth = Dimensions.get('window').width;

function MarketplaceStack() {
    return (
        <Stack.Navigator screenOptions={{ header: () => null }}>
            <Stack.Screen name="Marketplace" component={Marketplace} />
            <Stack.Screen name="Category" component={Category} />
            <Stack.Screen name="Stories" component={Stories} />
            <Stack.Screen name="Game" component={Game} />
            <Stack.Screen name="Horror" component={Horror} />
        </Stack.Navigator>
    );
}

function MyLibraryStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MyLibrary" component={MyLibrary} />
            <Stack.Screen name="Stories" component={Stories} />
            <Stack.Screen name="Game" component={Game} />
        </Stack.Navigator>
    );
}

function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Edit Profile" component={EditProfile} />
            <Stack.Screen name="Edit Password" component={EditPassword} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
}

export default function Navigation(props) {
    return (
        <NavigationContainer>
            <Tab.Navigator
                //initialRouteName="Marketplace"
                screenOptions={({ route }) => ({
                    header: () => null,
                    tabBarIcon: ({ focused, color, size, padding }) => {
                        let iconName;
                        if (route.name == 'Marketplace') {
                            iconName = focused ? 'book' : 'book-outline';
                        } else if (route.name == 'My Library') {
                            iconName = focused
                                ? 'play-circle'
                                : 'play-circle-outline';
                        } else if (route.name == 'Profile') {
                            iconName = focused ? 'person' : 'person-outline';
                        }
                        return (
                            <Ionicons
                                name={iconName}
                                color={color}
                                size={size}
                                style={{ paddingBottom: padding }}
                            />
                        );
                    },
                    tabBarActiveTintColor: '#FF9900',
                    tabBarInactiveTintColor: '#CBD9F5',
                    tabBarStyle: [
                        {
                            backgroundColor: '#00082F',
                            display: 'flex',
                        },
                        null,
                    ],
                })}
                tabBarOptions={{
                    activeTintColor: '#FF9900',
                    inactiveTintColor: '#CBD9F5',
                    style: { width: screenWidth, backgroundColor: 'red' },
                }}
            >
                <Tab.Screen name="Marketplace" component={MarketplaceStack} />
                <Tab.Screen name="My Library" component={MyLibraryStack} />
                <Tab.Screen name="Profile" component={ProfileStack} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
