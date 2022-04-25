import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/Home.js';
import Stories from '../components/Stories.js';
import Marketplace from '../components/Marketplace.js';
import Game from '../components/Game.js';
import Horror from '../components/Horror.js';
import AddUser from '../components/AddUser.js';
import Splash from '../components/Splash.js';


const Stack = createStackNavigator();

function MarketplaceStack() {
    return (
        <Stack.Navigator screenOptions={{ header: () => null }}>
            <Stack.Screen name="Marketplace" component={Marketplace} />
            <Stack.Screen name="AddUser" component={AddUser} />
            <Stack.Screen name="Stories" component={Stories} />
            <Stack.Screen name="Game" component={Game} />
            <Stack.Screen name="Horror" component={Horror} />
            <Stack.Screen name="Splash" component={Splash} />

        </Stack.Navigator>
    );
}

export default MarketplaceStack;
