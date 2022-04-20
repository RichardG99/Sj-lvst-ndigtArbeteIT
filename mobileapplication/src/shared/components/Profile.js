import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native';
import '../common.js';
import { styles } from '../stylesheets/StyleSheet';
import { NavigationContainer } from '@react-navigation/native';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.allStories = [];
        this.myStories = [];
        this.debugging = false;
        this.state = {
            activeStory: null, // ID of current story that you're listening to.
            activeStoryBoxID: 'tmp',
            loggedIn: true,
            username: '',
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
            <View style={styles.containerDefault}>
                <Text h3 title={('Hello ', this.state.username)} />
                <Button
                    style={styles.button}
                    type="clear"
                    title="Edit profile"
                    onPress={() =>
                        this.props.navigation.navigate('Edit Profile')
                    }
                />
                <Button
                    style={styles.button}
                    type="clear"
                    title="Edit password"
                    onPress={() =>
                        this.props.navigation.navigate('Edit Password')
                    }
                />
                <Button
                    style={styles.button}
                    type="clear"
                    title="Logout"
                    onPress={() => this.logout()}
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
