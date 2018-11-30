import React from 'react';
import './MiddleHeader.css';
import Challenge from '../Challenge/Challenge';

const MiddleHeader = props => {
    return (
        <div className="MiddleHeader">
            <h2>CHALLENGES</h2>
            <Challenge game={props.game} />
        </div>
    );
}

export default MiddleHeader;