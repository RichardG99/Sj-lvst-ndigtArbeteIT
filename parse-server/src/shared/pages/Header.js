import React from 'react';
import { NavLink } from 'react-router-dom';
import TitleImage from '../images/augmentedaudio.png';

/**
 * File handling the title header of the website
 */


const headerStyle = {
  fontFamily: '\'Palatino Linotype\', \'Book Antiqua\', Palatino, serif',
  width: '100%',
  float: 'left',
  marginBottom: '30px',
  //display: 'flex',
};

const titleStyle = {
  textDecoration: 'none',
  color: 'black',
  fontSize: '60px',
  textShadow: '2px 2px 2px grey',
  display: 'inline-block',
  margin: '0.5em 0 10px 1em',
  justifyContent: 'center',
};


const Header = () => (
  <div style={headerStyle}>
    <Title />
  </div>
);

const Title = () => (
  <NavLink to="/" className="link">
    <img src={TitleImage} alt="AugmentedAud.io Logo" style={titleStyle} height="180"></img>
  </NavLink>
);

export default Header;
