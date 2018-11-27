import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect
} from 'react-router-dom';
import userService from '../../utils/userService';
import './App.css';
import GamePage from '../GamePage/GamePage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Put state in here
    }
  }

  handleLogout = () => {
    userService.logout();
    this.setState({user: null});
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }

  /*----- Lifecycle Methods -----*/

  componentDidMount() {
    let user = userService.getUser();
    this.setState({user});
  }
  
  render() {
    return (
      <div className="App">
        <header>Complete Me!</header>
        <Router>
          <Switch>
            <Route exact path='/' render={() =>
              <GamePage /> 
            } />
            <Route exact path ='/signup' render={({history}) => 
              <SignupPage 
                history={history}
              />
            } />
            <Route exact path='/login' render={(props) =>
              <LoginPage 
                {...props}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            }/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
