import React from 'react';
import PropTypes from 'prop-types';

import GameModeComponent from 'components/game-modes/game-mode.component';
import 'assets/styles/game-mode.scss';

const GameModeListComponent = props => {
    const { gameModes, click } = props;

    return (
        <div className="container">
            <ul className="play_mode_wrapper">
                {
                    gameModes.map(mode => <GameModeComponent key={mode.index} click={click} index={mode.index} type={mode.type} />)
                }
            </ul>
        </div>
    )
}

GameModeListComponent.propTypes = {
    gameModes: PropTypes.arrayOf(
        PropTypes.shape({
            index: PropTypes.number,
            type: PropTypes.string
        })
    ),
    click: PropTypes.func
};

export default GameModeListComponent;