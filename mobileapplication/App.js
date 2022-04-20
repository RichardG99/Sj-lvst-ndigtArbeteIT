import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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
import * as Font from 'expo-font';
import Login from "./src/shared/components/Login.js";
import AddUser from "./src/shared/components/AddUser.js";
import Game from "./src/shared/components/Game.js";
import Home from "./src/shared/components/Home.js";
import Stories from "./src/shared/components/Stories.js";
import MyLibrary from "./src/shared/components/MyLibrary.js";
import EditProfile from "./src/shared/components/EditProfile.js";
import EditPassword from "./src/shared/components/EditPassword.js";
import Splash from "./src/shared/components/Splash.js";
import Marketplace from './src/shared/components/Marketplace.js';
import Horror from './src/shared/components/Horror.js';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.debugging = false;
    }
    
    // Debugging function -- Helps a lot ฅ^•ﻌ•^ฅ
    LogItAll = async () => {
  }
/* --------------------------------------Audio / voice functionality------------------------------ */


  render() {
    
    return (

      <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AddUser" component={AddUser} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Stories" component={Stories} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="My Library" component={MyLibrary} />
        <Stack.Screen name="Edit Profile" component={EditProfile} />
        <Stack.Screen name="Edit Password" component={EditPassword} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Marketplace" component={Marketplace} />
      </Stack.Navigator>
    </NavigationContainer>
    )
  }
}

const Stack = createStackNavigator();

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
