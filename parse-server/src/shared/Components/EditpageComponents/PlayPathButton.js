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
  
class PlayPathButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            disabled: true,
        }
    }

    componentDidUpdate() {
        const tmpProps = this.props;
        const tmpState = this.state;
        //console.log(tmpState.disabled, tmpProps.playbackFinished, tmpProps.eval(tmpProps.condition));
        if(tmpState.disabled && tmpProps.playbackFinished && tmpProps.eval(tmpProps.condition)) {
            console.log("Enable");
            this.setState({disabled: false,});
        } else if( ! (tmpState.disabled || tmpProps.playbackFinished )) {
            console.log("Disable", tmpProps.keyword);
            this.setState({disabled: true});
        }
    }

    render() {
        const tmpProps = this.props;
        const tmpState = this.state;
        //console.log(tmpState.disabled);
        return (
            <button type="button" style={buttonStyle} onClick={tmpProps.onClick}
                name={tmpProps.pathId} value={tmpProps.pathTo} key={tmpProps.pathId}
                disabled={tmpState.disabled}
            >{tmpProps.keyword}</button>
        );
    }
}

PlayPathButton.propTypes = {
    pathId: PropTypes.string.isRequired,
    pathTo: PropTypes.string.isRequired,
    keyword: PropTypes.string.isRequired,
    condition: PropTypes.string.isRequired,
    playbackFinished: PropTypes.bool.isRequired,
    varChanged: PropTypes.bool.isRequired,

    eval: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default PlayPathButton;
