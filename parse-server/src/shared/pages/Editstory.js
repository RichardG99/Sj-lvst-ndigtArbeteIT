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

function parseSaveBox(boxId, boxTitle, boxText, boxUrl, x, y) {
  return new Promise((resolve, reject) => {
    const Box = Parse.Object.extend('Box');
    const query = new Parse.Query(Box);

    query.get(boxId).then((box) => {
      box.set('title', boxTitle);
      box.set('text', boxText);
      box.set('audio_url', boxUrl);
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

function parseSavePath(pathId, pathKeyword) {
  return new Promise((resolve, reject) => {
    const Path = Parse.Object.extend('Path');
    const query = new Parse.Query(Path);

    query.get(pathId).then((path) => {
      path.set('keyword', pathKeyword);

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

function parseCreateNewBox(storyId, x, y) {
  return new Promise((resolve, reject) => {
    const Box = Parse.Object.extend('Box');
    const newBox = new Box();

    newBox.set('storyId', storyId);
    newBox.set('title', '');
    newBox.set('text', '');
    newBox.set('audio_url', '');
    newBox.set('paths', '');
    newBox.set('x', x);
    newBox.set('y', y);

    newBox.save().then((box) => {
      const boxId = box.id;
      resolve(boxId);
    }, (error) => {
      reject(error);
    });
  });
}

function parseCreateNewPath(storyId, fromId, toId) {
  return new Promise((resolve, reject) => {
    const Path = Parse.Object.extend('Path');
    const newPath = new Path();

    newPath.set('storyId', storyId);
    newPath.set('fromId', fromId);
    newPath.set('toId', toId);
    newPath.set('keyword', '');

    newPath.save().then((path) => {
      const pathId = path.id;
      resolve(pathId);
    }, (error) => {
      reject(error);
    });
  });
}

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
        };
        returnBoxes.push(newBox);
      }
      resolve(returnBoxes);
    }, (error) => {
      reject(error);
    });
  });
}

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
        };
        returnPaths.push(newPath);
      }
      resolve(returnPaths);
    }, (error) => {
      reject(error);
    });
  });
}

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
      isMounted: false,

      currentStoryTitle: '',
      currentStoryDesc: '',
      currentStartingBoxId: '',
      currentBoxId: '',
      currentBoxTitle: '',
      currentBoxText: '',
      currentBoxAudio: '',
      currentBoxNode: null,
      x: 0,
      y: 0,

      choosingBoxForPath: false,
      nextBoxId: null,
      nextBoxNode: null,

      currentPathId: '',
      currentPathFrom: '',
      currentPathTo: '',
      currentPathKeyword: '',
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
    this.deletePathsConnectedToTheBox = this.deletePathsConnectedToTheBox.bind(this);
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

  onClickBox(boxId, boxTitle, boxText, boxUrl, node, x, y) {
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
        currentBoxAudio: boxUrl,
        currentBoxNode: node,
        x,  
        y,
        currentPathId: '',
        currentPathFrom: '',
        currentPathTo: '',
        currentPathKeyword: '',
      }, () => {
        updateCoordinates(boxId, x, y);
      });
    }
  }

  onClickPath(pathId, pathFrom, pathTo, keyword) {
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
    })
  }

  onClickNavLink() {
    const tmpState = this.state;
    if(tmpState.showBoxInfo && (tmpState.currentBoxId != '')) {
      parseSaveBox(tmpState.currentBoxId, tmpState.currentBoxTitle, 
        tmpState.currentBoxText, tmpState.currentBoxAudio, tmpState.x, tmpState.y);
    }
    else if(tmpState.showPathInfo && (tmpState.currentPathId != '')) {
      parseSavePath(tmpState.currentPathId, tmpState.currentPathKeyword);
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

  loadStory() {
    const tmpProps = this.props;
    let storyId = tmpProps.currentStory;
    if (!storyId) {
      storyId = 'GAXuyImQMC';
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

    // TOOO: vad händer om användaren raderar starting box?


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

  addNewBox() {
    const tmpState = this.state;
    const tmpProps = this.props;
    return new Promise((resolve) => {
      // TODO: Hard coding storyId, should crash instead?
      let storyId = tmpProps.currentStory;
      if (!storyId) {
        storyId = 'GAXuyImQMC';
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
        storyId = 'GAXuyImQMC'; // TODO shouldn't this be removed?
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
        };

        const newPaths = tmpState.paths.slice();
        newPaths.push(newPath);
        this.setState({
          paths: newPaths,
          currentPathId: pathId,
          currentPathFrom: pathFrom,
          currentPathTo: pathTo,
          currentPathKeyword: '',
        });
      });
    });
  }

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

  publishStory() {
    const tmpState = this.state;
    var tmpProps = this.props;
    tmpProps.isPublished = true;
    this.saveStoryInfo();
  }

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

  deleteStory() {
    const tmpState = this.state;
    const tmpProps = this.props;
    const storyId = tmpProps.currentStory;
    parseDeleteStory(storyId).then(() => {
    }, (error) => {
      console.log(`error saveStoryInfo: ${error}`);
    });
  }

  saveBox(oldState) {
    const tmpState = oldState ? oldState : this.state;
    const boxId = tmpState.currentBoxId;
    const boxTitle = tmpState.currentBoxTitle;
    const boxText = tmpState.currentBoxText;
    const boxUrl = tmpState.currentBoxAudio;
    const { x } = tmpState;
    const { y } = tmpState;

    if (boxId === '') {
      return;
    }

    parseSaveBox(boxId, boxTitle, boxText, boxUrl, x, y).then(() => {
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

  savePath(oldState) {
    const tmpState = oldState ? oldState : this.state;
    const pathId = tmpState.currentPathId;
    const pathFrom = tmpState.currentPathFrom;
    const pathTo = tmpState.currentPathTo;
    const pathKeyword = tmpState.currentPathKeyword;

    if (pathId === '') {
      return;
    }

    parseSavePath(pathId, pathKeyword).then(() => {
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

  deleteBox() {
    const tmpState = this.state;
    const tmpProps = this.props;
    const boxId = tmpState.currentBoxId;

    if (boxId === '') {
      return;
    }

    if (confirm('Are you sure you want to delete this box?')) {
      this.deletePathsConnectedToTheBox(boxId);
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

  deletePathsConnectedToTheBox(boxId) {
    const tmpState = this.state;
    const { paths } = tmpState;
    for (let i = 0; i < paths.length; i += 1) {
      const path = paths[i];
      if (path.pathFrom === boxId || path.pathTo === boxId) {
        this.deletePathWithPathId(path.pathId);
      }
    }
  }

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
      });
    }, (error) => {
      console.log(`error deletebox: ${error}`);
    });
  }

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
