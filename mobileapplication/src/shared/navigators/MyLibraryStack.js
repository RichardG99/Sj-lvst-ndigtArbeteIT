import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/Home.js';
import Stories from '../components/Stories.js';
import MyLibrary from '../components/MyLibrary.js';
import Splash from '../components/Splash.js';
import Game from '../components/Game.js';

const Stack = createStackNavigator();

function MyLibraryStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MyLibrary" component={MyLibrary} />
            <Stack.Screen name="Stories" component={Stories} />
            <Stack.Screen name="Game" component={Game} />
            <Stack.Screen name="Splash" component={Splash} />

        </Stack.Navigator>
    );
}

export default MyLibraryStack;
