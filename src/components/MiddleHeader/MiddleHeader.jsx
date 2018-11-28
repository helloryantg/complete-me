import React from 'react';
import './MiddleHeader.css';
import { Link } from 'react-router-dom';
import Challenge from '../Challenge/Challenge';

const MiddleHeader = props => {
    return (
        <div className="MiddleHeader">
            <Link to='/login'>LOG IN</Link>
            <Link to='/signup'>SIGN UP</Link>
            <p>This is the MiddleHeader component</p>
            <h2>BONUS</h2>
            <Challenge />
        </div>
    );
}

export default MiddleHeader;