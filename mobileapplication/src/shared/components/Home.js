import React from 'react';
import { StyleSheet, Text, View, Platform, ScrollView, TextInput } from 'react-native';
import {asyncStorage} from '@react-native-async-storage/async-storage'
import {Button} from 'react-native-elements'
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native'
import Game from "./Game.js";
import '../common.js'
export default class Home extends React.Component {
  constructor(props){
    super(props)
    this.allStories = []; 
    this.myStories = [];
    this.debugging = false;
    this.state = {
      activeStory: null,// ID of current story that you're listening to.
      activeStoryBoxID: "tmp",
      loggedIn: true,
      username: "",
    }
    this.logout=this.logout.bind();
  }
  componentDidMount(){
    this.authenticate();
  } 
  logout = async () => {
    Parse.User.logOut();
    this.props.navigation.navigate('Login');
  }
  authenticate = async () => {
    Parse.User.currentAsync().then((user) => {
      if (!user) {
        this.props.navigation.navigate('Login')
      } else {
        this.setState( {username: user.get('username')});
      }
    });
  }
  // Debugging function -- Helps a lot ฅ^•ﻌ•^ฅ
  LogItAll = async () => {
    console.log(Parse.User.currentAsync())
    console.log("Hello world Home.js")
  }
  render() {
    return (
    <View style={styles.container}>
      <Text h3
        title={"Hello ", this.state.username}
      />
      <Button
        style={styles.button}
        title="Find new stories"
        type="clear"
        icon={{name: 'cloud'}}
        onPress={() => this.props.navigation.navigate('Stories')}
      />
      <Button
        style={styles.button} 
        icon={{name: 'folder'}}
        type="clear"
        title="Go to My Library"
        onPress={() => this.props.navigation.navigate('My Library')}
      />
      <Button
        style={styles.button}
        type="clear"
        title="Edit profile"
        onPress={() => this.props.navigation.navigate('Edit Profile')}
      />
      <Button
        style={styles.button}
        type="clear"
        title="Edit password"
        onPress={() => this.props.navigation.navigate('Edit Password')}
      />
      <Button
        style={styles.button} 
        type="clear"
        title="Logout"
        onPress={() => this.logout() }
      />
      {
        this.debugging ?
        <Button 
          title='Log from Home.js'
          onPress={this.LogItAll}
        />
        : 
        <View />
      }
      
    </View> 
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
  }
});