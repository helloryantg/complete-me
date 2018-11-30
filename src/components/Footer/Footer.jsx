import React from 'react';
import './Footer.css';
import PlayerWords from '../PlayerWords/PlayerWords';
import PlayerScore from '../PlayerScore/PlayerScore';
import PlayerTurn from '../PlayerTurn/PlayerTurn';

const Footer = props => {
    return (
        <div className="Footer">
                <PlayerWords playerOneList={props.game.players[0].wordList}/>
                <PlayerScore playerOneList={props.game.players[0].wordList}/>
                <PlayerTurn game={props.game}/>
                <PlayerScore playerTwoList={props.game.players[1].wordList}/>
                <PlayerWords playerTwoList={props.game.players[1].wordList}/>
        </div>
    );
}

export default Footer;