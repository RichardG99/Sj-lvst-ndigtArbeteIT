import React from 'react';
import PropTypes from 'prop-types';
import Arrow from './Arrow';

class Path extends React.Component {
  constructor(props) {
    super(props);
    this.onClickMe = this.onClickMe.bind(this);
  }

  onClickMe(e) {
    e.stopPropagation();
    const tmpProps = this.props;
    const { pathId } = tmpProps;
    const { pathFrom } = tmpProps;
    const { pathTo } = tmpProps;
    const { keyword } = tmpProps;
    tmpProps.onClickPath(pathId, pathFrom, pathTo, keyword);
  }

  // TODO: change to showing box nr instead of box id
  render() {
    const tmpProps = this.props;
    return (
      <Arrow
        fromBoxNode={tmpProps.fromBoxNode}
        toBoxNode={tmpProps.toBoxNode}
        onClickMe={this.onClickMe}
        color={tmpProps.color}
        pathId={tmpProps.pathId}
      />
    );
  }
}
Path.propTypes = {
  pathId: PropTypes.string.isRequired,
  pathFrom: PropTypes.string.isRequired,
  pathTo: PropTypes.string.isRequired,
  condition: PropTypes.string.isRequired,
  onClickPath: PropTypes.func.isRequired,
  // fromBoxNode: PropTypes.objectOf(PropTypes.object()).isRequired, // FIXME define this Object
  // toBoxNode: PropTypes.objectOf(PropTypes.object()).isRequired, // FIXME define this Object
  color: PropTypes.string.isRequired,
};

export default Path;
