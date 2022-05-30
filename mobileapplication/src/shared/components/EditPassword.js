import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Parse from 'parse/react-native';
import { styles } from '../stylesheets/StyleSheet';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            repeatPassword: '',
            statusText: '',
        };
    }

    saveData() {
        if (this.state.newPassword === '') {
            this.setState({ statusText: 'New password cannot be empty' });
        }
        if (this.state.newPassword != this.state.repeatPassword) {
            this.setState({ statusText: 'New passwords do not match' });
        }
        const user = Parse.User.current();

        //Tries to verify the user's password, and changes it if succesful
        Parse.User.verifyPassword(
            user.getUsername(),
            this.state.oldPassword
        ).then(
            () => {
                user.setPassword(this.state.newPassword);
                user.save()
                    .then(() => {
                        this.props.navigation.navigate('Home');
                    })
                    .catch((error) => {
                        // Alert the user in case something went wrong with data saving
                        this.setState({
                            statusText: `Error ${error.code}: ${error.message}`,
                        });
                        //alert("Something went wrong when changing your password! Try again later (your password has not been changed)");
                        console.log(`Error ${error.code} ${error.message}`);
                    });
            },
            (error) => {
                //Incorrect old user password, or some other error. Log it, and inform the user that most likely they've not written the correct password
                this.setState({
                    statusText: `Error ${error.code}: ${error.message}`,
                });
                //alert("Could not verify user to server; either your old password is incorrect, or a server-side issue has occurred.");
                console.log(`Error ${error.code} ${error.message}`);
            }
        );
    }

    resetForm() {
        const user = Parse.User.current(); // wait for user to be loaded
        this.setState({
            oldPassword: '',
            newPassword: '',
            repeatPassword: '',
            statusText: '',
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.splashBackground}>
                <View style={[styles.ellips1, styles.ellips3]}></View>
                <View style={[styles.ellips2, styles.ellips4]}></View>
                <Text style={styles.profileTitle}>Edit Password</Text>

                <View style={{ marginTop: 200 }}>
                    <Input
                        placeholder="Enter Current Password"
                        secureTextEntry={true}
                        name="oldPassword"
                        onChangeText={(value) =>
                            this.setState({ oldPassword: value })
                        }
                    />
                    <Input
                        placeholder="Enter new password"
                        secureTextEntry={true}
                        name="newPassword"
                        onChangeText={(value) =>
                            this.setState({ newPassword: value })
                        }
                    />
                    <Input
                        placeholder="Repeat Password"
                        secureTextEntry={true}
                        name="repeatPassword"
                        onChangeText={(value) =>
                            this.setState({ repeatPassword: value })
                        }
                    />
                </View>
                <TouchableOpacity
                    style={[
                        styles.buttonLogin,
                        styles.editpButton,
                        styles.changeButton,
                    ]}
                    type="clear"
                    onPress={() => this.saveData()}
                >
                    <Text style={styles.loginText}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.buttonLogin,
                        styles.editpButton,
                        styles.resetButton,
                    ]}
                    type="clear"
                    onPress={() => this.resetForm()}
                >
                    <Text style={styles.loginText}>Reset Changes</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

//          <Text name="errorMsg" value={this.statusText} style={styles.statusStyle} />
