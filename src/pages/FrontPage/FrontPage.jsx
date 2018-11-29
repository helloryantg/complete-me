import React from 'react';
import './FrontPage.css';
import { Link } from 'react-router-dom';
// import Instructions from '../../components/Instructions/Instructions';

const FrontPage = props => {
    let frontPage = props.user ?
        <div>
            <div className="fp-letter-container">
                <div className="first-last letter-outer"><div className="letter-inner">N</div></div>
                <div className="letter-outer"><div className="letter-inner">E</div></div>
                <div className="first-last letter-outer"><div className="letter-inner">W</div></div>
            </div>
            
            <div className="fp-letter-container">
                <div className="first-last letter-outer"><div className="letter-inner">G</div></div>
                <div className="letter-outer"><div className="letter-inner">A</div></div>
                <div className="first-last letter-outer"><div className="letter-inner">M</div></div>
                <div className="letter-outer"><div className="letter-inner">E</div></div>
            </div>

            <div className="links create-game">
                <button onClick={props.handleCreateGameClick}>CREATE GAME</button>
            </div>
            <div className="links join-game">
                <Link to='/join'>JOIN GAME</Link>
            </div>
            <div className="links logout">
                <Link to='' onClick={props.handleLogout}>LOG OUT</Link>
            </div>
        </div>
        :
        <div>
            <div className="login-signup">
                <div className="fp-letter-container">
                    <div className="first-last letter-outer"><div className="letter-inner">W</div></div>
                    <div className="letter-outer"><div className="letter-inner">E</div></div>
                    <div className="first-last letter-outer"><div className="letter-inner">L</div></div>
                    <div className="letter-outer"><div className="letter-inner">C</div></div>
                    <div className="first-last letter-outer"><div className="letter-inner">O</div></div>
                    <div className="letter-outer"><div className="letter-inner">M</div></div>
                    <div className="first-last letter-outer"><div className="letter-inner">E</div></div>
                </div>

                <div className="links login">
                    <Link to='/login'>LOG IN</Link>
                </div>
                <div className="links signup">
                    <Link to='/signup'>SIGN UP</Link>
                </div>
            </div>
        </div>;
    
    return (
        <div className="FrontPage">
            {frontPage}
        </div>
    );
}

export default FrontPage;