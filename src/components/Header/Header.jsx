import React from 'react';
import './Header.css';
import UserCard from '../UserCard/UserCard';
import MiddleHeader from '../MiddleHeader/MiddleHeader';


const Header = props => {
    return (
        <div className="Header">
            <UserCard />
            <MiddleHeader />            
            <UserCard />
        </div>
    );
}

export default Header;