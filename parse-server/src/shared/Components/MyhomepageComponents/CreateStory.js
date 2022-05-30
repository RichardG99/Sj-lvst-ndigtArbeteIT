import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Parse from '../../common';

const newStoryButtonStyle = {
  fontSize: '16px',
  margin: '1em auto',
  height: '2em',
  display: 'block',
  backgroundColor: 'white',
  background: 'none',
  borderRadius: '6px',
  border: '1px solid lightgrey',
  boxShadow: '1px 1px 2px rgba(0,0,0, 0.1)',
  cursor: 'pointer',
};


function parseCreateNewStory() {
  return new Promise((resolve, reject) => {
    const StoryObj = Parse.Object.extend('Story');
    const newStory = new StoryObj();

    const user = Parse.User.current();
    const username = user.get('username');

    newStory.set('author', username);
    newStory.set('title', 'Untitled');
    newStory.set('desc', '');
    newStory.set('startingBoxId', 'noStartingBoxYet');
    newStory.save().then((story) => {
      const storyId = story.id;
      resolve(storyId);
    }, (error) => {
      reject(error);
    });
  });
}

class CreateStory extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      redirect: false,
    };
  }

  handleClick() {
    const user = Parse.User.current();
    const tmpProps = this.props;
    if (user) {
      parseCreateNewStory().then((storyId) => {
        tmpProps.setCurrentStory(storyId);
        this.setState(() => ({ redirect: true }));
      });
    } else {
      alert('You must log in first');
    }
  }

  render() {
    const tmpState = this.state;
    if (tmpState.redirect) {
      console.log("ceate")
      return <Redirect to="/editstory" />;
    }

    return (
      <button
        type="button"
        style={newStoryButtonStyle}
        onClick={this.handleClick}
      >
        Create a New Story
      </button>
    );
  }
}
CreateStory.propTypes = {
  setCurrentStory: PropTypes.func.isRequired,
};

export default CreateStory;
