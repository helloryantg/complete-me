import React, { Component } from 'react';
import './FrontPage.css';
import { Link } from 'react-router-dom';
// import Instructions from '../../components/Instructions/Instructions';

class FrontPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameCode: ''
        }
    }

    handleChange = (e) => {
        this.props.updateMessage('');
        this.setState({
            [e.target.gameCode]: e.target.value
        })
    }

    render() {
        let frontPage = this.props.user ?
        <div>
            <div className="fp-letter-container">
                <div className="first-last letter">N</div>
                <div className="letter">E</div>
                <div className="first-last letter">W</div>
            </div>
            <div className="fp-letter-container">
                <div className="first-last letter">G</div>
                <div className="letter">A</div>
                <div className="first-last letter">M</div>
                <div className="letter">E</div>
            </div>

            <div className="links create-game">
                <Link onClick={this.props.handleCreateGameClick} to='/'>CREATE GAME</Link>
            </div>

            <div className="orange">OR</div>

            <input className="code-input" type="text" placeholder="Game Code" name="gameCode" value={this.state.gameCode} onChange={this.handleChange}/>
            <button onClick={this.props.handleJoinGameClick} className="links join-game">JOIN GAME</button>

            <div className="links logout">
                <Link to='' onClick={this.props.handleLogout}>LOG OUT</Link>
            </div>
        </div>
        :
        <div>
            <div className="login-signup">
                <div className="fp-letter-container welcome">
                    <div className="first-last letter">W</div>
                    <div className="letter">E</div>
                    <div className="first-last letter">L</div>
                    <div className="letter">C</div>
                    <div className="first-last letter">O</div>
                    <div className="letter">M</div>
                    <div className="first-last letter">E</div>
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
        )
    }
}

export default FrontPage;