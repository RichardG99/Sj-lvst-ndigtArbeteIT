import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Parse from '../../common';
import styles from '../../styles';
import CreateStory from './CreateStory';

const myStoriesStyle = {
  width: '50%',
  display: 'inline-block',
  boxSizing: 'border-box',
  float: 'left',
};

const listStyle = {
  height: '300px',
  overflow: 'hidden',
  overflowY: 'scroll',
  border: '1px solid grey',
  margin: '0',
  padding: '0',
};

const smallParagrah = {
  fontSize: '12px',
  textAlign: 'center',
  margin: '2px 0 1em 0',
};

const listItemStyle = {
  boxSizing: 'border-box',
  margin: '0',
  padding: '0',
};

const listButtonStyle = {
  border: '1px solid lightgrey',
  width: '100%',
  height: '100%',
  minHeight: '3em',
  boxSizing: 'border-box',
  margin: '0',
  padding: '1em',
  textAlign: 'center',
  cursor: 'pointer',
};


function parseGetStories() {
  return new Promise((resolve, reject) => {
    const user = Parse.User.current();
    const username = user.get('username');

    const Story = Parse.Object.extend('Story');
    const query = new Parse.Query(Story);
    query.equalTo('author', username);

    query.find().then((stories) => {
      let returnStories = [];
      for (let i = 0; i < stories.length; i += 1) {
        const story = {
          storyId: stories[i].id,
          storyAuthor: stories[i].get('author'),
          storyTitle: stories[i].get('title'),
        };
        returnStories = [...returnStories, story];
      }
      resolve(returnStories);
    }, (error) => {
      reject(error);
    });
  });
}

class MyStories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [],
      redirect: false,
    };
    this.handleClickOnStory = this.handleClickOnStory.bind(this);
  }

  componentDidMount() {
    const user = Parse.User.current();
    if (user) {
      parseGetStories().then((stories) => {
        const myStories = stories;
        this.setState(() => ({ stories: myStories }));
      });
    }
  }

  // TODO: Man måste väll vara inloggad för att ens kunna se dessa stories?
  handleClickOnStory(storyId) {
    const user = Parse.User.current();
    const tmpProps = this.props;
    if (user) {
      tmpProps.setCurrentStory(storyId);
      this.setState(() => ({ redirect: true }));
    } else {
      alert('You must log in first');
    }
  }

  render() {
    const tmpState = this.state;
    if (tmpState.redirect) {
      return <Redirect to="/editstory" />;
    }
    const tmpProps = this.props;
    return (
      <div style={myStoriesStyle}>
        <h4 style={styles.h4}>My Stories</h4>
        <p style={smallParagrah}>- Select Story to Edit -</p>
        <ul style={listStyle}>
          {tmpState.stories.map((item) => (
            <li key={item.storyId} style={listItemStyle}>
              <p
                style={listButtonStyle}
                onClick={() => this.handleClickOnStory(item.storyId)}
              >
                {item.storyTitle}
              </p>
            </li>
          ))}
        </ul>
        <CreateStory setCurrentStory={tmpProps.setCurrentStory} />
      </div>
    );
  }
}

MyStories.propTypes = {
  setCurrentStory: PropTypes.func.isRequired,
};

export default MyStories;
