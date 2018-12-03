import React from 'react';
import './GameBoardModal.css';

const GameBoardModal = props => {
    return (
        <div className="GameBoardModal">
            {props.player1 ? <p>Waiting for {props.game.players[1].name} move</p> : null}
            {props.player2 ? <p>Waiting for {props.game.players[0].name} move</p> : null}
        </div>
    );
}

export default GameBoardModal;