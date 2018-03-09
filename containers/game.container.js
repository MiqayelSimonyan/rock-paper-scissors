import React, { Component } from 'react';

import PlayModeMiddleware from '../middlewars/play-mode.middleware';
import GameComponent from 'components/game.component';

export default class GameContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameFeatures: [
        { index: 1, name: 'Rock' },
        { index: 2, name: 'Paper' },
        { index: 3, name: 'Scissors' }
      ],
      gameScenes: [
        { scene1: 'scissors', scene2: 'rock', player1Win: false, player2Win: true },
        { scene1: 'scissors', scene2: 'paper', player1Win: true, player2Win: false },
        { scene1: 'scissors', scene2: 'scissors', player1Win: false, player2Win: false },
        { scene1: 'paper', scene2: 'scissors', player1Win: false, player2Win: true },
        { scene1: 'paper', scene2: 'rock', player1Win: true, player2Win: false },
        { scene1: 'paper', scene2: 'paper', player1Win: false, player2Win: false },
        { scene1: 'rock', scene2: 'scissors', player1Win: true, player2Win: false },
        { scene1: 'rock', scene2: 'paper', player1Win: false, player2Win: true },
        { scene1: 'rock', scene2: 'rock', player1Win: false, player2Win: false },
      ],
      finishGame: false,
      startGame: false,
      stopGame: false,
      currentResults: [],
      player1: { win: false, winResult: 0 },
      player2: { win: false, winResult: 0 }
    };
  }

  componentDidMount() {
    const gameType = PlayModeMiddleware.getPlayMode('playMode');
    if (gameType === 'Player vs Computer') {
      this.setState({ randomData: this.randomData().name, gameType });
    } else {
      this.setState({ gameType });
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  addSelectedFeature = selectedFeatureName => {
    if (!this.state.finishGame) {
      const randomData = this.randomData().name;
      this.setState(() => {
        return {
          selectedFeature: selectedFeatureName,
          randomData
        }
      });
      this.gameScene(selectedFeatureName, randomData);
      this.finishGame();
    }
  };

  randomData() {
    return this.state.gameFeatures[
      Math.floor(Math.random() * this.state.gameFeatures.length)
    ];
  }

  randomDataSecond() {
    return this.state.gameFeatures[
      Math.floor(Math.random() * this.state.gameFeatures.length)
    ];
  }

  onStartGame = () => {
    this.setState({ startGame: true });
    if (!this.state.startGame && (this.state.player1.winResult !== 10 && this.state.player2.winResult !== 10)) {
      this.intervalId = setInterval(() => {
        const randomData = this.randomData().name;
        const randomDataSecond = this.randomDataSecond().name;
        const winnerScene = this.winnerScene(randomData, randomDataSecond);

        this.setState(state => {
          return {
            randomData: randomData,
            randomDataSecond: randomDataSecond,
            player1: {
              win: winnerScene.player1Win,
              winResult: winnerScene.player1Win ? state.player1.winResult + 1 : state.player1.winResult,
            },
            player2: {
              win: winnerScene.player2Win,
              winResult: winnerScene.player2Win ? state.player2.winResult + 1 : state.player2.winResult,
            },
            stopGame: false,
            currentResults: [...state.currentResults, { player1: winnerScene.scene1, player2: winnerScene.scene2 }]
          }
        });

        this.finishGame();
      }, 2000);
    }
  }

  onStopGame = () => {
    clearInterval(this.intervalId);
    this.setState({ startGame: false, stopGame: true });
  }

  onFinishGame = () => {
    PlayModeMiddleware.DeletePlayMode('playMode');
    this.props.history.push('/');
  }

  onResetGame = () => {
    clearInterval(this.intervalId);
    this.setState({
      startGame: false,
      stopGame: false,
      finishGame: false,
      selectedFeature: '',
      player1: { win: false, winResult: 0 },
      player2: { win: false, winResult: 0 },
      currentResults: []
    });
  }

  finishGame() {
    if (this.state.player1.winResult === 10 || this.state.player2.winResult === 10) {
      clearInterval(this.intervalId);
      this.setState({ finishGame: true });
    }
  }

  gameScene(scene1, scene2) {
    const winnerScene = this.winnerScene(scene1, scene2);

    this.setState(state => {
      return {
        player1: {
          win: winnerScene.player1Win,
          winResult: winnerScene.player1Win ? state.player1.winResult + 1 : state.player1.winResult,
        },
        player2: {
          win: winnerScene.player2Win,
          winResult: winnerScene.player2Win ? state.player2.winResult + 1 : state.player2.winResult,
        },
        stopGame: false,
        currentResults: [...state.currentResults, { player1: winnerScene.scene1, player2: winnerScene.scene2 }]
      }
    });

  }

  winnerScene(scene1, scene2) {
    const { gameScenes } = this.state;
    return gameScenes.find(scene => scene.scene1 === scene1.toLowerCase() && scene.scene2 === scene2.toLowerCase());
  }

  render() {
    return (
      <GameComponent
        gameFeatures={this.state.gameFeatures}
        randomData={this.state.randomData}
        randomDataSecond={this.state.randomDataSecond}
        addSelectedFeature={this.addSelectedFeature}
        selectedFeature={this.state.selectedFeature}
        selectedItem={this.state.selectedItem}
        addSelectedItem={this.addSelectedItem}
        gameType={this.state.gameType}
        startGame={this.state.startGame}
        stopGame={this.state.stopGame}
        finishGame={this.state.finishGame}
        currentResults={this.state.currentResults}
        gameScene={this.gameScene}
        player1={this.state.player1}
        player2={this.state.player2}
        onStartGame={this.onStartGame}
        onStopGame={this.onStopGame}
        onFinishGame={this.onFinishGame}
        onResetGame={this.onResetGame}
      />
    );
  }
}