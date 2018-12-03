import React from 'react';
import './GameBoardModal.css';

const GameBoardModal = props => {
    return (
        <div className="GameBoardModal">
            {props.player2 ? <p>Waiting for {props.player2.name} move</p> : null}
            {props.player1 ? <p>Waiting for {props.player1.name} move</p> : null}
        </div>
    );
}

export default GameBoardModal;