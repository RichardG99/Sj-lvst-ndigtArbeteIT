import React from 'react';
import styles from '../../styles';
import CreateAccountForm from './CreateAccountForm';

const contentStyle = {
  width: '400px',
  margin: '0 auto',
};

const CreateAccountBox = (props) => {
  const tmpProps = props;
  return (
    <div>
      <h3 style={styles.h3}>Create Account</h3>
      <div style={contentStyle}>
        <CreateAccountForm redirectPage={tmpProps.redirectPage} />
      </div>
    </div>
  );
};

export default CreateAccountBox;
