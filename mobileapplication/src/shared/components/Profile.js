import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native';
import '../common.js';
import { styles } from '../stylesheets/StyleSheet';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.allStories = [];
        this.myStories = [];
        this.debugging = false;
        const user = Parse.User.current(); // wait for user to be loaded
        this.state = {
            activeStory: null, // ID of current story that you're listening to.
            activeStoryBoxID: 'tmp',
            loggedIn: true,
            username: '',
            email: user.get('email'),
            firstName: user.get('firstName'),
            lastName: user.get('lastName'),
        };
        this.logout = this.logout.bind();
    }
    componentDidMount() {
        this.authenticate();
    }
    logout = async () => {
        Parse.User.logOut();
        this.props.navigation.navigate('Login');
    };
    authenticate = async () => {
        Parse.User.currentAsync().then((user) => {
            if (!user) {
                this.props.navigation.navigate('Login');
            } else {
                this.setState({ username: user.get('username') });
            }
        });
    };
    // Debugging function -- Helps a lot ฅ^•ﻌ•^ฅ
    LogItAll = async () => {
        console.log(Parse.User.currentAsync());
        console.log('Hello world Home.js');
    };

    render() {
        return (
            <SafeAreaView style={styles.splashBackground}>
                <View styles={{ backgroundColor: 'red' }}>
                    <View style={[styles.ellips1, styles.ellips3]}></View>
                    <View style={[styles.ellips2, styles.ellips4]}></View>
                    <Text style={styles.profileTitle}>Your Profile</Text>
                    <View
                        style={{
                            marginTop: '65%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity
                            style={[styles.defaultButton, styles.editpButton]}
                            type="clear"
                            onPress={() =>
                                this.props.navigation.navigate('Edit Profile')
                            }
                        >
                            <Text style={styles.loginText}>Edit Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.defaultButton, styles.editeButton]}
                            type="clear"
                            onPress={() =>
                                this.props.navigation.navigate('Edit Password')
                            }
                        >
                            <Text style={styles.loginText}>Edit Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.defaultButton, styles.logoutButton]}
                            type="clear"
                            onPress={() => this.logout()}
                        >
                            <Text style={styles.loginText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

/*{this.debugging ? (
                    <Button title="Log from Home.js" onPress={this.LogItAll} />
                ) : (
                    <View />

                )}*/
