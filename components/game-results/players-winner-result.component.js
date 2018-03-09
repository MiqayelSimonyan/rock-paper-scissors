import React from 'react';
import PropTypes from 'prop-types';

import GameFeaturesIconsComponent from '../game-features/game-features-icons.component';
import '../../assets/styles/player-winner-result.scss';

const PlayersWinnerResult = (props) => {
    const { player1, player2, currentResults } = props;

    return (
        <div className="result p-2 col-md-3">
            <div><span>Player 1 total: {player1.winResult}</span></div>
            <div><span>Player 2 total: {player2.winResult}</span></div>

            {currentResults && currentResults.length ?
                <table className="current_results">
                    <thead>
                        <tr>
                            <th>current results</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentResults.map((currentResult, index) => {
                                return <tr key={index}>
                                    <td>
                                        <span className="player_name"> Player 1 </span>
                                        <GameFeaturesIconsComponent feature={currentResult.player1} /> -- <span className="player_name"> Player 2 </span>
                                        <GameFeaturesIconsComponent feature={currentResult.player2} />
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                : ''}
        </div>
    )
}

PlayersWinnerResult.propTypes = {
    player1: PropTypes.shape({
        win: PropTypes.bool,
        winResult: PropTypes.number
    }),
    player2: PropTypes.shape({
        win: PropTypes.bool,
        winResult: PropTypes.number
    }),
    currentResults: PropTypes.arrayOf(
        PropTypes.shape({
            player1: PropTypes.string,
            player2: PropTypes.string
        })
    )
};

export default PlayersWinnerResult;