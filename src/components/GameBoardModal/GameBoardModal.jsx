import React from 'react';
import './GameBoardModal.css';

const GameBoardModal = props => {
    return (
        <div className="GameBoardModal">
            <p>Waiting for Player {props.game.turnIdx + 1}'s Move</p>
        </div>
    );
}

export default GameBoardModal;