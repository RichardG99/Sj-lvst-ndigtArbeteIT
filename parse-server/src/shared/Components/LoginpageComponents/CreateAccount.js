import React from 'react';
import { NavLink } from 'react-router-dom';

const pStyle = {
  textAlign: 'center',
  color: 'black',
};

const linkStyle = {
  textDecoration: 'underline',
};

const CreateAccount = () => (
  <div>
    <NavLink style={linkStyle} to="/createuser" className="link">
      <p style={pStyle}>New to Augmented Audio? Create an account!</p>
    </NavLink>
  </div>
);

export default CreateAccount;
