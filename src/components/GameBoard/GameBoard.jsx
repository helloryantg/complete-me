import React, { Component } from 'react';
import './GameBoard.css';
import socket from '../../utils/socket';

class GameBoard extends Component {
    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            socket.emit('onEnter');
        } else if (e.keyCode >= 65 && e.keyCode <= 90) {
            socket.emit('characterPressed', e.key.toUpperCase());            
        } else if (e.keyCode === 8) {
            socket.emit('backspace');
        }
    }

    generateRandomLetter = () => {
        var letter;
        var characters = "abcdefghijklmnopqrstuvwxyz"
        var randomNumber = Math.floor(Math.random() * characters.length);
        letter = characters[randomNumber];
        return letter.toUpperCase();
    }
    
    /*----- Lifecycle Methods -----*/

    componentDidMount() {
        window.document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.document.removeEventListener('keydown', this.handleKeyDown);
    }

    render() {
        let player = this.props.game.players;
        if (player[this.props.game.turnIdx] % 2 === 0) {
            player[0].wordList[player[0].wordList.length - 1].split('').map((letter, idx) => 
                <div key={idx} className="letter">{letter}</div>)
        } else if (player[this.props.game.turnIdx] % 2 === 1) {
            player[1].wordList[player[1].wordList.length - 1].split('').map((letter, idx) => 
                <div key={idx} className="letter">{letter}</div>)
        }

        return (
            <div className="GameBoard" onKeyDown={this.handleKeyDown}>
                <div className="fp-letter-container">
                    {this.props.game.currentWord.split('').map((letter, idx) => 
                        <div key={idx} className="letter">{letter}</div>
                    )}
                </div>
                <input className="current-word" type="text" name="currentWord" onChange={this.handleChange} autoFocus/>
            </div>
        );
    }
}

export default GameBoard;