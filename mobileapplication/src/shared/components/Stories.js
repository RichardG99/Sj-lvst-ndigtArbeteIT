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
            storyCategory: this.props.route.params.storyCategory,
        };
    }

    componentDidMount() {
        this.getStories();
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
