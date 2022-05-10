import React, { Component } from 'react';
import {
  Route, Switch,
} from 'react-router-dom';
import routes from './routes';
import Prices from './pages/Prices';
import Header from './pages/Header';
import Parse from './common';
import Background from './images/paper.jpg';
import Editstory from './pages/Editstory';


const styles = {
  display: 'block',
  boxSizing: 'border-box',
  width: '100%',
  minHeight: '100%',
  backgroundImage: `url(${Background})`,
  backgroundSize: 'cover',
};

const pageStyle = {
  fontFamily: 'Verdana, Geneva, sans-serif',
  width: '1000px',
  boxSizing: 'content-box',
  minHeight: '100%',
  height: '100%',
  margin: '0 auto',
  backgroundColor: 'white',
  borderRadius: '4px',
  boxShadow: '5px 5px 14px rgba(0,0,0, 0.2)',
  clear: 'both',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      currentStory: 'RDrf1AFzP9',

      showHeader: true,
    };

    this.setCurrentStory = this.setCurrentStory.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.toggleHeader = this.toggleHeader.bind(this);
  }

  componentDidMount() {
    this.authenticate();
  }

  setCurrentStory(story) {
    this.setState({ currentStory: story });
  }

  authenticate() {
    const user = Parse.User.current();
    if (user) {
      this.setState(({ loggedIn: true }));
      return true;
    }
    this.setState(({ loggedIn: false }));
    return false;
  }

  toggleHeader() {
    this.setState((state) => ({ showHeader: !state.showHeader }));
  }

  render() {
    const tmpState = this.state;
    return (
      <div style={styles}>
        {tmpState.showHeader
          ? <Header />
          : null}
        <Switch>
          <Route key="/editstory" path="/editstory">
            <div>
              <Editstory
                authenticate={this.authenticate}
                loggedIn={tmpState.loggedIn}
                setCurrentStory={this.setCurrentStory}
                currentStory={tmpState.currentStory}
                toggleHeader={this.toggleHeader}
              />
            </div>
          </Route>
          <Route path="/prices">
            <div>
              <Prices />
            </div>
          </Route>
          {routes.map((route) => (
            <Route key={route.path} path={route.path}>
              <div style={pageStyle}>
                <route.component
                  authenticate={this.authenticate}
                  loggedIn={tmpState.loggedIn}
                  setCurrentStory={this.setCurrentStory}
                  currentStory={tmpState.currentStory}
                  toggleHeader={this.toggleHeader}
                />
              </div>
            </Route>
          ))}
        </Switch>
      </div>
    );
  }
}
export default App;

/*


<Navbar />

<Switch>
  {routes.map(({ path, exact, component: Component, ...rest }) => (
    <Route key={path} path={path} exact={exact} render={(props) => (
      <Component {...props} {...rest} />
    )} />
  ))}
  <Route render={(props) => <NoMatch {...props} /> } />
</Switch>
  */
