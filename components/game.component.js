import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import GameCurrentResultComponent from 'components/game-results/game-current-result.component';
import PlayersWinnerResult from 'components/game-results/players-winner-result.component';
import GameFeatureComponent from 'components/game-features/game-feature.component';

const GameComponent = props => {
  const { gameFeatures, addSelectedFeature, randomData, randomDataSecond, selectedFeature,
    gameType, player1, player2, onStartGame, onStopGame, onResetGame, onFinishGame, startGame,
    stopGame, finishGame, currentResults } = props;

  return (
    <div className="container game_wrapper">
      <h2 className="gameTitle text-center">{gameType} <span onClick={onFinishGame}>Finish game</span></h2>
      <div className="d-flex flex-row flex-wrap justify-content-between">
        <div className="p-2 col-md-8">
          {gameType === 'Player vs Computer' ?
            <div>
              <ul>
                <ReactCSSTransitionGroup transitionName="game-features"
                  transitionAppear={true} transitionAppearTimeout={500}
                  transitionEnter={false} transitionLeave={false}>
                  {gameFeatures.map(item => {
                    return (
                      <GameFeatureComponent
                        click={addSelectedFeature.bind(null, item.name)}
                        key={item.index}
                        name={item.name}
                      />
                    );
                  })}
                </ReactCSSTransitionGroup>
              </ul>
            </div>
            : ''}
          <GameCurrentResultComponent
            selectedFeature={selectedFeature}
            randomData={randomData}
            randomDataSecond={randomDataSecond}
            player1={player1}
            player2={player2}
            onStartGame={onStartGame}
            onStopGame={onStopGame}
            onResetGame={onResetGame}
            startGame={startGame}
            stopGame={stopGame}
            finishGame={finishGame}
          />
        </div>
        <PlayersWinnerResult
          player1={player1}
          player2={player2}
          currentResults={currentResults}
        />
      </div>
    </div>
  );
};

GameComponent.propTypes = {
  gameFeatures: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number,
      name: PropTypes.string
    })
  ),
  addSelectedFeature: PropTypes.func,
  randomData: PropTypes.string,
  randomDataSecond: PropTypes.string,
  selectedFeature: PropTypes.string,
  gameType: PropTypes.string,
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
  onFinishGame: PropTypes.func,
  startGame: PropTypes.bool,
  stopGame: PropTypes.bool,
  finishGame: PropTypes.bool,
  currentResults: PropTypes.arrayOf(
    PropTypes.shape({
      player1: PropTypes.string,
      player2: PropTypes.string
    })
  )
};

export default GameComponent;