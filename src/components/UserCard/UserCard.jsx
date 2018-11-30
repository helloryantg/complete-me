import React from 'react';
import './UserCard.css';

const UserCard = props => {
    return (
        <div className="UserCard">
            {props.playerOneUser ? (
                <>
                    <p>{props.playerOneUser.time}</p>
                    <h4>{props.playerOneUser.name}</h4>
                </>
            ) : null
            }
            {props.playerTwoUser ? (
                <>
                    <p>{props.playerTwoUser.time}</p>
                    <h4>{props.playerTwoUser.name}</h4>
                </>
            ) : null
            }
        </div>
    );
}

export default UserCard;