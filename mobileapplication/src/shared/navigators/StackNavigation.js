import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import Login from '../components/Login.js';
import AddUser from '../components/AddUser.js';
import TabNavigation from './TabNavigation.js';
import ProfileStack from './TabNavigation.js';

const Stack = createStackNavigator();

function LoginStack() {
    return (
        <Stack.Navigator screenOptions={{ header: () => null }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Profile" component={ProfileStack} />
            <Stack.Screen name="AddUser" component={AddUser} />
        </Stack.Navigator>
    );
}

export default function StackNavigation() {
    return (
        <NavigationContainer>
            <StatusBar barStyle="light-content" />
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{ header: () => null }}
            >
                <Stack.Screen name="Login" component={LoginStack} />
                <Stack.Screen name="Home" component={TabNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
