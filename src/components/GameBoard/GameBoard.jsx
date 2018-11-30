import React, { Component } from 'react';
import './GameBoard.css';
// import Letter from '../Letter/Letter';

class GameBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWord: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            currentWord: e.target.value
        })
    }

    handleWordSubmit = (e) => {
        // Submit the word when enter is pressed
        // console.log('Submit: ' + currentWord);
    }
    
    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.handleWordSubmit();
            this.setState({
                currentWord: ''
            })
            // This is where to check if the word is correct    
        }
    }

    render() {
        return (
            <div className="GameBoard">
                <div className="fp-letter-container">
                    {this.state.currentWord.toUpperCase().split('').map(letter => 
                        <div className="letter">{letter}</div>
                    )}
                </div>
                <input className="current-word" type="text" name="currentWord" value={this.state.currentWord} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
            </div>
        );
    }
}

export default GameBoard;