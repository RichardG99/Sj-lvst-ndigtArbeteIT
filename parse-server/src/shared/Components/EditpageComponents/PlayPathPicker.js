import React from 'react';
import PropTypes from 'prop-types';
import Parse from '../../common';

const buttonStyle = {
    width: '30%',
    fontSize: '11px',
    margin: '0 0.4em 1em 0.4em',
    height: '3.7em',
    display: 'inline',
    backgroundColor: 'white',
    borderRadius: '6px',
    border: '1px solid lightgrey',
    boxShadow: '1px 1px 2px rgba(0,0,0, 0.1)',
    cursor: 'pointer',
  };
  
  class PlayPathPicker extends React.Component {
  constructor(props) {
      super(props);
      

      this.state = {
          paths: [],
      };

      this.loadPaths();

      this.onClick = this.onClick.bind(this);
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
                pathId: path.get('pathId'),
                pathTo: path.get('toId'),
                keyword: path.get('keyword'),
                condition: path.get('condition'),
            };
            allPaths.push(newPath);
        }
        this.setState( {paths: allPaths} );
    });

  }

  componentDidUpdate() {
      this.loadPaths();
  }

  onClick(event) {
    //console.log(event.target);
    //console.log(event.target.value);
    this.props.onPlayPathPicked(event.target.value);
  }

  render() {
      const tmpState = this.state;
      return(
        <div>
        {
          tmpState.paths.map((path) => (
            <button type="button" style={buttonStyle} onClick={this.onClick}
                name={path.pathId} value={path.pathTo} key={path.pathId}
            >{path.keyword}</button>
          ))
        }
        </div>
      );
  }
}

PlayPathPicker.propTypes = {
  playingBoxId: PropTypes.string.isRequired,
  onPlayPathPicked: PropTypes.func.isRequired,  
};

export default PlayPathPicker;