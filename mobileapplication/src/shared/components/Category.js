import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    FlatList,
    Dimensions,
    SectionList,
    Image,
} from 'react-native';
import Constants from 'expo-constants';
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native';
import '../common.js';
import { styles } from '../stylesheets/StyleSheet';
import { SearchBar } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

//const screenWidth = Dimensions.get('window').width;

const DATA = [
    {
        title: 'Top Stories',
        horizontal: true,
        data: [
            {
                key: '1',
                text: 'Item text 1',
                uri: 'https://picsum.photos/id/236/200/',
            },
            {
                key: '2',
                text: 'Item text 2',
                uri: 'https://picsum.photos/id/1014/200',
            },

            {
                key: '3',
                text: 'Item text 3',
                uri: 'https://picsum.photos/id/1021/200',
            },
        ],
    },
    {
        title: 'New Stories',
        horizontal: true,
        data: [
            {
                key: '1',
                text: 'Item text 1',
                uri: 'https://picsum.photos/id/1028/200',
            },
            {
                key: '2',
                text: 'Item text 2',
                uri: 'https://picsum.photos/id/1054/200',
            },

            {
                key: '3',
                text: 'Item text 3',
                uri: 'https://picsum.photos/id/1064/200',
            },
            {
                key: '4',
                text: 'Item text 4',
                uri: 'https://picsum.photos/id/1015/200',
            },
            {
                key: '5',
                text: 'Item text 5',
                uri: 'https://picsum.photos/id/1016/200',
            },
        ],
    },
    {
        title: 'Recommended',
        horizontal: true,
        data: [
            {
                key: '1',
                text: 'Item text 1',
                uri: 'https://picsum.photos/id/1014/200',
            },
            {
                key: '2',
                text: 'Item text 2',
                uri: 'https://picsum.photos/id/240/200',
            },

            {
                key: '3',
                text: 'Item text 3',
                uri: 'https://picsum.photos/id/1008/200',
            },
            {
                key: '4',
                text: 'Item text 4',
                uri: 'https://picsum.photos/id/1015/200',
            },
            {
                key: '5',
                text: 'Item text 5',
                uri: 'https://picsum.photos/id/1016/200',
            },
        ],
    },
];

const ListItem = ({ item, myStory, selectedStory }) => {
    return (
        <View style={styles.item}>
            <ImageBackground
                source={{
                    uri: item.uri,
                }}
                imageStyle={{
                    borderRadius: 10,
                }}
                style={styles.itemPhoto}
                resizeMode="cover"
            />
            <Text style={styles.itemText}>{item.text}</Text>
        </View>
    );
};

export default class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myStories: [],
            //storyCategory: this.props.route.params.storyCategory,
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
        const { search } = this.state;
        /* const renderItem = ({ item }) => (
            <Item title={item.title} image={item.image} />
        ); */

        return (
            <>
                <SafeAreaView style={{ backgroundColor: '#00082F' }}>
                    <View style={[styles.ellips1, { left: -180 }]}></View>
                    <Text style={styles.categoryTitle}>Thriller </Text>
                    <View style={[styles.flatlistView, { top: 20 }]}>
                        <SectionList
                            stickySectionHeadersEnabled={false}
                            sections={DATA}
                            keyExtractor={(item) => item.id}
                            style={styles.flatlist}
                            contentContainerStyle={{
                                //alignItems: 'center',
                                paddingHorizontal: 10,
                                paddingVertical: 10,
                                marginVertical: 30,
                            }}
                            renderSectionHeader={({ section }) => (
                                <>
                                    <Text style={styles.sectionTitles}>
                                        {section.title}
                                    </Text>
                                    {section.horizontal ? (
                                        <FlatList
                                            horizontal
                                            data={section.data}
                                            renderItem={({ item }) => (
                                                <ListItem item={item} />
                                            )}
                                            style={{ paddingVertical: 10 }}
                                            showsHorizontalScrollIndicator={
                                                false
                                            }
                                        />
                                    ) : null}
                                </>
                            )}
                            renderItem={({ item, section }) => {
                                if (section.horizontal) {
                                    return null;
                                }
                                return <ListItem item={item} />;
                            }}
                        />
                    </View>
                </SafeAreaView>
            </>
        );
    }
}
