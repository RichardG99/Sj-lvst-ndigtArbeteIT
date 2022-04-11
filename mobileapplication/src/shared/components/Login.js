import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    ScrollView,
    TextInput,
    RecyclerViewBackedScrollViewBase,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native';
import Game from './Game.js';
import '../common.js';
import { styles } from '../stylesheets/StyleSheet';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.allStories = [];
        this.myStories = [];
        this.debugging = false;
        this.state = {
            activeStory: null, // ID of current story that you're listening to.
            activeStoryBoxID: 'tmp',
            loggedIn: true,
            username: null,
            password: null,
        };
    }
    componentDidMount() {}
    login() {
        //console.log(this.state.username, this.state.password);
        //console.log("Connecting to", Parse.CoreManager.get('SERVER_URL'));
        Parse.User.logIn(this.state.username, this.state.password).then(
            () => {
                console.log(`Logged in as ${this.state.username}!`);
                this.props.navigation.navigate('Home');
            },
            (error) => {
                console.log('Login failed: ', error);
            }
        );
    }

    logout = async () => {
        Parse.User.logOut();
    };
    // Debugging function -- Helps a lot ฅ^•ﻌ•^ฅ
    LogItAll = async () => {
        console.log(Parse.User.currentAsync());
        console.log('Hello world Home.js');
    };
    render() {
        return (
            <View style={styles.containerDefault}>
                <Input
                    placeholder="Username"
                    onChangeText={(value) => this.setState({ username: value })}
                />
                <Input
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(value) => this.setState({ password: value })}
                />
                <Button
                    style={styles.button}
                    title="Login"
                    type="clear"
                    onPress={() => {
                        this.login();
                    }}
                />
                <Button
                    style={styles.button}
                    title="Create Account"
                    type="clear"
                    onPress={() => this.props.navigation.navigate('AddUser')}
                />
                {this.debugging ? (
                    <Button title="Log from Login.js" onPress={this.LogItAll} />
                ) : (
                    <View />
                )}
            </View>
        );
    }
}
