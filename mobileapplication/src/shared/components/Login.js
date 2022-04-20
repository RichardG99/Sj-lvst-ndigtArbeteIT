import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    ScrollView,
    TextInput,
    RecyclerViewBackedScrollViewBase, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Input } from 'react-native-elements';
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native';
import Game from './Game.js';
import '../common.js';
import { styles } from '../stylesheets/StyleSheet';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { Capriola_400Regular } from '@expo-google-fonts/capriola';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

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
            <View style={styles.splashBackground}>
                    <View style={[styles.ellips1, styles.ellips3]}>               
                    </View>
                    <View style={[styles.ellips2, styles.ellips4]}>               
                    </View>                  
                    <Text style={[styles.splashTitle, styles.loginTitle]}>
                        Augmented Audio
                        </Text>
                <View >
                <View style={{padding: (0, 20, 0, 20)}}>

                <Input
                    inputStyle={{marginLeft: 15}}
                    containerStyle={{marginTop: 270, padding: 5}}
                    placeholder='Username'
                    leftIcon={
                      <Icon
                      containerStyle={{marginBottom: 1}}
                        name='user'
                        size={24}
                        color='white'
                      />
                    }
                    onChangeText={(value) => this.setState({ username: value })}
                />
                <Input
                    inputStyle={{marginLeft: 15}}
                    containerStyle={{marginBottom: 200, padding: 1}}
                    placeholder='Password'
                    leftIcon={
                        <Icon
                        name='lock'
                        size={24}
                        color='white'
                        />
                    }
                    secureTextEntry={true}
                    onChangeText={(value) => this.setState({ password: value })}
                />
                </View>
                <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={() => {
                        this.login();
                    }}>
                    <Text style={styles.loginText}> Login </Text>
                    </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.buttonLogin, styles.buttonAccount]}
                    onPress={() => 
                    this.props.navigation.navigate('AddUser')}>
                    <Text style={styles.loginText}>Create Account</Text>
                    
                    </TouchableOpacity>
                    
                </View>
                
                {this.debugging ? (
                    <Button title="Log from Login.js" onPress={this.LogItAll} />
                ) : (
                    <View />
                )}
            
            </View>
        );
    }
}
