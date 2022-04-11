import React from 'react';
import { StyleSheet, View } from 'react-native';
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
            <View style={styles.containerDefault}>
                <Input
                    placeholder="First name"
                    value={this.state.firstName}
                    name="firstName"
                    onChangeText={(value) =>
                        this.setState({ firstName: value })
                    }
                />
                <Input
                    placeholder="Last name"
                    value={this.state.lastName}
                    name="lastName"
                    onChangeText={(value) => this.setState({ lastName: value })}
                />
                <Input
                    placeholder="Email"
                    value={this.state.email}
                    name="email"
                    onChangeText={(value) => this.setState({ email: value })}
                />
                <Button
                    style={styles.button}
                    title="Update profile"
                    type="clear"
                    onPress={() => this.saveData()}
                />
                <Button
                    style={styles.button}
                    type="clear"
                    title="Reset profile"
                    onPress={() => this.resetForm()}
                />
            </View>
        );
    }
}
