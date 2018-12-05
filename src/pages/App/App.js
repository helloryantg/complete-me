import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
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
import Instructions from '../../components/Instructions/Instructions';

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

  handleCancelClick = (e) => {
    e.preventDefault();
    gameService.cancelGame(this.state.user);
  }
  
  handleLogout = () => {
    userService.logout();
    this.setState({user: null});
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }

  sendGameData = () => {
    socket.emit('gameData', this.state.game);
  }

  /*----- Lifecycle Methods -----*/

  componentDidMount() {
    let user = userService.getUser();
    this.setState({user});

    if (user) socket.emit('getActiveGame', user._id);

    socket.on('gameData', (game) => {
      this.setState({game});
    });
  }
  
  render() {
    let game = this.state.game;
    let page;

    if (game && game.players.length === 2 && !game.players[0].time && !game.players[1].time) {
      page = <GameResultsPage 
        game={this.state.game}
        user={this.state.user}
        handleCancelClick={this.handleCancelClick}
      />
    } else if (game && game.players.length === 2) {
      page = <GamePage 
        game={this.state.game}
        user={this.state.user}
        handleCancelClick={this.handleCancelClick}
      />;
    } else if (game && game.players.length === 1) {
      page = <WaitingPage 
        game={this.state.game}
        handleCancelClick={this.handleCancelClick}
      />
    } else {
      page = <FrontPage 
        user={this.state.user}
        handleLogout={this.handleLogout} 
        handleCreateGameClick={this.handleCreateGameClick}
      />;
    }

    return (
      <div className="App">
        <header>Complete Me!</header>
        <Router>
          <Switch>
            <Route exact path='/' render={() =>
              page
            } />
            <Route exact path='/instructions' render={() =>
              <Instructions />
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
