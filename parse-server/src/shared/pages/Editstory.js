import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Parse from '../common';
import EditingPage from '../Components/EditpageComponents/EditingPage';
import Menu from '../Components/EditpageComponents/Menu';

const backgroundBoxStyle = {
  backgroundColor: 'hsl(33, 70%, 95%)',
  width: '4400px',
};

const editStoryStyle = {
  position: 'relative',
  height: '100%',
  width: '4400px',
  background:
    'linear-gradient(to right, white 2px, transparent 1px),'
    + 'linear-gradient(to bottom, white 2px, transparent 1px),'
    + 'linear-gradient(to right, white 1px, transparent 1px),'
    + 'linear-gradient(to bottom, white 1px, transparent 1px)',
  backgroundSize: '40px 40px, 40px 40px, 20px 20px, 20px 20px',
};

/**
 * Saves general information about a story such as title and description
 * @param storyId ID of the story to save data about
 * @param storyTitle Title of the story
 * @param storyDesc Description of the story
 **/
function parseSaveStoryInfo(storyId, storyTitle, storyDesc) {
  return new Promise((resolve, reject) => {
    const Story = Parse.Object.extend('Story');
    const query = new Parse.Query(Story);

    query.get(storyId).then((story) => {
      story.set('title', storyTitle);
      story.set('desc', storyDesc);
      story.save().then(() => {
        resolve('success');
      }, (error) => {
        reject(error);
      });
    }, (error) => {
      reject(error);
    });
  });
}

/**
 * Publishes a story so users can detect it in the phone app
 * @param storyId ID of the story to publish
 */
