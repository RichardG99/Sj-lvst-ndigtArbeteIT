import React from 'react';
<<<<<<< HEAD
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, Button, Platform, ScrollView, FlatList, Item, TouchableOpacity} from 'react-native';
=======
import { StyleSheet, Text, View, Button, Platform, ScrollView, FlatList, Item, TouchableOpacity} from 'react-native';
import {AsyncStorage} from '@react-native-async-storage/async-storage'
>>>>>>> ec68d88e3cca96ae6b3bc633213680511972d982
import Constants from 'expo-constants';
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native';
import '../common.js';

function Story({ story, selectedStory }) {
    return (
      <View style={styles.story}>
        <TouchableOpacity onPress={() => selectedStory(story)}>
            <Text style={styles.title}>{story.get('title')}</Text>
            <Text style={styles.by}>by</Text>
            <Text style={styles.author}>{story.get('author')}</Text>
        </TouchableOpacity>
      </View>
    );
}

export default class Stories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: [],
        }
    }

    componentDidMount(){
        this.getAllStories();
    }

    // Empty comment 
    getAllStories = () => {
        const Story = Parse.Object.extend("Story");
        const query = new Parse.Query(Story);
        query.limit(1000); // TODO :limits the amount of stories we can fetch, might want a way to make this uncapped.
        query.find().then((stories) => {
            console.log(stories.length)
          this.setState({stories: stories});
        });
    }

    selectedStory = (story) => {
        this.addToUsersLibrary(story);
    } 

    addToUsersLibrary = (story) => {
        Parse.User.currentAsync().then((user) => {
            let myLibrary = user.get("myLibrary");
            if(myLibrary === undefined) {
                user.set("myLibrary", []);
                myLibrary = user.get("myLibrary");
            }
            console.log("here iasdnit", myLibrary, myLibrary.length);
            for(let i = 0; i < myLibrary.length; i++) {
                let libraryStory = myLibrary[i].story;
                if (libraryStory.id == story.id) {
                    return;
                }
            }
            let newStory = {
                story: story,
                currentBoxId: story.get("startingBoxId"),
                timeStamp: 0,
            }
            user.add("myLibrary", newStory);
            user.save();
            this.props.navigation.navigate("My Library");
        });
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.pageTitle}>
                    Select story to add to your library
                </Text>
                <FlatList
                    data={this.state.stories}
                    renderItem={({ item }) => (
                    <Story
                        id={item.id}
                        story={item}
                        selectedStory={this.selectedStory}
                    />
                    )}
                    keyExtractor={item => item.id}
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