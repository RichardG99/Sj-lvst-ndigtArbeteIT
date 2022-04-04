import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, Button, Platform, ScrollView, FlatList, Item, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native';
import '../common.js';

function Story({ myStory, selectedStory }) {
  return (
    <View style={styles.story}>
      <TouchableOpacity onPress={() => selectedStory(myStory)}>
          <Text style={styles.title}>{myStory.story.get('title')}</Text>
          <Text style={styles.by}>by</Text>
          <Text style={styles.author}>{myStory.story.get('author')}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default class MyLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myStories: [],
    }
  }
  componentDidMount() {
    this.getMyStories();
  }

  getMyStories = () => {
    console.log("getting stories!");
    Parse.User.currentAsync().then((user) => {
      let myLibrary = user.get("myLibrary");
      this.setState({myStories: myLibrary});
    })
  }
  selectedStory = (myStory) => {
    this.props.navigation.navigate('Game', {
      storyTitle: myStory.story.get("title"),
      activeStoryId: myStory.story.id,
      currentBoxId: myStory.currentBoxId,
      currentTime: myStory.timeStamp
    })
  }
  render() {
    return(
      <View>
        <Text>Select Story to Play</Text>
        <FlatList
          data={this.state.myStories}
          renderItem={({ item }) => (
          <Story
              id={item.story.id}
              myStory={item}
              selectedStory={this.selectedStory}
          />
          )}
          keyExtractor={item => item.story.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: Constants.statusBarHeight,
  },
  story: {
    backgroundColor: 'lightgrey',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  pageTitle: {
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
  },
  by: {
    fontSize: 32,
    color: 'grey',
  },
  author: {
    fontSize: 32,
    color: 'white',
  }
});