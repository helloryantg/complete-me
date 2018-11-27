import React from 'react';
import { Link } from 'react-router-dom';

const GamePage = props => {
    return (
        <div className="GamePage">
            <Link to='/login'>LOG IN</Link>
            <Link to='/signup'>SIGN UP</Link>
        </div>
    );
}

export default GamePage;