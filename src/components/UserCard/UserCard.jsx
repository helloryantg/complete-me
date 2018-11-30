import React from 'react';
import './UserCard.css';

const UserCard = props => {
    return (
        <div className="UserCard">
            <p>{props.game.players[0].time}</p>
            <h4>{props.game.players[0].name}</h4>
        </div>
    );
}

export default UserCard;