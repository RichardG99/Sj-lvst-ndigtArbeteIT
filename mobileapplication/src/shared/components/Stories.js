import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Platform,
    ScrollView,
    FlatList,
    Item,
    TouchableOpacity,
    Alert,
} from 'react-native';
import Constants from 'expo-constants';
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native';
import '../common.js';
import settings from '../settings.js';
import { styles } from '../stylesheets/StyleSheet';
import Explore from './Explore.js';

function Story({ story, selectedStory, storyCategory }) {
    return (
        <View style={styles.story}>
            <TouchableOpacity onPress={() => selectedStory(story)}>
                <Text style={styles.title}>{story.get('title')}</Text>
                <Text style={styles.by}>by</Text>
                <Text style={styles.author}>{story.get('author')}</Text>
                <Text style={styles.author}>{storyCategory}</Text>
            </TouchableOpacity>
        </View>
    );
}
export default class Stories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: [],
            authenticated:false,
            storyCategory: this.props.route.params.storyCategory,
        }
    }

    componentDidMount(){
        this.isSubscribed();
        this.getStories();
    }

    isSubscribed = async () => {
        const user = Parse.User.current()
        const stripeId = user.get("stripeId");
        if(!stripeId) {
            console.log("customer is not a stripe user")
            return;
        }
        console.log("current Stripe user: " + stripeId)
        const {subscriptions} = await fetch("http://" + settings.serverURL+ ":" + settings.serverPort+'/authenticate', { // TODO: DET KAN INTE VARA HTTP HÅRDKODAT
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              customerId: stripeId
            }),
          }).then(r => r.json()).
          catch((err) => {console.log(err)});
          const status = subscriptions.data[0].status
          console.log("current status: " + subscriptions.data[0].status)
          if (status == "active" || status == "canceled") {
              this.state.authenticated = true;
              console.log("customer is subscribed")
              console.log(this.state.authenticated)
              return;
          }
    }

    // Empty comment
    getStories = () => {
        console.log('storyCategory: ' + this.state.storyCategory);
        const Story = Parse.Object.extend('Story');
        const query = new Parse.Query(Story);
        if (this.state.storyCategory != '') {
            query.equalTo('category', this.state.storyCategory);
        }
        query.limit(1000); // TODO :limits the amount of stories we can fetch, might want a way to make this uncapped.
        query.find().then((stories) => {
            console.log('antal stories: ' + stories.length);
            this.setState({ stories: stories });
        });
    };

    selectedStory = (story) => {
        this.addToUsersLibrary(story);
    };

    

    addToUsersLibrary = (story) => {
      if (this.state.authenticated == false){
        console.log("Customer is not subscribed")
        // TODO: ADD ALERT FOR NOT SUBSCRIBED
        return
      }
        Parse.User.currentAsync().then((user) => {
            let myLibrary = user.get('myLibrary');
            if (myLibrary === undefined) {
                user.set('myLibrary', []);
                myLibrary = user.get('myLibrary');
            }
            console.log('here iasdnit', myLibrary, myLibrary.length);
            for (let i = 0; i < myLibrary.length; i++) {
                let libraryStory = myLibrary[i].story;
                if (libraryStory.id == story.id) {
                    return;
                }
            }
            let newStory = {
                story: story,
                currentBoxId: story.get('startingBoxId'),
                timeStamp: 0,
            };
            user.add('myLibrary', newStory);
            user.save();
            // TODO: ADD ALERT FOR ADDITION TO LIBRARY
            //this.props.navigation.navigate('My Library');
        });
    };

    render() {
        return (
            <View style={styles.containerConst}>
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
                            storyCategory={this.state.storyCategory}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
        );
    }
}
