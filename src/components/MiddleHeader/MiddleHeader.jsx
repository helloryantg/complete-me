import React from 'react';
import './MiddleHeader.css';
import Challenge from '../Challenge/Challenge';
import Timer from '../Timer/Timer';

const MiddleHeader = props => {
    return (
        <div className="MiddleHeader">
            <div id="timer-container">
                <Timer />
                <Timer />
            </div>
            <h2>CHALLENGES</h2>
            <Challenge />
        </div>
    );
}

export default MiddleHeader;