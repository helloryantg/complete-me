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
import gameService from '../../utils/gameService';
import GameResultsPage from '../GameResultsPage/GameResultsPage';
import WaitingPage from '../WaitingPage/WaitingPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null
    }
  }

  /*----- Create/Join Game -----*/

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
    let game = this.state.game;
    let page;

    if (game && game.players.length === 2 && !game.players[0].time && !game.players[1].time) {
      // renders when there are 2 players and run has run out for both of them
      page = <GameResultsPage />
    } else if (game && game.players.length === 2) {
      // renders when there are 2 players and now the game is in play
      page = <GamePage 
        game={this.state.game}
        user={this.state.user}
      />;
    } else if (game && game.players.length === 1) {
      page = <WaitingPage game={this.state.game}/>
    } else {
      // no game
      // refreshing the game while on waiting doesn't do it
      page = <FrontPage 
        user={this.state.user}
        handleLogout={this.handleLogout} 
        handleCreateGameClick={this.handleCreateGameClick}
      />;
      // code is game id and 2nd player user id
    }

    return (
      <div className="App">
        <header>Complete Me!</header>
        <Router>
          <Switch>
            <Route exact path='/' render={() =>
              page
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
