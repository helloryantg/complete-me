import React, { Component } from 'react';
import './GameBoard.css';
import GameBoardModal from '../GameBoardModal/GameBoardModal';
import socket from '../../utils/socket';

const API_URL = 'http://api.datamuse.com/words?'

class GameBoard extends Component {
    
    handleKeyDown = (e) => {
        // current player
        if (e.key === 'Enter') {
            const game = this.props.game;

            // Check the API to see if the word exists/spelled correctly
            fetch(`${API_URL}sp=${game.currentWord}`)
                .then(res => res.json())
                .then(words => checkForMatch(words)); // refactor

            function checkForMatch(words) {
                if (words === [] || words === '') return; // this does not work
                
                var match = words.find(w => w.word.toUpperCase() === game.currentWord);
                if (match) {
                    checkChallenges(match);
                } else {
                    // Remove currentWord and leave last letter of previous word
                    game.currentWord = game.currentWord[0];
                    socket.emit('noMatch');
                }
            }
            
            function checkChallenges(word) {
                if (game.challenges.forEach(challenge => challenge.challengeCode === 0))

                if (game.challenges.challengeCode === 0) {
                    // if the first and last letter are the same
                    if (word[0] === word[word.length - 1]) {
                        socket.emit('onEnter', 0);
                        // not working
                    }
                } else if (game.challenges.challengeCode === 1) {
                    // if the word is 7 characters long
                    if (word.length === 7) {
                        socket.emit('onEnter', 1);
                    }
                } else if (game.challenges.challengeCode === 2) {
                    // if the word is associated with dogs
                    var matchDogs = fetch(`${API_URL}rel_trg=dogs`)
                        .then(res => res.json())
                        .then(words => words.find(w => w.word.toUpperCase() === game.currentWord));
                    if (matchDogs) socket.emit('onEnter', 2);
                } else if (game.challenges.challengeCode === 3) {
                    // if the word is associated with ghosts
                    var matchGhosts = fetch(`${API_URL}rel_trg=ghosts`)
                        .then(res => res.json())
                        .then(words => words.find(w => w.word.toUpperCase() === game.currentWord));
                    if (matchGhosts) socket.emit('onEnter', 3);
                } else {
                    socket.emit('onEnter', 99); // give random code to use default multiplier
                }
            }

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

        console.log(mergedList);

        return (
            <div className="GameBoard" onKeyDown={this.handleKeyDown}>
                <div className="fp-letter-container">
                    
                    {/* Render GameBoardModal when it is not the player's turn */}
                    {/* {game.turnIdx ? 
                        <GameBoardModal game={this.props.game} player1={this.props.game.players[0]}/>
                        : 
                        <GameBoardModal game={this.props.game} player2={this.props.game.players[1]}/>}
                     */}
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

