import React from 'react';
import PropTypes from 'prop-types';

const storyInfoStyle = {
  margin: '10px 0',
  fontSize: '13px',
};


class StoryInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    const { name } = event.target;
    const { value } = event.target;
    const tmpProps = this.props;
    tmpProps.onStoryInfoChange(name, value);
  }

  render() {
    const tmpProps = this.props;
    return (
      <div style={storyInfoStyle}>
        <label htmlFor="currentStoryTitle">
          Change Story Title:
          <input
            type="text"
            value={tmpProps.currentStoryTitle}
            onChange={this.handleChange}
            name="currentStoryTitle"
          />
        </label>

        <textarea
          type="text"
          rows="2"
          cols="37"
          value={tmpProps.currentStoryDesc}
          placeholder="Write a story description..."
          onChange={this.handleChange}
          name="currentStoryDesc"
        />

      </div>
    );
  }
}
StoryInfo.propTypes = {
//  currentStoryDesc: PropTypes.string.isRequired, FIXME: set default value
  currentStoryTitle: PropTypes.string.isRequired,
  onStoryInfoChange: PropTypes.func.isRequired,
};
/*
<label htmlFor="currentStoryDesc">Change Story Desc: </label>
              <input type="text"
                     value={this.props.currentStoryDesc}
                     onChange={this.handleChange}
                     name="currentStoryDesc"
              />
  */

export default StoryInfo;
