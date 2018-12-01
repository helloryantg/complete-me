import React from 'react';
import './PlayerTurn.css';

const PlayerTurn = props => {
    return (
        <div className="PlayerTurn">
             {props.game.turnIdx % 2 === 0 ?
                <p id="turn">Player 1 Turn</p>
                :
             <p id="turn">Player 2 Turn</p>}
        </div>
    );
}

export default PlayerTurn;