import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Platform, ScrollView, TextInput, RecyclerViewBackedScrollViewBase } from 'react-native';
import { Button, Input } from 'react-native-elements'
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
      username: null,
      password: null
    }
  }
  componentDidMount(){
    //this.authenticate();
  } 
  login = () => {
    console.log(this.state.username, this.state.password);
    Parse.User.logIn(this.state.username, this.state.password);
  }
  logout = async () => {
    Parse.User.logOut();
  }
  //TODO: remove hard coded user and replace with a user that is logged in
  authenticate ()  {
    return new Promise((resolve,reject) => {
      Parse.User.currentAsync.then((user) => {
        if (!user) {
          console.log("Logging in as ", this.state.username, " with the password ", this.state.password);
          Parse.User.logIn(this.state.username, this.state.password);
        } else {
          console.log(user);
        }
        resolve(user);
      },
      (error) => { reject(error) }
      );
    })
  }
  // Debugging function -- Helps a lot ฅ^•ﻌ•^ฅ
  LogItAll = async () => {
    console.log(Parse.User.currentAsync())
    console.log("Hello world Home.js")
  }
  render() {
    return (
    <View style={styles.container}>
      <Input placeholder="Username"
        onChangeText={(value) => this.setState({username: value})}
      />
      <Input placeholder="Password" secureTextEntry={true}
        onChangeText={(value) => this.setState({password: value})}
        />
      <Button
        style={styles.button}
        title="Login"
        type="clear"
        //icon={{name: 'cloud'}}
        onPress={() => this.authenticate().then( () => this.props.navigation.navigate('Home'),
        (error) => console.log("Login failed"))}
      />
      <Button
        style={styles.button}
        title="Create Account"
        type="clear"
        //icon={{name: 'cloud'}}
        onPress={() => this.props.navigation.navigate('AddUser')}
      />
      {
        this.debugging ?
        <Button 
          title='Log from Login.js'
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