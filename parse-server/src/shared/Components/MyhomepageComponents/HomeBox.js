import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles';
import MyInfo from './MyInfo';
import SubScriptBox from './subScriptBox'

const homeBoxStyle = {
  width: '50%',
  display: 'inline-block',
  boxSizing: 'border-box',
  float: 'left',
  padding: '0 2em 0 3em',
};

function HomeBox(props) {
  const { authenticate } = props;
  const { loggedIn } = props;
  return (
    <div style={homeBoxStyle}>
      <h4 style={styles.h4}>My Profile</h4>
      <SubScriptBox />
      <MyInfo
        authenticate={authenticate}
        loggedIn={loggedIn}
      />
    </div>
  );
}
HomeBox.propTypes = {
  authenticate: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default HomeBox;
