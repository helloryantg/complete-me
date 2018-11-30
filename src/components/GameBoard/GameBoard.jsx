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

    componentDidMount() {
        window.document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.document.removeEventListener('keydown', this.handleKeyDown);
    }

    render() {
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