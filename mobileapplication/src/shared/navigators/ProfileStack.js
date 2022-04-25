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
import Profile from '../components/Profile.js';
import Splash from '../components/Splash.js';



const Stack = createStackNavigator();

function ProfileStack() {
    return (
        <Stack.Navigator screenOptions={{ header: () => null }}>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Edit Profile" component={EditProfile} />
            <Stack.Screen name="Edit Password" component={EditPassword} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="AddUser" component={AddUser} />
        </Stack.Navigator>
    );
}

//<Stack.Screen name="Login" component={Login} />

export default ProfileStack;
