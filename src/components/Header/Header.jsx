import React from 'react';
import './Header.css';
import UserCard from '../UserCard/UserCard';
import MiddleHeader from '../MiddleHeader/MiddleHeader';

const Header = props => {
    return (
        <div className="Header">
            <UserCard 
                game={props.game}
                />
            <MiddleHeader 
                game={props.game}
                />            
            <UserCard 
                game={props.game}
            />
        </div>
    );
}

export default Header;