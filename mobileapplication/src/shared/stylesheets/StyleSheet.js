import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

//const tabSheetColor = 'rgba(255, 255, 255, 0.6)';
//const mainTextColor = '#FFDB21';
//const secondaryTextColor = 'black';
const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth / 2 - 30;

export const styles = StyleSheet.create({
    // Bottom Bar
    tabBar: {
        shadowOffset: { width: 2, height: 4 },
        shadowRadius: 3,
        shadowOpacity: 0.2,
        shadowColor: '#000',
        alignItems: 'center',
    },

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

    //Splash
    splashTitle: {
        position: 'absolute',
        width: 318,
        height: 60,
        left: 36,
        top: 341,

        fontFamily: 'Pacifico-Regular',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 30,
        lineHeight: 50,
        /* or 57px */
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
        letterSpacing: -0.41,
        color: '#FF9900',
        shadowOpacity: 0.5,
        shadowColor: 'white',
    },
    splashBackground: {
        backgroundColor: '#00082F',
        flex: 1,
    },

    ellips1: {
        //top left corner
        position: 'absolute',
        width: 318,
        height: 297,
        left: -123,
        top: -90,
        borderRadius: 10000,
        backgroundColor: '#001458',
    },
    ellips2: {
        //bottom right corner
        position: 'absolute',
        width: 360,
        height: 323,
        left: 136,
        top: 555,
        borderRadius: 10000,
        backgroundColor: '#420196',
    },

    //Login

    loginTitle: {
        left: 36,
        top: 100,
    },

    containerDefault: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLogin: {
        position: 'absolute',
        width: 244,
        height: 33,
        left: 73,
        top: 471,
        shadowColor: '#fff',
        backgroundColor: '#506BC8',
        borderRadius: 10,
    },
    buttonAccount: {
        left: 75,
        top: 519,
    },

    loginText: {
        position: 'absolute',
        width: 150,
        height: 40,
        left: 44,
        top: 6,
        fontFamily: 'Pacifico-Regular',
        fontStyle: 'italic',
        fontSize: 17,
        /* or 30px */
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
        letterSpacing: -0.41,
        color: '#FF9900',
    },

    ellips3: {
        //top left corner
        position: 'absolute',
    },

    ellips4: {
        //bottom right corner
        position: 'absolute',
    },

    // Marketplace
    buttons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxHeight: '100%',
        alignItems: 'center',
    },
    flatlist: {
        marginBottom: 150,
        paddingBottom: 100,
    },
    categoryButton: {
        width: 150,
        height: 100,
        marginHorizontal: 7,
        marginBottom: '6%',
        //Dropshadow
        shadowOffset: { width: 2, height: 4 },
        shadowRadius: 3,
        shadowOpacity: 0.2,
        shadowColor: '#000',
    },
    categoryText: {
        paddingHorizontal: 15,
        position: 'relative',
        marginTop: 75,
        //fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 20,
        color: '#fff',
        textAlign: 'left',
    },
    categoryTitle: {
        position: 'absolute',
        marginTop: 1,
        width: 299,
        height: 150,
        left: 10,
        //fontFamily: 'Noto Sans Kannada UI',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 32,
        lineHeight: 80,
        /* or 48px */
        flex: 1,
        alignItems: 'center',
        textAlign: 'left',
        letterSpacing: -0.41,
    },
    categoryTitle1: {
        marginTop: 160,
    },
    categoryTitle2: {
        marginTop: 155,
    },

    searchBarInput: {
        backgroundColor: '#C4C4C4',
    },
    searchBarCont: {
        backgroundColor: '#AAAAAA',
        borderColor: '#000',
    },
    allCategories: {
        paddingHorizontal: 5,
        paddingVertical: 60,
        width: screenWidth * 0.82,
        left: 10,
        height: 100,
        //backgroundColor: 'blue',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 60,
        minWidth: '96%',
        //Dropshadow
        shadowOffset: { width: 2, height: 4 },
        shadowRadius: 3,
        shadowOpacity: 0.2,
        shadowColor: '#000',
    },
    allCategories1: {
        marginTop: 50,
        marginBottom: 60,
    },
    //Profile

    profileTitle:{
        position: 'absolute',
        width: 201,
        height: 60,
        left: 94,
        top: 60,

        fontFamily: 'Pacifico-Regular',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 30,
        lineHeight: 50,
        /* or 57px */
        //flex: 1,
        alignItems: 'center',
        textAlign: 'center',
        letterSpacing: -0.41,
        color: '#FF9900',
        shadowOpacity: 0.5,
        shadowColor: 'white',
        //backgroundColor: 'red',
    },

    editpButton: {
        width: 244,
        height: 33,
        left: 73,
        top: 80,
    },

    editeButton: {
        width: 244,
        height: 33,
        left: 73,
        top: 130,
    },

    logoutButton: {
        width: 244,
        height: 33,
        left: 73,
        top: 180,
    },

//AddUser

    createAccountButton: {
        top: 550,
    },

    resetFormButton: {
        top: 600,
    },

// Edit Password

    changeButton: {
        top: 450,
    },

    resetButton: {
        top: 500,
    },
});