function parsePublishStory(storyId) {
  return new Promise((resolve, reject) => {
    const Story = Parse.Object.extend('Story');
    const query = new Parse.Query(Story);

    query.get(storyId).then((story) => {
      story.set('isPublished', true);
      story.save().then(() => {
        resolve('success');
      }, (error) => {
        reject(error);
      });
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
    const Story = Parse.Object.extend('Story');
    const query = new Parse.Query(Story);

    query.get(storyId).then((story) => {
      story.destroy().then(() => {
        resolve('success');
      }, (error) => {
        reject(error);
      });
    }, (error) => {
      reject(error);
    });
  });
}

/**
 * Saves a box with given data
 * @param boxId Box ID of the box to save
 * @param boxTitle Title of the box
 * @param boxText Text the box should contain
 * @param audioURL URL to the sound file the box will play
 * @param x X-coordinate of the box in the editor
 * @param y Y-coordinate of the box in the editor
 * @param boxCommand The string-based command the box executes when it is reached
 **/
function parseSaveBox(boxId, boxTitle, boxText, audioURL, x, y, boxCommand) {  
  return new Promise((resolve, reject) => {
    const Box = Parse.Object.extend('Box');
    const query = new Parse.Query(Box);

    query.get(boxId).then((box) => {
      box.set('title', boxTitle);
      box.set('text', boxText);
      box.set('audio_url', audioURL);
      box.set('x', x);
      box.set('y', y);
      box.set('command', boxCommand);

      box.save().then(() => {
        resolve('success');
      }, (error) => {
        reject(error);
      });
    }, (error) => {
      reject(error);
    });
  });
}

/**
 * Deletes a box
 * @param boxId Box ID of the box to delete
 **/
function parseDeleteBox(boxId) {
  return new Promise((resolve, reject) => {
    const Box = Parse.Object.extend('Box');
    const query = new Parse.Query(Box);

    query.get(boxId).then((box) => {
      box.destroy().then(() => {
        resolve('success');
      }, (error) => {
        reject(error);
      });
    }, (error) => {
      reject(error);
    });
  });
}

/**
 * Resets a story so it has no starting box
 * @param storyID ID of the story to reset starting box on
 **/
function parseUnsetStoryStartingBoxId(storyId) {
  return new Promise((resolve, reject) => {
    const Story = Parse.Object.extend('Story');
    const query = new Parse.Query(Story);

    query.get(storyId).then((story) => {
      story.set('startingBoxId', 'noStartingBoxYet');

      story.save().then(() => {
        resolve('success');
      }, (error) => {
        reject(error);
      });
    }, (error) => {
      reject(error);
    });
  });
}

/**
 * Sets the starting box of a story
 * @param storyID ID of the story to manipulate
 * @param startingBoxId Box ID of the new starting box of the story
 **/
function parseSetStoryStartingBoxId(storyId, startingBoxId) {
  return new Promise((resolve, reject) => {
    const Story = Parse.Object.extend('Story');
    const query = new Parse.Query(Story);

    query.get(storyId).then((story) => {
      story.set('startingBoxId', startingBoxId);

      story.save().then(() => {
        resolve(startingBoxId);
      }, (error) => {
        reject(error);
      });
    }, (error) => {
      reject(error);
    });
  });
}

/**
 * Saves a path and its keyword/condition
 * @param pathId ID of the path to save
 * @param pathKeyword The keyword this path listens for
 * @param pathCondition The string for the condition the path should have
 **/
function parseSavePath(pathId, pathKeyword, pathCondition) {
  return new Promise((resolve, reject) => {
    const Path = Parse.Object.extend('Path');
    const query = new Parse.Query(Path);

    query.get(pathId).then((path) => {
      path.set('keyword', pathKeyword);
      path.set('condition', pathCondition);

      path.save().then(() => {
        resolve('success');
      }, (error) => {
        reject(error);
      });
    }, (error) => {
      reject(error);
    });
  });
}

/**
 * Deletes a path with a given ID
 * @param pathId ID of the path to delete
 **/
function parseDeletePath(pathId) {
  return new Promise((resolve, reject) => {
    const Path = Parse.Object.extend('Path');
    const query = new Parse.Query(Path);

    query.get(pathId).then((path) => {
      path.destroy().then(() => {
        resolve('success');
      }, (error) => {
        reject(error);
      });
    }, (error) => {
      reject(error);
    });
  });
}

/**
 * Creates a box and stores it in the database
 * @param storyId ID of the story to manipulate
 * @param x X-coordinate of the new box
 * @param y Y-coordinate of the new box
 **/
function parseCreateNewBox(storyId, x, y) {
  return new Promise((resolve, reject) => {
    const Box = Parse.Object.extend('Box');
    const newBox = new Box();

    newBox.set('storyId', storyId); //ID of the story
    newBox.set('title', ''); //Title of the box
    newBox.set('text', ''); //Text in the box
    newBox.set('audio_url', ''); //URL to the audio the box will play
    newBox.set('paths', ''); //List of all the paths that this box has. I think this is currently unused
    newBox.set('x', x); //X-coordinate of the box in the editor
    newBox.set('y', y); //Y-coordinate of the box in the editor
    newBox.set('command', ''); //What command the box should run once entered (such as x=5)

    newBox.save().then((box) => {
      const boxId = box.id;
      resolve(boxId);
    }, (error) => {
      reject(error);
    });
  });
}

/**
 * Creates a new path between two boxes, with an empty condition and keyword
 * @param storyId ID of the story to manipulate
 * @param fromId Box ID of the box where this path begins
 * @param toId Box ID of the box where this path ends
 **/
function parseCreateNewPath(storyId, fromId, toId) {
  return new Promise((resolve, reject) => {
    const Path = Parse.Object.extend('Path');
    const newPath = new Path();

    newPath.set('storyId', storyId);
    newPath.set('fromId', fromId);
    newPath.set('toId', toId);
    newPath.set('keyword', '');
    newPath.set('condition', '');

    newPath.save().then((path) => {
      const pathId = path.id;
      resolve(pathId);
    }, (error) => {
      reject(error);
    });
  });
}

/**
 * Gets general info about a story, such as title and description
 * @param storyId ID of the story to retrieve info about
 **/
function parseGetStoryInfo(storyId) {
  return new Promise((resolve, reject) => {
    const Story = Parse.Object.extend('Story');
    const query = new Parse.Query(Story);
    query.get(storyId).then((story) => {
      const storyTitle = story.get('title');
      const storyDesc = story.get('desc');

      const info = {
        title: storyTitle,
        desc: storyDesc,
      };
      resolve(info);
    }, (error) => {
      reject(error);
    });
  });
}

/**
 * Gets the ID of the starting box in a story
 * @param storyId ID of the story to retrieve from
 **/
function parseGetStoryStartingBox(storyId) {
  return new Promise((resolve, reject) => {
    const Story = Parse.Object.extend('Story');
    const query = new Parse.Query(Story);
    query.get(storyId).then((story) => {
      const startingBoxId = story.get('startingBoxId');
      resolve(startingBoxId);
    }, (error) => {
      reject(error);
    });
  });
}


/**
 * Gets all the story boxes from a story
 * @param storyId ID of the story to get boxes from
 **/
function parseGetStoryBoxes(storyId) {
  return new Promise((resolve, reject) => {
    const Box = Parse.Object.extend('Box');
    const query = new Parse.Query(Box);
    query.equalTo('storyId', storyId);

    query.find().then((boxes) => {
      const returnBoxes = [];
      for (let i = 0; i < boxes.length; i += 1) {
        const box = boxes[i];
        const newBox = {
          boxId: box.id,
          title: box.get('title'),
          text: box.get('text'),
          url: box.get('audio_url'),
          x: box.get('x'),
          y: box.get('y'),
          command: box.get('command'),
        };
        returnBoxes.push(newBox);
      }
      resolve(returnBoxes);
    }, (error) => {
      reject(error);
    });
  });
}

/**
 * Gets all the story paths from a story and its boxes
 * @param storyId ID of the story to get paths from
 * @param boxNodes All the box data in the story. Preferably gained from calling parseGetStoryBoxes()
 **/
function parseGetStoryPaths(storyId, boxNodes) {
  return new Promise((resolve, reject) => {
    const Path = Parse.Object.extend('Path');
    const query = new Parse.Query(Path);
    query.equalTo('storyId', storyId);

    query.find().then((paths) => {
      const returnPaths = [];
      for (let index = 0; index < paths.length; index += 1) {
        const path = paths[index];

        const pathFrom = path.get('fromId');
        let fromBoxNode = null;
        for (let i = 0; i < boxNodes.length; i += 1) {
          const box = boxNodes[i];
          if (box.boxId === pathFrom) {
            fromBoxNode = box.boxNode;
            break;
          }
        }

        const pathTo = path.get('toId');
        let toBoxNode = null;
        for (let i = 0; i < boxNodes.length; i += 1) {
          const box = boxNodes[i];
          if (box.boxId === pathTo) {
            toBoxNode = box.boxNode;
            break;
          }
        }

        const newPath = {
          pathId: path.id,
          pathFrom,
          fromBoxNode,
          pathTo,
          toBoxNode,
          keyword: path.get('keyword'),
          condition: path.get('condition'),
        };
        returnPaths.push(newPath);
      }
      resolve(returnPaths);
    }, (error) => {
      reject(error);
    });
  });
}

/**
 * Updates the position of a box in the editing view
 * @param boxId ID of the box to move
 * @param x New X-coordinate of the box
 * @param y New Y-coordinate of the box
 **/
function parseUpdateCoordinates(boxId, x, y) {
  return new Promise((resolve, reject) => {
    const Box = Parse.Object.extend('Box');
    const query = new Parse.Query(Box);

    query.get(boxId).then((box) => {
      box.set('x', x);
      box.set('y', y);

      box.save().then(() => {
        resolve('success');
      }, (error) => {
        reject(error);
      });
    }, (error) => {
      reject(error);
    });
  });
}

/**
 * Semi-silent-fail version of parseUpdateCoordinates(): logs errors, but does not register them as actual errors
 * @param boxId ID of the box to move
 * @param x New X-coordinate of the box
 * @param y New Y-coordinate of the box
 **/
function updateCoordinates(boxId, x, y) {
  parseUpdateCoordinates(boxId, x, y).then(() => {
  }, (error) => {
    console.log(`update coordinates error: ${error}`);
  });
}

class Editstory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Whether the component has mounted yet or not
      isMounted: false,

      //Information about the current story
      currentStoryTitle: '',
      currentStoryDesc: '',
      currentStartingBoxId: '',

      //Information about the currently selected box
      currentBoxId: '',
      currentBoxTitle: '',
      currentBoxText: '',
      currentBoxAudio: '',
      currentBoxNode: null,
      x: 0,
      y: 0,
      currentBoxCommand: '',

      //Used when creating a new path between two boxes
      choosingBoxForPath: false,
      nextBoxId: null,
      nextBoxNode: null,

      //Information about the currently selected path
      currentPathId: '',
      currentPathFrom: '',
      currentPathTo: '',
      currentPathKeyword: '',
      currentPathCondition: '',

      //General state information
      paths: [],
      boxes: [],
      boxNodes: [],
      pathsLoaded: false,
      waitingForBoxNode: false,
      showBoxInfo: false,
      showPathInfo: false,
      isPublished: false,
    };
    this.onClickBox = this.onClickBox.bind(this);
    this.onClickPath = this.onClickPath.bind(this);
    this.onClickPage = this.onClickPage.bind(this);
    this.onClickNavLink = this.onClickNavLink.bind(this);
    this.onBoxInfoChange = this.onBoxInfoChange.bind(this);
    this.onPathInfoChange = this.onPathInfoChange.bind(this);
    this.onStoryInfoChange = this.onStoryInfoChange.bind(this);
    this.saveBox = this.saveBox.bind(this);
    this.savePath = this.savePath.bind(this);
    this.handleAddPath = this.handleAddPath.bind(this);
    this.addNewBox = this.addNewBox.bind(this);
    this.deleteBox = this.deleteBox.bind(this);
    this.deletePath = this.deletePath.bind(this);
    this.loadStory = this.loadStory.bind(this);
    this.saveStoryInfo = this.saveStoryInfo.bind(this);
    this.deleteStory = this.deleteStory.bind(this);
    this.publishStory = this.publishStory.bind(this);
    this.getBoxRef = this.getBoxRef.bind(this);
    this.deletePathsConnectedToTheBox = this.deletePathsConnectedToBox.bind(this);
    this.deletePathWithPathId = this.deletePathWithPathId.bind(this);
    this.handleMakeStartingBox = this.handleMakeStartingBox.bind(this);
  }

  componentDidMount() {
    this.setState({ isMounted: true }, () => {
      this.loadStory();
      const tmpProps = this.props;
      tmpProps.toggleHeader();
    });
  }

  componentDidUpdate() {
    const tmpState = this.state;
    const { pathsLoaded } = tmpState;
    const { boxes } = tmpState;
    const { boxNodes } = tmpState;

    if (!pathsLoaded && (boxes.length > 0) && (boxes.length === boxNodes.length)) {
      this.setState({ pathsLoaded: true }, () => {
        const tmpProps = this.props;
        const storyId = tmpProps.currentStory;
        parseGetStoryPaths(storyId, boxNodes).then((paths) => {
          this.setState({ paths });
        });
      });
    }
  }

  componentWillUnmount() {
    const tmpState = this.state;
    const tmpProps = this.props;
    if (tmpState.isMounted) {
      tmpProps.toggleHeader();
    }
  }

  /**
   * Runs whenever a box is clicked
   * @param boxId ID of the box that was just clicked
   * @param boxTitle Title of the box
   * @param boxText Text in the box
   * @param audioUrl URL to the audio the box will play
   * @param node The box's node(?)
   * @param x X-coordinate of the box
   * @param y Y-coordinate of the box
   * @param boxCommand String-based command the box will run when entered
   */
  onClickBox(boxId, boxTitle, boxText, audioUrl, node, x, y, boxCommand) {
    const tmpState = this.state;
    if (tmpState.choosingBoxForPath) {
      this.addPath(boxId, node);
    } else {
      if(tmpState.showPathInfo) {
        this.savePath(tmpState);
      }
      else if(tmpState.showBoxInfo && (tmpState.currentBoxId != boxId) 
               && (tmpState.currentBoxId != '')) {
        this.saveBox(tmpState);
      }
      else if(tmpState.showBoxInfo && (tmpState.currentBoxId == boxId) 
               && (tmpState.currentBoxId != '')) {
        this.saveBox();
        this.setState({
          x,
          y,
        }, () => {
          updateCoordinates(boxId, x, y);
        })
        return;
      }

      this.setState({
        showBoxInfo: true,
        showPathInfo: false,
        currentBoxId: boxId,
        currentBoxTitle: boxTitle,
        currentBoxText: boxText,
        currentBoxAudio: audioUrl,
        currentBoxNode: node,
        currentBoxCommand: boxCommand,
        x,  
        y,
        currentPathId: '',
        currentPathFrom: '',
        currentPathTo: '',
        currentPathKeyword: '',
        currentPathCondition: '',
      }, () => {
        updateCoordinates(boxId, x, y);
      });
    }
  }

  /**
   * Runs whenever a path is clicked
   * @param pathId ID of the path that was just clicked
   * @param pathFrom Box ID of the box this path starts at
   * @param pathTo Box ID of the box this path ends at
   * @param keyword The keyword this path listens for
   * @param condition The condition string of this path
   */
  onClickPath(pathId, pathFrom, pathTo, keyword, condition) {
    const tmpState = this.state;
    if(tmpState.showBoxInfo) {
      this.saveBox(tmpState);
    }
    else if(tmpState.showPathInfo && (tmpState.currentPathId != pathId)
             && (tmpState.currentPathId != '')) {
      this.savePath(tmpState);
    }
    else if(tmpState.showPathInfo && (tmpState.currentPathId == pathId)
             && (tmpState.currentPathId != '')) {
      this.savePath();
      return;
    }

    this.setState({
      showBoxInfo: false,
      showPathInfo: true,        
      currentBoxId: '',
      currentBoxTitle: '',
      currentBoxText: '',
      currentBoxAudio: '',
      currentBoxNode: '',
      x: 0, 
      y: 0,
      currentPathId: pathId,
      currentPathFrom: pathFrom,
      currentPathTo: pathTo,
      currentPathKeyword: keyword,
      currentPathCondition: condition,
    });
  }

  onClickPage() {
    const tmpState = this.state;
    if(tmpState.showBoxInfo && (tmpState.currentBoxId != '')) {
      this.saveBox(tmpState);
    }
    if(tmpState.showPathInfo && (tmpState.currentPathId != '')) {
      this.savePath(tmpState);
    }

    this.setState({
      showBoxInfo: false,
      showPathInfo: false,
      currentBoxId: '',
      currentBoxTitle: '',
      currentBoxText: '',
      currentBoxAudio: '',
      currentBoxNode: '',
      x: 0, 
      y: 0,
      currentPathId: '',
      currentPathFrom: '',
      currentPathTo: '',
      currentPathKeyword: '',
      currentPathCondition: '',
    })
  }

  onClickNavLink() {
    const tmpState = this.state;
    if(tmpState.showBoxInfo && (tmpState.currentBoxId != '')) {
      parseSaveBox(tmpState.currentBoxId, tmpState.currentBoxTitle, 
        tmpState.currentBoxText, tmpState.currentBoxAudio, tmpState.x, tmpState.y, tmpState.currentBoxCommand);
    }
    else if(tmpState.showPathInfo && (tmpState.currentPathId != '')) {
      parseSavePath(tmpState.currentPathId, tmpState.currentPathKeyword, tmpState.currentPathCondition);
    }
  }

  onBoxInfoChange(target, value) {
    this.setState({
      [target]: value,
    }, () => {
      if (target === 'currentBoxAudio') {
        this.saveBox();
      }
    });
  }

  onPathInfoChange(target, value) {
    this.setState({
      [target]: value,
    });
  }

  onStoryInfoChange(target, value) {
    this.setState({
      [target]: value,
    });
  }

  getBoxRef(boxId, boxNode) {
    this.setState((state) => {
      const newBoxNodes = state.boxNodes.slice();
      const newBoxNode = {
        boxId,
        boxNode,
      };
      newBoxNodes.push(newBoxNode);
      if (state.waitingForBoxNode) {
        return {
          boxNodes: newBoxNodes,
          currentBoxNode: boxNode,
          waitingForBoxNode: false,
        };
      }
      return { boxNodes: newBoxNodes };
    });
  }

  /**
   * Loads in the data of the current story
   */
  loadStory() {
    const tmpProps = this.props;
    let storyId = tmpProps.currentStory;
    if (!storyId) {
      storyId = 'GAXuyImQMC'; //TODO: this should throw an error, not default to an arbitrary story ID
    }
    console.log(`current storyId: ${storyId}`);

    parseGetStoryStartingBox(storyId).then((startingBoxId) => {
      if (startingBoxId === 'noStartingBoxYet') {
        this.addNewBox().then((boxId) => {
          this.setState({ currentStartingBoxId: boxId });
          const startingBoxIdToSet = boxId;
          parseSetStoryStartingBoxId(storyId, startingBoxIdToSet).then((startingBoxIdToPrint) => {
            console.log(`StartingBoxId: ${startingBoxIdToPrint}`);
          });
        });
      } else {
        this.setState({ currentStartingBoxId: startingBoxId });
        console.log(`StartingBoxId: ${startingBoxId}`);
      }
    });


    parseGetStoryBoxes(storyId).then((boxes) => {
      this.setState({ boxes });
    }, (error) => {
      console.log(`parse get story error: ${error}`);
    });


    console.log(`current storyId: ${storyId}`);

    parseGetStoryBoxes(storyId).then((boxes) => {
      this.setState({ boxes });
    }, (error) => {
      console.log(`parse get story error: ${error}`);
    });

    parseGetStoryInfo(storyId).then((info) => {
      this.setState({
        currentStoryTitle: info.title,
        currentStoryDesc: info.desc,
      });
    }, (error) => {
      console.log(`parse get story info error: ${error}`);
    });
  }

  /**
   * Makes the currently selected box the starting box of the story
   */
  handleMakeStartingBox() {
    const tmpState = this.state;
    const tmpProps = this.props;
    const { currentBoxId } = tmpState;
    const storyId = tmpProps.currentStory;

    parseSetStoryStartingBoxId(storyId, currentBoxId).then((startingBoxId) => {
      this.setState({ currentStartingBoxId: currentBoxId });
      console.log(`New startingBoxId: ${startingBoxId}`);
    });
  }

  /**
   * Creates a new box in the current story
   */
  addNewBox() {
    const tmpState = this.state;
    const tmpProps = this.props;
    return new Promise((resolve) => {
      let storyId = tmpProps.currentStory;
      if (!storyId) {
        storyId = 'GAXuyImQMC'; //TODO: this should throw an error, not default to an arbitrary story ID
      }
      const x = 300 + (Math.random() * 200) - 100;
      const y = 120 + (Math.random() * 100) - 50;
      parseCreateNewBox(storyId, x, y).then((boxId) => {
        const newBox = {
          boxId,
          title: 'Untitled',
          text: '',
          url: '',
          x,
          y,
          isStartingBox: false,
        };
        const newBoxes = tmpState.boxes.slice();
        newBoxes.push(newBox);
        this.setState(() => ({
          boxes: newBoxes,
          currentBoxId: boxId,
          currentBoxTitle: 'Untitled',
          currentBoxText: '',
          currentBoxAudio: '',
          waitingForBoxNode: true,
        }));
        resolve(boxId);
      });
    });
  }

  /**
   * Finilizes adding a path between two boxes; assumes that handleAddPath() was called first
   * @param boxId The box that the path should end at
   * @param node Node(?) of the box that the path should end at
   */
  addPath(boxId, node) {
    this.setState({
      nextBoxId: boxId,
      choosingBoxForPath: false,
      nextBoxNode: node,
    }, () => {
      const tmpState = this.state;
      const tmpProps = this.props;
      let storyId = tmpProps.currentStory;
      if (!storyId) {
        storyId = 'GAXuyImQMC'; // TODO: This should throw an error rather than default to an arbitrary story ID
      }
      const pathFrom = tmpState.currentBoxId;
      const pathTo = tmpState.nextBoxId;

      parseCreateNewPath(storyId, pathFrom, pathTo).then((pathId) => {
        const newPath = {
          pathId,
          pathFrom,
          fromBoxNode: tmpState.currentBoxNode,
          pathTo,
          toBoxNode: tmpState.nextBoxNode,
          keyword: '',
          condition: '',
        };

        const newPaths = tmpState.paths.slice();
        newPaths.push(newPath);
        this.setState({
          paths: newPaths,
          currentPathId: pathId,
          currentPathFrom: pathFrom,
          currentPathTo: pathTo,
          currentPathKeyword: '',
          currentPathCondition: '',
        });
      });
    });
  }

  /**
   * Starts adding a new path from the currently selected box, allowing a second box to be selected to finalize the path creation
   */
  handleAddPath() {
    const tmpState = this.state;
    const boxId = tmpState.currentBoxId;
    const boxNode = tmpState.currentBoxNode;

    if ((boxId !== '') && (boxNode !== null)) {
      this.setState({
        choosingBoxForPath: true,
        nextBoxId: null,
      });
    }
  }

  /**
   * Publishes the current story so it is accessible by users of the phone app
   */
  publishStory() {
    const tmpState = this.state;
    const tmpProps = this.props;
    const storyId = tmpProps.currentStory;
    parsePublishStory(storyId).then(() => {
      }, (error) => {
        console.log(`error publishStory: ${error}`);
      });
  }

  /**
   * Saves general info such as description and title about the current story
   */
  saveStoryInfo() {
    const tmpState = this.state;
    const tmpProps = this.props;
    const storyTitle = tmpState.currentStoryTitle;
    const storyDesc = tmpState.currentStoryDesc;
    const storyId = tmpProps.currentStory;
    parseSaveStoryInfo(storyId, storyTitle, storyDesc).then(() => {
    }, (error) => {
      console.log(`error saveStoryInfo: ${error}`);
    });
  }


  /**
   * Deletes the current story and moves the user back to the home page
   */
  deleteStory() {
    const tmpState = this.state;
    const tmpProps = this.props;
    const storyId = tmpProps.currentStory;
    parseDeleteStory(storyId).then(() => {
      location.reload(); //Reloading brings us back to the homepage as our story ID will no longer be valid
    }, (error) => {
      console.log(`error deleteStory: ${error}`);
    });
  }

  /**
   * Saves the currently selected box (or if a diffent state is passed in, the box selected in that state)
   * @param oldState Optional: if provided, the function uses oldState to determine all state-related variables, rather than the current state
   */
  saveBox(oldState) {
    const tmpState = oldState ? oldState : this.state;
    const boxId = tmpState.currentBoxId;
    const boxTitle = tmpState.currentBoxTitle;
    const boxText = tmpState.currentBoxText;
    const boxUrl = tmpState.currentBoxAudio;
    const { x } = tmpState;
    const { y } = tmpState;
    const boxCommand = tmpState.currentBoxCommand;

    if (boxId === '') {
      return;
    }

    parseSaveBox(boxId, boxTitle, boxText, boxUrl, x, y, boxCommand).then(() => {
      const newBox = {
        boxId,
        title: boxTitle,
        text: boxText,
        url: boxUrl,
        x: 0,
        y: 0,
      };
      const newBoxes = [newBox];
      const { boxes } = tmpState;
      for (let i = 0; i < boxes.length; i += 1) {
        const box = boxes[i];
        if (box.boxId !== boxId) {
          newBoxes.push(box);
        }
      }
      this.setState({ boxes: newBoxes });
    }, (error) => {
      console.log(`error savebox: ${error}`);
    });
  }

  /**
   * Saves the currently selected path (or if a diffent state is passed in, the path selected in that state)
   * @param oldState Optional: if provided, the function uses oldState to determine all state-related variables, rather than the current state
   */
  savePath(oldState) {
    const tmpState = oldState ? oldState : this.state;
    const pathId = tmpState.currentPathId;
    const pathFrom = tmpState.currentPathFrom;
    const pathTo = tmpState.currentPathTo;
    const pathKeyword = tmpState.currentPathKeyword;
    const pathCondition = tmpState.currentPathCondition;

    if (pathId === '') {
      return;
    }

    parseSavePath(pathId, pathKeyword, pathCondition).then(() => {
      const newPaths = [];
      const { paths } = tmpState;
      for (let i = 0; i < paths.length; i += 1) {
        const path = paths[i];
        if (path.pathId === pathId) {
          const { fromBoxNode } = path;
          const { toBoxNode } = path;
          const newPath = {
            pathId,
            pathFrom,
            fromBoxNode,
            pathTo,
            toBoxNode,
            keyword: pathKeyword,
            condition: pathCondition,
          };
          newPaths.push(newPath);
        } else {
          newPaths.push(path);
        }
      }
      this.setState({ paths: newPaths });
    }, (error) => {
      console.log(`error savepath: ${error}`);
    });
  }

  /**
   * Asks the user whether they want to delete the currently selected box, and deletes it if so
   */
  deleteBox() {
    const tmpState = this.state;
    const tmpProps = this.props;
    const boxId = tmpState.currentBoxId;

    if (boxId === '') {
      return;
    }

    if (confirm('Are you sure you want to delete this box?')) {
      this.deletePathsConnectedToBox(boxId);
      if (boxId === tmpState.currentStartingBoxId) {
        const storyId = tmpProps.currentStory;
        parseUnsetStoryStartingBoxId(storyId);
        // TODO: put this in parseDeleteBox to not make several post reqs to database
        this.setState({ currentStartingBoxId: 'noStartingBoxYet' });
        console.log('starting box unset');
      }
      parseDeleteBox(boxId).then(() => {
        const { boxes } = tmpState;
        const newBoxes = [];
        for (let i = 0; i < boxes.length; i += 1) {
          const box = boxes[i];
          if (box.boxId !== boxId) {
            newBoxes.push(box);
          }
        }
        this.setState({
          boxes: newBoxes,
          showBoxInfo: false,
          currentBoxId: '',
          currentBoxTitle: '',
          currentBoxText: '',
          currentBoxAudio: '',
          currentBoxNode: null,
          x: 0,
          y: 0,
        });
      }, (error) => {
        console.log(`error deletebox: ${error}`);
      });
    } else {
      console.log('The box was not deleted.');
    }
  }

  /**
   * Deletes all paths connected to a box
   * @param boxId Box ID of the box to delete paths from
   */
  deletePathsConnectedToBox(boxId) {
    const tmpState = this.state;
    const { paths } = tmpState;
    for (let i = 0; i < paths.length; i += 1) {
      const path = paths[i];
      if (path.pathFrom === boxId || path.pathTo === boxId) {
        this.deletePathWithPathId(path.pathId);
      }
    }
  }

  /**
   * Asks the user whether they want to delete the currently selected path, and deletes it if they answer yes
   */
  deletePath() {
    const tmpState = this.state;
    const pathId = tmpState.currentPathId;

    if (pathId === '') {
      return;
    }

    if (confirm('Are you sure you want to delete this path?')) {
      this.deletePathWithPathId(pathId);
    } else {
      console.log('The path was not deleted.');
    }
  }

  /**
   * Deletes a given path and updates the state to reflect this
   * @param pathId ID of the path to delete
   */
  deletePathWithPathId(pathId) {
    parseDeletePath(pathId).then(() => {
      const tmpState = this.state;
      const { paths } = tmpState;
      const newPaths = [];
      for (let i = 0; i < paths.length; i += 1) {
        const path = paths[i];
        if (path.pathId !== pathId) {
          newPaths.push(path);
        }
      }
      this.setState({
        paths: newPaths,
        showPathInfo: false,
        currentPathId: '',
        currentPathFrom: '',
        currentPathTo: '',
        currentPathKeyword: '',
        currentPathCondition: '',
      });
    }, (error) => {
      console.log(`error deletebox: ${error}`);
    });
  }

  /**
   * Main rendering function
   */
  render() {
    const tmpProps = this.props;
    if (!tmpProps.loggedIn) {
      return <Redirect to="/loginpage" />;
    }
    const tmpState = this.state;
    return (
      <div className="wrapper" style={backgroundBoxStyle}>
        <div style={editStoryStyle}>

          <Menu
            showBoxInfo={tmpState.showBoxInfo}
            showPathInfo={tmpState.showPathInfo}

            currentStoryTitle={tmpState.currentStoryTitle}
            currentStoryDesc={tmpState.currentStoryDesc}
            onStoryInfoChange={this.onStoryInfoChange}
            saveStoryInfo={this.saveStoryInfo}
            publishStory={this.publishStory}
            deleteStory={this.deleteStory}

            currentBoxId={tmpState.currentBoxId}
            currentBoxTitle={tmpState.currentBoxTitle}
            currentBoxText={tmpState.currentBoxText}
            currentBoxAudio={tmpState.currentBoxAudio}
            currentBoxCommand={tmpState.currentBoxCommand}
            x={tmpState.x}
            y={tmpState.y}

            choosingBoxForPath={tmpState.choosingBoxForPath}
            handleAddPath={this.handleAddPath}
            onBoxInfoChange={this.onBoxInfoChange}
            onPathInfoChange={this.onPathInfoChange}

            currentPathId={tmpState.currentPathId}
            currentPathFrom={tmpState.currentPathFrom}
            currentPathTo={tmpState.currentPathTo}
            currentPathKeyword={tmpState.currentPathKeyword}
            currentPathCondition={tmpState.currentPathCondition}
            saveBox={this.saveBox}
            savePath={this.savePath}
            deleteBox={this.deleteBox}
            deletePath={this.deletePath}
            addNewBox={this.addNewBox}

            handleMakeStartingBox={this.handleMakeStartingBox}
            onClickNavLink={this.onClickNavLink}
          />
          <EditingPage
            boxes={tmpState.boxes}
            currentStartingBoxId={tmpState.currentStartingBoxId}
            currentBoxId={tmpState.currentBoxId}
            currentPathId={tmpState.currentPathId}
            paths={tmpState.paths}
            onClickBox={this.onClickBox}
            onClickPath={this.onClickPath}
            onClickPage={this.onClickPage}
            getBoxRef={this.getBoxRef}
            showBoxInfo={tmpState.showBoxInfo}
            showPathInfo={tmpState.showPathInfo}
          />
        </div>
      </div>
    );
  }
}


Editstory.propTypes = {
  currentStory: PropTypes.string.isRequired,
  toggleHeader: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,

};
export default Editstory;
