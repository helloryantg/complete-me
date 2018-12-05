import React from 'react';
import './Header.css';
import UserCard from '../UserCard/UserCard';
import MiddleHeader from '../MiddleHeader/MiddleHeader';

const Header = props => {
    return (
        <div className="Header">
            <UserCard 
                playerOneUser={props.game.players[0]}
                />
            <MiddleHeader 
                game={props.game}
                handleCancelClick={props.handleCancelClick}
                />            
            <UserCard 
                playerTwoUser={props.game.players[1]}
            />
        </div>
    );
}

export default Header;