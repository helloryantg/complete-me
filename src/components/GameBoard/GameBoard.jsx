import React, { Component } from 'react';
import './GameBoard.css';
// import GameBoardModal from '../GameBoardModal/GameBoardModal';
import socket from '../../utils/socket';

class GameBoard extends Component {
    
    handleKeyDown = (e) => {
        // current player
        if (e.key === 'Enter') {
            socket.emit('onEnter');
                    
        } else if (e.keyCode >= 65 && e.keyCode <= 90) {
            socket.emit('characterPressed', e.key.toUpperCase());            
        } else if (e.keyCode === 8) {
            socket.emit('onBackspace');
        }
    }

    startTimer = () => {
        this.timer = setInterval(this.countDown, 1000);
    }

    countDown = () => {
        socket.emit('countDown');
        
        if (!this.props.game.players[0].time || !this.props.game.players[1].time) {
            clearInterval(this.timer);
        }
    }
    
    /*----- Lifecycle Methods -----*/

    componentDidMount() {
        window.document.addEventListener('keydown', this.handleKeyDown);
        if (this.props.game.players[0].id === this.props.user._id) this.startTimer();
    }

    componentWillUnmount() {
        window.document.removeEventListener('keydown', this.handleKeyDown);
    }

    render() {
        var game = this.props.game;
        var mergedList = [];

        game.players[0].wordList.forEach(function(wordObj, idx) {
            mergedList.push(wordObj.word);
            if (game.players[1].wordList[idx]) mergedList.push(game.players[1].wordList[idx]);
        });

        return (
            <div className="GameBoard" onKeyDown={this.handleKeyDown}>
                <div className="fp-letter-container">
                    
                    {/* {this.props.game.players[this.props.game.turnIdx].id === this.props.user._id ? null : <GameBoardModal game={this.props.game} />} */}
                    
                    {/* {mergedList.length > 2 ? mergedList.forEach(w => w.word.split('').map((wo, idx) => <div key={idx} className="letter">{wo}</div>)) : null} */}
                    
                    {game.currentWord.split('').map((letter, idx) =>
                        <div key={idx} className="letter">{letter}</div>
                    )}
                </div>
                <input className="current-word" type="text" name="currentWord" onChange={this.handleChange} autoFocus/>
            </div>
        );
    }
}

export default GameBoard;

