import 'react-native-gesture-handler';
import React from 'react';

import Navigation from './src/shared/navigators/StackNavigation';
import UserContext from './src/shared/UserContext';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.debugging = false;
    }

    // Debugging function -- Helps a lot ฅ^•ﻌ•^ฅ
    LogItAll = async () => {};
    /* --------------------------------------Audio / voice functionality------------------------------ */

    render() {
        return <Navigation />;
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
