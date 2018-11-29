import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import userService from '../../utils/userService';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pw: ''
    }
  }

  handleChange = (e) => {
    // TODO: implement in an elegant way
    this.setState({
        [e.target.name] : e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    userService.login(this.state)
      // successfully signed up - show GamePage
      .then(() => {
        this.props.handleSignupOrLogin();
        this.props.history.push('/');
      })
      // invalid user data
      .catch(err => alert('Invalid Credentials'));
  }

  render() {
    return (
      <div className="LoginPage">
        <div className="fp-letter-container">
          <div className="first-last letter-outer"><div className="letter-inner">L</div></div>
          <div className="letter-outer"><div className="letter-inner">O</div></div>
          <div className="first-last letter-outer"><div className="letter-inner">G</div></div>
          <div className="letter-outer"><div className="letter-inner">I</div></div>
          <div className="first-last letter-outer"><div className="letter-inner">N</div></div>
        </div>

        <form onSubmit={this.handleSubmit} >
          <div>
            <div>
              <input type="email" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
            </div>
          </div>
          <div>
            <div>
              <input type="password" placeholder="Password" value={this.state.pw} name="pw" onChange={this.handleChange} />
            </div>
          </div>
          <div>
            <div>
              <button>Log In</button>&nbsp;&nbsp;&nbsp;
              <Link to='/'>Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default LoginPage;
