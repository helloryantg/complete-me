import React from 'react';
import './Header.css';
import UserCard from '../UserCard/UserCard';
import MiddleHeader from '../MiddleHeader/MiddleHeader';

const Header = props => {
    return (
        <div className="Header">
            <UserCard 
                user1={props.user[0]}
            />
            <MiddleHeader 
                game={props.game}
            />            
            <UserCard 
                user2={props.user[1]}
            />
        </div>
    );
}

export default Header;