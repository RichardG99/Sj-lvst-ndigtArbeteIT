import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

//const tabSheetColor = 'rgba(255, 255, 255, 0.6)';
//const mainTextColor = '#FFDB21';
//const secondaryTextColor = 'black';

export const styles = StyleSheet.create({
    // App
    containerDefault: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Home
    containerDefault: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        padding: 10,
    },

    // My Library
    containerConst: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: Constants.statusBarHeight,
    },
    story: {
        backgroundColor: 'lightblue',
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
    },

    // Add User

    containerDefault: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        padding: 10,
    },

    // Edit Password
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        padding: 10,
    },
    statusStyle: {
        margin: '1em 0',
        color: 'red',
    },

    // Edit Profile
    containerDefault: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        padding: 10,
    },

    // Game
    containerDefault: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        padding: 10,
    },
    titleSmall: {
        fontSize: 18,
        color: 'white',
    },
    headerSmall: {
        fontSize: 18,
        color: 'grey',
    },
    titleLarge: {
        fontSize: 32,
        color: 'white',
    },
    headerLarge: {
        fontSize: 32,
        color: 'grey',
    },
    author: {
        fontSize: 32,
        color: 'grey',
    },

    // Login
    containerDefault: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        padding: 10,
    },

    //Stories
    containerConst: {
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
    },

    // Marketplace
    category: {
        position: 'absolute',
        width: 150,
        height: 105,
        left: 37,
        top: 220,
        backgroundColor: '#000',
        //filter: drop-shadow(0 4 4 rgba(0, 0, 0, 0.25)),
        borderRadius: 5,
    },
    box: {
        width: 150,
        height: 105,
        borderColor: 'red',
        borderWidth: 2,
    },
});
