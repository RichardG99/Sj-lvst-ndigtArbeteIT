import 'react-native-gesture-handler';
import React from 'react';
import StackNavigation from './src/shared/navigators/StackNavigation';
import * as Font from 'expo-font';

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
            fontLoaded: false,
        };
    }
    async componentDidMount() {
        await Font.loadAsync({
            Pacifico: require('./src/shared/assets/fonts/Pacifico-Regular.ttf'),
            PTSans: require('./src/shared/assets/fonts/PTSans-Regular.ttf'),
            InterRegular: require('./src/shared/assets/fonts/Inter-Regular.ttf'),
            InterSemiBold: require('./src/shared/assets/fonts/Inter-SemiBold.ttf'),
            Lato: require('./src/shared/assets/fonts/Lato-Regular.ttf'),
            //Roboto_Mono: require('./src/shared/assets/fonts/RobotoMono-Italic-VariableFont_wght.ttf'),
        });
        this.setState({ fontLoaded: true });
    }
    // Debugging function -- Helps a lot ฅ^•ﻌ•^ฅ
    LogItAll = async () => {};

    render() {
        if (this.state.fontLoaded) {
            return <StackNavigation />;
        } else {
            return null;
        }
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
*/
