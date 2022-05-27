import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Stories from '../components/Stories.js';
import Explore from '../components/Explore.js';
import Category from '../components/Category.js';
import Game from '../components/Game.js';
import MyLibrary from '../components/MyLibrary.js';
import EditProfile from '../components/EditProfile.js';
import EditPassword from '../components/EditPassword.js';
import Profile from '../components/Profile.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const screenWidth = Dimensions.get('window').width;

function ExploreStack() {
    return (
        <Stack.Navigator screenOptions={{ header: () => null }}>
            <Stack.Screen name="Explore" component={Explore} />
            <Stack.Screen name="Stories" component={Stories} />
            <Stack.Screen name="Category" component={Category} />
            <Stack.Screen name="Game" component={Game} />
        </Stack.Navigator>
    );
}

function MyLibraryStack() {
    return (
        <Stack.Navigator screenOptions={{ header: () => null }}>
            <Stack.Screen name="MyLibrary" component={MyLibrary} />
            <Stack.Screen name="Stories" component={Stories} />
            <Stack.Screen name="Game" component={Game} />
        </Stack.Navigator>
    );
}

function ProfileStack() {
    return (
        <Stack.Navigator screenOptions={{ header: () => null }}>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Edit Profile" component={EditProfile} />
            <Stack.Screen name="Edit Password" component={EditPassword} />
        </Stack.Navigator>
    );
}

export default function TabNavigation() {
    return (
        <Tab.Navigator
            initialRouteName="Explore"
            screenOptions={({ route }) => ({
                header: () => null,
                tabBarIcon: ({ focused, color, size, padding }) => {
                    let iconName;
                    if (route.name == 'Explore') {
                        iconName = focused ? 'search' : 'search-outline';
                    } else if (route.name == 'My Library') {
                        iconName = focused ? 'book' : 'book-outline';
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
        >
            <Tab.Screen name="Profile" component={ProfileStack} />
            <Tab.Screen name="Explore" component={ExploreStack} />
            <Tab.Screen name="My Library" component={MyLibraryStack} />
        </Tab.Navigator>
    );
}
