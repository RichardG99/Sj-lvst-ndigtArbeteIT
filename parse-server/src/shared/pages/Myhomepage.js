import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Parse from '../common';
import styles from '../styles';
import HomeBox from '../Components/MyhomepageComponents/HomeBox';
import MyStories from '../Components/MyhomepageComponents/MyStories';

function Myhomepage(props) {
  const { authenticate } = props;
  const { loggedIn } = props;
  const { setCurrentStory } = props;
  if (!loggedIn) {
    return <Redirect to="/loginpage" />;
  }
  const user = Parse.User.current();
  const firstName = user.get('firstName');
  //console.log("firstName: ", firstName);
  return (
    <div style={styles.wrapper}>
      <h2 style={styles.h3}>hej {firstName}!</h2>
      <MyStories setCurrentStory={setCurrentStory} />
      <HomeBox
        setCurrentStory={setCurrentStory}
        authenticate={authenticate}
        loggedIn={loggedIn}
      />  
    </div>
  );
}
Myhomepage.propTypes = {
  authenticate: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  setCurrentStory: PropTypes.func.isRequired,
};

export default Myhomepage;
