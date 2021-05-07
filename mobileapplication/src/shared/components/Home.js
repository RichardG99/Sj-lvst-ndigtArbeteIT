import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Platform, ScrollView, TextInput } from 'react-native';
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
      username: 'Dreas',
      password: 'dreas'
    }
  }
  componentDidMount(){
    this.authenticate();
  } 
  login = () => {
    Parse.User.logIn(this.state.username, this.state.password);
  }
  logout = async () => {
    Parse.User.logOut();
  }
  //TODO: remove hard coded user and replace with a user that is logged in
  authenticate = async () => {
    Parse.User.currentAsync().then((user) => {
      if (!user) {
        console.log("Logging in as ", this.state.username, " with the password ", this.state.password);
        Parse.User.logIn(this.state.username, this.state.password);
      } else {
        console.log(user);
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