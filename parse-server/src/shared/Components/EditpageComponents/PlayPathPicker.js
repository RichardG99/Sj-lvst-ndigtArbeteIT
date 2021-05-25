import React from 'react';
import PropTypes from 'prop-types';
import Parse from '../../common';
import PlayPathButton from './PlayPathButton';
import VarDisplay from './VarDisplay';

class PlayPathPicker extends React.Component {
  constructor(props) {
      super(props);
      

      this.state = {
          paths: [],
          cVars: {},
          currentBoxId: props.playingBoxId,
          varChanged: false,
      };

      this.eval = this.eval.bind(this);
      this.onClick = this.onClick.bind(this);
      this.forceEval = this.forceEval.bind(this);
      this.evalBox();
      this.loadPaths();

  }

  componentDidUpdate() {
    const tmpProps = this.props;
    const tmpState = this.state;
    if(tmpState.currentBoxId != tmpProps.playingBoxId) {
      // A new box is current, so reload paths from it
      this.evalBox();
      this.loadPaths();
      this.setState({ currentBoxId: tmpProps.playingBoxId, });
    }
    // reset trigger on variable change
    //this.setState({varChanged: false,});
    //console.log(tmpState.cVars);
    //console.log(Object.keys(tmpState.cVars));
  }

  forceEval() {
    const tmpState = this.state;
    if(tmpState.varChanged) {
      this.setState({ varChanged: false, });
    } else {
      this.setState({ varChanged: true, });

    }
  }
onClick(event) {
  //console.log(event.target);
  //console.log(event.target.value);
  this.props.onPlayPathPicked(event.target.value);
}

/**
 * Evaluates the command string of a box when we enter it
 */
evalBox() {
  const tmpProps = this.props;
  const Box = Parse.Object.extend('Box');
  const query = new Parse.Query(Box);
  const boxId = tmpProps.playingBoxId;

  query.get(boxId).then((box => {
    const cmd = box.get('command');
    console.log(cmd);
    this.eval(cmd);
  }));
}

loadPaths() {
    const Path = Parse.Object.extend('Path');
    const query = new Parse.Query(Path);
    const boxId = this.props.playingBoxId;

    query.equalTo('fromId', boxId).find().then((paths) => {
        const allPaths = [];
        for (let index = 0; index < paths.length; index += 1) {
            const path = paths[index];
            const newPath = {
                pathId: path.id,
                pathTo: path.get('toId'),
                keyword: path.get('keyword'),
                condition: path.get('condition'),
            };
            //console.log(newPath);
            allPaths.push(newPath);
        }
        this.setState( {paths: allPaths} );
    });

  }

  /*== Here are functions related to variables ==*/
  splitFirst(str, tok) {
    var nextString = "";
    var tokInd = 0;
    for (var i = 0; i < str.length; i++){
        if (str[i] === tok[tokInd]) {
            tokInd++;
            if(tokInd == tok.length) {
                return [nextString, str.substring(i+1)];
            }
        } else {
            // If we mispredicted, add the tokens we did find
            for(var j = 0; j < tokInd; j++)
                nextString = nextString + tok[j];
            nextString = nextString + str[i];
        }
    }
}

eval(str) {
    //console.log("Eval: " + str);
    // early exit
    if(str === "")
      return true;

      const tmpState = this.state;
    const lines = str.split('\n');
    let retVal = 0;
    lines.forEach((line) => {
        //console.log("line=" + line);
        if(line.indexOf(':=') > -1) {
            const ops = this.splitFirst(line,':=');
            //console.log("assign " + ops[0] + "<=" + ops[1]);
            // dont assign to system variables
            if(!ops[0].startsWith('@')) {
                if(ops[0].startsWith('%')) {
                    // unless of course this system variable can take a new value
                    retVal = this.setSysVar(ops[0].substring(1), ops[1])
                } else {
                    retVal = this.assign(ops[0],ops[1]);
                    //retVal = this.cVars[ops[0]];
                }
            }
        }
        
        else if(line.indexOf('+') > -1) {
            const ops = this.splitFirst(line,'+');
            //console.log("sum " + ops[0] + "+" + ops[1]);
            retVal = this.sum(ops[0], ops[1]);
        }

        else if(line.indexOf('<') > -1) {
            const ops = this.splitFirst(line,'<');
            //console.log("compare " + ops[0] + "<" + ops[1]);
            retVal = parseInt(this.eval(ops[0])) < parseInt(this.eval(ops[1]));
        }

        else if(line.indexOf('>') > -1) {
            const ops = this.splitFirst(line,'>');
            //console.log("compare " + ops[0] + ">" + ops[1]);
            retVal = parseInt(this.eval(ops[0])) > parseInt(this.eval(ops[1]));
        }

        else if(line.indexOf('==') > -1) {
            const ops = this.splitFirst(line,'==');
            //console.log("compare " + ops[0] + "==" + ops[1]);
            retVal = this.eval(ops[0]) === this.eval(ops[1]);
        }

        else if(line.startsWith('@')) {
            //console.log("getSysVal " + line.substring(1));
            retVal = this.getSysVar(line.substring(1));
        }

        else {
            /* default case: get value of a variable */
            //console.log("getVal " + line);
            if(isNaN(line))
                retVal = tmpState.cVars[line];
            else
                retVal = line;
        }
    });
    //console.log("Result: " + retVal);
    return retVal;
}

sum(left, right) {
    return parseInt(this.eval(left))+parseInt(this.eval(right));
}

assign(to, from) {
  const tmpState = this.state;
    tmpState.cVars[to] = this.eval(from);
    this.setState({varChanged: true});
    //console.log(to, " => ", tmpState.cVars[to]);
    return tmpState.cVars[to];
}

getSysVar(str) {
    if(str === "time") {
        const now = new Date();
        return now.getHours() * 60 + now.getMinutes();
    }
    else if(str === "step") {
        return this.steps.get();
    }
}

setSysVar(name, val) {
    val = eval(val);
    if(name === "step") {
        this.steps.setSysDefault(val);
    }
    return val;
}

/*== All hail the mighty render() ==*/
  render() {
    const tmpProps = this.props;
      const tmpState = this.state;
      return(
        <div>
        <div>
        {
          tmpState.paths.map((path) => (
            <PlayPathButton
              pathId={path.pathId}
              pathTo={path.pathTo}
              keyword={path.keyword}
              condition={path.condition}
              playbackFinished={tmpProps.isAudioDone}
              varChanged={tmpState.varChanged}
              onClick={this.onClick}
              eval={this.eval}
              key={path.pathId}
            />
          ))
        }
        </div>
        <div>
          <button type="button" onClick={this.forceEval}>Re-check activation</button>
        </div>
        <div>
          {
            Object.keys(tmpState.cVars).map( (key) => (
              <VarDisplay
                name={key}
                value={tmpState.cVars[key].toString()}
                eval={this.eval}
                key={key}
                varChanged={tmpState.varChanged}
              />
            ))
          }
        </div>
        </div>
      );
  }
}

PlayPathPicker.propTypes = {
  playingBoxId: PropTypes.string.isRequired,
  isAudioDone: PropTypes.bool.isRequired,
  onPlayPathPicked: PropTypes.func.isRequired,  
};

export default PlayPathPicker;