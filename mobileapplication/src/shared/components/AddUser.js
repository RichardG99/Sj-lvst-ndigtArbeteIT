import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    ScrollView,
    TextInput,
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
            username: '',
            password: '',
            passAgain: '',
            email: '',
            firstName: '',
            lastName: '',
            errorMsg: '',
        };
    }
    componentDidMount() {}
    // Debugging function -- Helps a lot ฅ^•ﻌ•^ฅ
    LogItAll = async () => {
        console.log(Parse.User.currentAsync());
        console.log('Hello world Home.js');
    };
    validateAndLogin() {
        const state = this.state;
        return new Promise((resolve, reject) => {
            if (state.password === '') {
                reject('Password is empty');
            }
            if (!(state.password === state.passAgain)) {
                reject('Passwords do not match');
            }
            const user = new Parse.User();
            user.set('username', state.username);
            user.set('password', state.password);
            user.set('email', state.email);
            user.set('firstName', state.firstName);
            user.set('lastName', state.lastName);
            user.signUp()
                .then(() => {
                    console.log(`Success, welcome ${state.username}`);
                    resolve();
                })
                .catch((error) => {
                    console.log(`Error ${error.code} ${error.message}`);
                    reject(error);
                });
        });
    }
    resetForm() {
        this.setState({
            username: '',
            password: '',
            passAgain: '',
            email: '',
            firstName: '',
            lastName: '',
            errorMsg: '',
        });
    }
    render() {
        return (
            <View style={styles.containerDefault}>
                <Input
                    placeholder="First name"
                    name="firstName"
                    onChangeText={(value) =>
                        this.setState({ firstName: value })
                    }
                />
                <Input
                    placeholder="Last name"
                    name="lastName"
                    onChangeText={(value) => this.setState({ lastName: value })}
                />
                <Input
                    placeholder="Email"
                    name="email"
                    onChangeText={(value) => this.setState({ email: value })}
                />
                <Input
                    placeholder="Username"
                    name="username"
                    onChangeText={(value) => this.setState({ username: value })}
                />
                <Input
                    placeholder="Password"
                    secureTextEntry={true}
                    name="password"
                    onChangeText={(value) => this.setState({ password: value })}
                />
                <Input
                    placeholder="Repeat password"
                    secureTextEntry={true}
                    name="passAgain"
                    onChangeText={(value) =>
                        this.setState({ passAgain: value })
                    }
                />
                <Text name="errorMsg" value={this.errorMsg} color="red" />
                <Button
                    style={styles.button}
                    title="Create account"
                    type="clear"
                    onPress={() =>
                        this.validateAndLogin().then(
                            () => this.props.navigation.navigate('Home'),
                            (error) => {
                                console.log(error);
                                this.errorMsg = error;
                            }
                        )
                    }
                />
                <Button
                    style={styles.button}
                    type="clear"
                    title="Reset form"
                    onPress={() => this.resetForm()}
                />
                {this.debugging ? (
                    <Button title="Log from Home.js" onPress={this.LogItAll} />
                ) : (
                    <View />
                )}
            </View>
        );
    }
}
