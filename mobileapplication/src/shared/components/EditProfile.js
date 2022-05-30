import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    SafeAreaView,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import Parse from 'parse/react-native';
import { styles } from '../stylesheets/StyleSheet';

export default class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        const user = Parse.User.current(); // wait for user to be loaded
        this.state = {
            email: user.get('email'),
            firstName: user.get('firstName'),
            lastName: user.get('lastName'),
        };
    }

    saveData() {
        const user = Parse.User.current();
        user.set('email', this.state.email);
        user.set('firstName', this.state.firstName);
        user.set('lastName', this.state.lastName);
        user.save().then(
            () => {
                this.props.navigation.navigate('Home');
            },
            (error) => {
                console.log(error);
            }
        );
    }

    resetForm() {
        const user = Parse.User.current(); // wait for user to be loaded
        this.setState({
            email: user.get('email'),
            firstName: user.get('firstName'),
            lastName: user.get('lastName'),
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.splashBackground}>
                <View style={[styles.ellips1, styles.ellips3]}></View>
                <View style={[styles.ellips2, styles.ellips4]}></View>
                <Text style={styles.profileTitle}>Edit Profile</Text>
                <View style={{ marginTop: 200 }}>
                    <Input
                        placeholder="First name"
                        value={this.state.firstName}
                        name="firstName"
                        color="white"
                        onChangeText={(value) =>
                            this.setState({ firstName: value })
                        }
                    />
                    <Input
                        placeholder="Last name"
                        value={this.state.lastName}
                        name="lastName"
                        color="white"
                        onChangeText={(value) =>
                            this.setState({ lastName: value })
                        }
                    />
                    <Input
                        placeholder="Email"
                        value={this.state.email}
                        name="email"
                        color="white"
                        onChangeText={(value) =>
                            this.setState({ email: value })
                        }
                    />
                </View>
                <TouchableOpacity
                    style={[
                        styles.buttonLogin,
                        styles.editpButton,
                        styles.changeButton,
                    ]}
                    //title="Update profile"
                    type="clear"
                    color="white"
                    onPress={() => this.saveData()}
                >
                    <Text style={styles.loginText}>Update Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.buttonLogin,
                        styles.editpButton,
                        styles.resetButton,
                    ]}
                    type="clear"
                    //title="Reset profile"
                    onPress={() => this.resetForm()}
                >
                    <Text style={styles.loginText}>Reset Profile</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}
