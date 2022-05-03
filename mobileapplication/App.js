import 'react-native-gesture-handler';
import React from 'react';

import StackNavigation from './src/shared/navigators/StackNavigation';
import UserContext from './src/shared/UserContext';
import { StatusBar, View } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Login from './src/shared/components/Login';
import Profile from './src/shared/components/Profile';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.debugging = false;
        this.state = {
            activeStory: null, // ID of current story that you're listening to.
            activeStoryBoxID: 'tmp',
            loggedIn: true,
            username: null,
            password: null,
        };
    }
    // Debugging function -- Helps a lot ฅ^•ﻌ•^ฅ
    LogItAll = async () => {};
    /* --------------------------------------Audio / voice functionality------------------------------ */

    render() {
        /*         if (!this.state.loggedIn) {
            return <Login />;
        } */
        return <StackNavigation />;
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


<NavigationContainer>
      <Stack.Navigator initialRouteName="AddUser">
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

*/
