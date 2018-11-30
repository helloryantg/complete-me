import React from 'react';
import './GamePage.css';
import Header from '../../components/Header/Header';
import GameBoard from '../../components/GameBoard/GameBoard';
import Footer from '../../components/Footer/Footer';

const GamePage = props => {
    return (
        <div className="GamePage">
            <Header 
                game={props.game}
                user={props.user}
                />
            <GameBoard 
                game={props.game}
                user={props.user}
                />
            <Footer 
                game={props.game}
                user={props.user}
            />
        </div>
    );
}

export default GamePage;