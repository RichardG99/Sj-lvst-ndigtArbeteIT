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
    Dimensions,
} from 'react-native';
import Constants from 'expo-constants';
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native';
import '../common.js';
import { styles } from '../stylesheets/StyleSheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenHeight = Dimensions.get('window').height;

function Story({ myStory, selectedStory }) {
    return (
        <>
            <View style={styles.story}>
                <TouchableOpacity onPress={() => selectedStory(myStory)}>
                    <Text style={styles.title}>
                        {myStory.story.get('title')}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.by}>by</Text>
                        <Text style={styles.author}>
                            {myStory.story.get('author')}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default class MyLibrary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myStories: [],
        };
    }
    componentDidMount() {
        this.getMyStories();
    }

    getMyStories = () => {
        console.log('getting stories!');
        Parse.User.currentAsync().then((user) => {
            let myLibrary = user.get('myLibrary');
            this.setState({ myStories: myLibrary });
        });
    };
    selectedStory = (myStory) => {
        this.props.navigation.navigate('Game', {
            storyTitle: myStory.story.get('title'),
            activeStoryId: myStory.story.id,
            currentBoxId: myStory.currentBoxId,
            currentTime: myStory.timeStamp,
        });
    };
    render() {
        return (
            <SafeAreaView style={styles.splashBackground}>
                <View style={[styles.ellips1, styles.ellips3]}></View>
                <View style={[styles.ellips2, styles.ellips4]}></View>
                <TouchableOpacity
                    onPress={console.log('refresh')}
                    //TODO: Refresh stories on press
                    style={styles.refreshButton}
                >
                    <Ionicons name={'reload'} color={'white'} size={25} />
                </TouchableOpacity>
                <Text style={[styles.categoryTitle, styles.mainTitles]}>
                    Select Story
                </Text>
                <View>
                    <FlatList
                        style={{ marginTop: 30, height: screenHeight * 0.65 }}
                        data={this.state.myStories}
                        renderItem={({ item }) => (
                            <Story
                                id={item.story.id}
                                myStory={item}
                                selectedStory={this.selectedStory}
                            />
                        )}
                        keyExtractor={(item) => item.story.id}
                    />
                </View>
            </SafeAreaView>
        );
    }
}
