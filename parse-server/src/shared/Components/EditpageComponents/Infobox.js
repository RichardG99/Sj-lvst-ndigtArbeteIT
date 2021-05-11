import React from 'react';
import Bin from '../../images/bin.png';

const mainStyle = {
  position: 'fixed',
  fontFamily: 'Verdana, Geneva, sans-serif',
  fontSize: '11px',
  padding: '10px',
  tep: '0px',
  right: '0px',
  width: '250px',
  backgroundColor: 'hsla(33, 40%, 95%, 1)', // '#fafafa',
  zIndex: '10000',
  border: '2px solid hsla(33, 40%, 90%, 1)',
  boxShadow: '5px 5px 14px rgba(0,0,0, 0.2)',
  borderTopRightRadius: '6px',
  borderBottomRightRadius: '6px',
};

const innerStyle = {
  // boxSizing: 'border-box',
  margin: '3em 0px 1em 0px',
  padding: '10px',
  backgroundColor: 'white', // '#f0f0f0',
  border: '2px solid #f0f0f0',
  borderRadius: '6px',
  fontSize: '11px',
  overflow: 'auto'
};

const infoButtonStyle = {
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

const imgStyle = {
  display: 'block',
  width: '12px',
  position: 'relative',
  top: '1px',
  left: '30px',
  marginBottom: '7px',
}

class Infobox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extendedInfo: true,
    };
    this.toggleInfo = this.toggleInfo.bind(this);
  }

  /**
   * Toggles the info box between just a button and
   */
  toggleInfo() {
    if (this.extendedInfo) {
      this.setState({
        extendedInfo: false
      });
    } else {
      this.setState({
        extendedInfo: true
      });
    }
  }

  render() {
    const tmpProps = this.props;
    let displayContent = this.extendedInfo ? (
      <div style={innerStyle}>
        <form onSubmit={this.handleSubmit}>
          <div className="container"> {/* TODO: Make this scroll to properly allow all content to be displayed on all screen sizes */}
            <div style={titleTextStyle}>
              Welcome to DreamScape's web editor! The basic idea of the editor is based around Boxes and Paths; a Box can be thought of as a chapter in normal books, while a Path links
              several Boxes together allowing the user to progress between chapters. To create a new Box, simply press the "Add New Box" button up in the left corner. To create a Path, 
              first click on a Box, then press the "Add Path from Box" button that appears and click on a second Box. A Path (which looks sorta like an arrow) should now point from the 
              first Box to the second one.

              <h3>Editing boxes</h3>
              When you click on a Box, an editor screen appears to your left: this screen allows you to change the Box's different parameters. The Title and Description fields are just
              for your own convenience, and will not be displayed to the user. The Sound File you set will be played as soon as the user reaches this box (setting no sound file means the
              box will simply not play any sound; this might be helpful when managing branching paths). Finally, the Action field registers certain actions that the box will try to execute:
              this is covered in detail under "Actions and Conditions"

              <h3>Editing Paths</h3>
              Similarly to editing boxes, you can click on any Path you have created to bring up an editing field for it. Here, you can only edit two things: the Keyword the path listens for
              (this can be left empty if you only want the player to progress along it with non-verbal means), and the Condition for the path to be chosen (which is covered in detail under 
              "Actions and Conditions").

              <h3>Actions and Conditions</h3>
              Two central concepts in DreamScape are Actions and Conditions (for those who know programming, this corresponds to Set and If respectively). An Action is something that occurs
              as soon as a user reaches a box and the sound file for that box starts happening. This is usually setting the value of something (such as "set 'userHasUmbrella' to 1"). The
              syntax for this is simple:
                userHasUmbrella := 1
              This sets userHasUmbrella to the value 1 (which can be thought of as "True"). Thus, if a Condition reads userHasUmbrella after reaching that box, it'll have the value 1. Most
              things that haven't been set default to simply being 0, except if they are Special Values (we'll talk about those shortly). Also note that variables can be set to the value of 
              other variables:
                userHasUmbrella := 1
                userHoldsUmbrellaInHand := userHasUmbrella
              They also support basic addition:
                applesInBasket := 5 + 2
              This would set applesInBasket to 7, as one would expect.

              A condition on the other hand is something a Path checks before it allows the user to progress along it. This can be as simple as checking whether the user has an umbrella:
                userHasUmbrella = 1
              Or as complex as one wants it to be. Here is for example a setup where the user has to walk more than 1000 steps as well as remove their umbrella before progressing:
                @step {'>'} 1000
                userHasUmbrella = 0
              This also supports basic math, like the Actions. This, for example, requires the steps taken to be 1000 higher than "previousStepsTaken":
                @step = 1000 + previousStepsTaken
              

              <h3>Special values</h3>
              Some built-in values can be read from to determine things such as sensor output or which hardware the user allows the story to use. These always start with a "@" sign, so don't
              name any of your own variables that! A list of these and how they work are:

              @step
              When read, gives you how many steps the user has taken since the beginning of the story. Defaults to 0 if it cannot be read.

              @step_isavailable
              Has the value 1 if the step counter is available for the user, and 0 otherwise

              @time
              When read, gives you the current time of day, counted in minutes (for example, 2:15 PM would give 14*60 + 15=855). Always available to read: no default.
            </div>
          </div>
        </form>
      </div>
    ) : null;

    //TODO: Fix image and alignment
    return (
      <div style={mainStyle}>
        <button type="button" style={infoButtonStyle} onClick={this.toggleInfo}><img draggable="false" style={imgStyle} src={Bin}/> Info </button>
        {displayContent}
      </div>
    );
  }
}
export default Infobox;
