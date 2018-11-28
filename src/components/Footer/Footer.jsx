import React from 'react';
import './Footer.css';
import PlayerWords from '../PlayerWords/PlayerWords';
import PlayerScore from '../PlayerScore/PlayerScore';
import PlayerTurn from '../PlayerTurn/PlayerTurn';

const Footer = props => {
    return (
        <div className="Footer">
                <PlayerWords />
                <PlayerScore />
                <PlayerTurn />
                <PlayerScore />
                <PlayerWords />
        </div>
    );
}

export default Footer;