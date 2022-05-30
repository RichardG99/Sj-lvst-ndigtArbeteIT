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
  listStyleType: 'none',
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

const listEditButtonStyle = {
  border: '1px solid lightgrey',
  width: '70%',
  height: '100%',
  minHeight: '3em',
  boxSizing: 'border-box',
  margin: '0',
  padding: '1em',
  textAlign: 'left',
  cursor: 'pointer',
  float: 'left',
};

const listDeleteButtonStyle = {
  border: '1px solid lightgrey',
  width: '30%',
  height: '100%',
  minHeight: '3em',
  boxSizing: 'border-box',
  margin: '0',
  padding: '1em',
  textAlign: 'right',
  cursor: 'pointer',
  float: 'right',
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

/**
 * Deletes a story from the database
 * @param storyId ID of the story to delete
 */
 function parseDeleteStory(storyId) {
  return new Promise((resolve, reject) => {
    //Destroy paths related to the story
    const PathObj = Parse.Object.extend('Path');
    var pathQuery = new Parse.Query(PathObj);
    pathQuery.equalTo('storyId', storyId);
    pathQuery.find().then((paths) => {
      const pathConst = paths;
      for (let i = 0; i < pathConst.length; i++) {
        const path = pathConst[i];
        path.destroy({});
      }

      //Destroy boxes related to the story
      const BoxObj = Parse.Object.extend('Box');
      var boxQuery = new Parse.Query(BoxObj);
      boxQuery.equalTo('storyId', storyId);
      boxQuery.find().then((boxes) => {
        const boxConst = boxes;
        for (let i = 0; i < boxConst.length; i++) {
          const box = boxConst[i];
          box.destroy({});
        }

        //Finally, destroy the story object itself
        const StoryObj = Parse.Object.extend('Story');
        var storyQuery = new Parse.Query(StoryObj);
        storyQuery.get(storyId).then((story) => {
          // The story was retrieved, and should thus be destroyed
          story.destroy({}).then(()=>{
            resolve();
          }, (error)=>{
            reject(error);
          });
        }, (error) => {
          reject(error);
        });
      }, (error) => {
        reject(error);
      });
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
    this.handleDeleteStory = this.handleDeleteStory.bind(this);
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

  // TODO: Man måste väl vara inloggad för att ens kunna se dessa stories?
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
  handleDeleteStory(storyId) {
    const user = Parse.User.current();
    if (user) {
      if (confirm("Are you sure you want to delete this story?")) {
        parseDeleteStory(storyId).then(()=>{
          location.reload();
        }, (error)=>{
          alert("Something went wrong when deleting the story; try again later");
          console.log(error);
        });
      }
    } else {
      alert('You must log in first');
    }
  }

  render() {
    const tmpState = this.state;
    if (tmpState.redirect) {
      console.log("vi är här")
      return <Redirect to="/editstory" />;
    }
    const tmpProps = this.props;
    return (
      <div style={myStoriesStyle}>
        <h4 style={styles.h4}>My Stories</h4>
        <p style={smallParagrah}>- Select a story to Edit, or press the Delete button to delete it -</p>
        <ul style={listStyle}>
          {tmpState.stories.map((item) => (
            <li key={item.storyId} style={listItemStyle}>
              <div
                style={listEditButtonStyle}
                onClick={() => this.handleClickOnStory(item.storyId)}
              >
                {item.storyTitle}
              </div>
              <div
                style={listDeleteButtonStyle}
                onClick={() => this.handleDeleteStory(item.storyId)}
              >
                {"DELETE"/* TODO: We want to make this an icon or something instead */}
              </div>
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
