import React from 'react';
import './Footer.css';
import PlayerWords from '../PlayerWords/PlayerWords';
import PlayerScore from '../PlayerScore/PlayerScore';
import PlayerTurn from '../PlayerTurn/PlayerTurn';

const Footer = props => {
    return (
        <div className="Footer">
                <PlayerWords game={props.game}/>
                <PlayerScore game={props.game}/>
                <PlayerTurn game={props.game}/>
                <PlayerScore game={props.game}/>
                <PlayerWords game={props.game}/>
        </div>
    );
}

export default Footer;