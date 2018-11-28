import React from 'react';
import './FrontPage.css';
import { Link } from 'react-router-dom';

const FrontPage = props => {
    return (
        <div className="FrontPage">
            <div className="links">
                <Link to='/login'>LOG IN</Link>
            </div>
            <div>
                <div>W</div>
                <div>E</div>
                <div>L</div>
                <div>C</div>
                <div>O</div>
                <div>M</div>
                <div>E</div>
            </div>
            <div className="links">
                <Link to='/signup'>SIGN UP</Link>
            </div>
        </div>
    );
}

export default FrontPage;