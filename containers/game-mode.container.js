import React, { Component } from 'react';

import PlayModeMiddleware from '../middlewars/play-mode.middleware';
import GameModeListComponent from 'components/game-modes/game-mode-list.component';

export default class GameModeContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gameModes: [
                { index: 1, type: 'Player vs Computer' },
                { index: 2, type: 'Computer vs Computer' },
            ]
        }
    }

    onClick = (modeIndex) => {
        PlayModeMiddleware.setPlayMode('playMode', this.state.gameModes.find(mode => mode.index === modeIndex).type);
        this.props.history.push('/game');
    }

    render() {
        return (
            <GameModeListComponent
                gameModes={this.state.gameModes}
                click={this.onClick}
            />
        )
    }
}