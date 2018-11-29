import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect
} from 'react-router-dom';
import userService from '../../utils/userService';
import './App.css';
import socket from '../../utils/socket';
import GamePage from '../GamePage/GamePage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import FrontPage from '../FrontPage/FrontPage';
import JoinGamePage from '../JoinGamePage/JoinGamePage';
import gameService from '../../utils/gameService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null
    }
  }

  handleCreateGameClick = (e) => {
    e.preventDefault();
    gameService.createGame(this.state.user);
  }

/*----- Login/Logout -----*/

  handleLogout = () => {
    userService.logout();
    this.setState({user: null});
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }

  /*----- Socket.io -----*/

  sendGameData = () => {
    socket.emit('gameData', this.state.game);
  }

  /*----- Lifecycle Methods -----*/

  componentDidMount() {
    let user = userService.getUser();
    this.setState({user});

    // get active game from server if there is one
    if (user) socket.emit('getActiveGame', user._id);

    socket.on('gameData', (game) => {
      this.setState({game});
    });
  }
  
  render() {
    return (
      <div className="App">
        <header>Complete Me!</header>
        <Router>
          <Switch>
            <Route exact path='/' render={() =>
              <FrontPage 
                user={this.state.user}
                handleLogout={this.handleLogout} 
                handleCreateGameClick={this.handleCreateGameClick}
              />
            } />
            <Route exact path='/join' render={() =>
              <JoinGamePage />
            } />
            <Route exact path='/playgame' render={() =>
              <GamePage />
            } />
            <Route exact path ='/signup' render={({history}) => 
              <SignupPage 
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
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
