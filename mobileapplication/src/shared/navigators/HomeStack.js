import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/Home.js';
import MyLibrary from '../components/MyLibrary.js';
import EditProfile from '../components/EditProfile.js';
import Login from '../components/Login.js';
import AddUser from '../components/AddUser.js';
import Stories from '../components/Stories.js';
import EditPassword from '../components/EditPassword.js';
import Marketplace from '../components/Marketplace.js';
import Game from '../components/Game.js';

const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Marketplace" component={Marketplace} />
            <Stack.Screen name="AddUser" component={AddUser} />
            <Stack.Screen name="Stories" component={Stories} />
            <Stack.Screen name="Game" component={Game} />
            <Stack.Screen name="Edit Password" component={EditPassword} />
            <Stack.Screen name="Edit Profile" component={EditProfile} />
        </Stack.Navigator>
    );
}

export default HomeStack;
