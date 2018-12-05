import React from 'react';
import './MiddleHeader.css';
import { Link } from 'react-router-dom';
import Challenge from '../Challenge/Challenge';

const MiddleHeader = props => {
    return (
        <div className="MiddleHeader">
            <Link onClick={props.handleCancelClick} className="links quit" to='/'>QUIT GAME</Link>
            <h2>CHALLENGES</h2>
            <Challenge game={props.game} />
        </div>
    );
}

export default MiddleHeader;