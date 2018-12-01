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
            socket.emit('onBackspace');
        }
    }
    
    /*----- Lifecycle Methods -----*/

    componentDidMount() {
        window.document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.document.removeEventListener('keydown', this.handleKeyDown);
    }

    render() {
        var game = this.props.game;
        var mergedList = [];
        // if (this.props.game.players[0].wordList && this.props.game.players[1].wordList) {
        //     mergedList = this.props.game.players[0].wordList.map(function(v, i) {
        //         return [v.word, this.props.game.players[1].wordList[i]]
        //     }).reduce(function(a, b) {
        //         return a.concat(b)
        //     });
        // } else {
        //     mergedList = null;
        // }

        game.players[0].wordList.forEach(function(wordObj, idx) {
            mergedList.push(wordObj.word);
            if (game.players[1].wordList[idx]) mergedList.push(game.players[1].wordList[idx]);
        });

        console.log(mergedList)

        return (
            <div className="GameBoard" onKeyDown={this.handleKeyDown}>
                <div className="fp-letter-container">
                    {/* {this.props.game.players[0].wordList && this.props.game.players[1].wordList ? 
                        mergedList.forEach(word => word.split('').map((w, idx) => <div key={idx} className="letter">{w}</div>))
                        :
                        null
                    } */}

                    {/* {this.props.game.players[0].wordList.map(function(v, i) { 
                        return [v, this.props.game.players[1].wordList[i]]}).reduce(function(a, b) {
                            return a.concat(b)
                        }).forEach(word => 
                            word.split('').map((w, idx) => <div key={idx} className="letter">{w}</div>)
                        )
                    } */}
                    
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

