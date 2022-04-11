import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Parse from 'parse/react-native';
import { styles } from '../stylesheets/StyleSheet';

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
            <View style={styles.container}>
                <Input
                    placeholder="Enter current password"
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
                    placeholder="Repeat password"
                    secureTextEntry={true}
                    name="repeatPassword"
                    onChangeText={(value) =>
                        this.setState({ repeatPassword: value })
                    }
                />
                <Button
                    style={styles.button}
                    title="Change password"
                    type="clear"
                    onPress={() => this.saveData()}
                />
                <Button
                    style={styles.button}
                    type="clear"
                    title="Reset changes"
                    onPress={() => this.resetForm()}
                />
            </View>
        );
    }
}

//          <Text name="errorMsg" value={this.statusText} style={styles.statusStyle} />
