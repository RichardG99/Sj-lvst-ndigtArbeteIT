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
    buttons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 15,
        maxHeight: '100%',
    },
    flatlist: { flexGrow: 1 },

    categoryButton: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: 'blue',
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginHorizontal: '2%',
        marginBottom: '4%',
        minWidth: '46%',
        //Dropshadow
        shadowOffset: { width: 2, height: 4 },
        shadowRadius: 3,
        shadowOpacity: 0.2,
        shadowColor: '#000',
    },
    categoryText: {
        position: 'relative',
        marginTop: 80,
        marginLeft: 10,
        //fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 19,
        color: '#fff',
    },
    categoryTitle: {
        position: 'absolute',
        width: 299,
        height: 150,
        left: 45,
        top: 45,

        //fontFamily: 'Noto Sans Kannada UI',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 32,
        lineHeight: 150,
        /* or 48px */
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
        letterSpacing: -0.41,
    },
    searchBarInput: {
        backgroundColor: '#C4C4C4',
    },
    searchBarCont: {
        backgroundColor: '#AAAAAA',
        borderColor: '#AAAAAA',
    },
    allCategories: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: 'blue',
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginHorizontal: '2%',
        marginTop: 90,
        minWidth: '95%',
        //Dropshadow
        shadowOffset: { width: 2, height: 4 },
        shadowRadius: 3,
        shadowOpacity: 0.2,
        shadowColor: '#000',
    },
});
