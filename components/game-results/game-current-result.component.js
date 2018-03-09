import React from 'react';
import PropTypes from 'prop-types';

import PlayModeMiddleware from '../../middlewars/play-mode.middleware';
import GameFeaturesIconsComponent from '../game-features/game-features-icons.component';
import '../../assets/styles/game-current-result.scss';

const GameCurrentResultComponent = (props) => {
    const { selectedFeature, randomData, randomDataSecond, player1, player2,
        onStartGame, onStopGame, onResetGame, startGame, stopGame, finishGame } = props;
        
    return (
        <div className="current_result">
            {selectedFeature && PlayModeMiddleware.getPlayMode('playMode') === 'Player vs Computer' ? <div>
                <div className="current_result_top">
                    <h5>Player 1</h5>
                    <h5>Player 2</h5>
                </div>
                <span><GameFeaturesIconsComponent feature={selectedFeature} /> ----------------  </span>
                <span>{selectedFeature ? <GameFeaturesIconsComponent feature={randomData} /> : ''}</span>
            </div> :
                PlayModeMiddleware.getPlayMode('playMode') === 'Computer vs Computer' ?
                    <div>
                        <div className="game_controls">
                            <button className="btn" onClick={onStartGame}>Play</button>
                            <button className="btn" onClick={onStopGame}>Stop</button>
                            <button className="btn" onClick={onResetGame}>Reset</button>
                        </div>
                        {startGame || stopGame ?
                            <div>
                                <div className="current_result_top">
                                    <h5>Player 1</h5>
                                    <h5>Player 2</h5>
                                </div>
                                <span><GameFeaturesIconsComponent feature={randomData || ''} /> ----------------  </span>
                                <span><GameFeaturesIconsComponent feature={randomDataSecond || ''} /></span>
                            </div>
                            : ''}
                    </div> : ''
            }
            {
                selectedFeature || startGame || stopGame ?
                    <div className="winner">{player1.win ? 'Player 1 win' : player2.win ? 'Player 2 win' : 'Draw'}</div>
                    : ''
            }
            {finishGame ?
                <div>
                    <h2>Finish Game</h2>
                    {PlayModeMiddleware.getPlayMode('playMode') === 'Player vs Computer' ?
                        <button className="btn" onClick={onResetGame}>
                            Play again
                    </button>
                        : ''}
                </div>
                : ''}
        </div>

    )
}

GameCurrentResultComponent.propTypes = {
    selectedFeature: PropTypes.string,
    randomData: PropTypes.string,
    randomDataSecond: PropTypes.string,
    player1: PropTypes.shape({
        win: PropTypes.bool,
        winResult: PropTypes.number
    }),
    player2: PropTypes.shape({
        win: PropTypes.bool,
        winResult: PropTypes.number
    }),
    onStartGame: PropTypes.func,
    onStopGame: PropTypes.func,
    onResetGame: PropTypes.func,
    startGame: PropTypes.bool,
    stopGame: PropTypes.bool,
    finishGame: PropTypes.bool
};

export default GameCurrentResultComponent;