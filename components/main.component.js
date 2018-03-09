import React from 'react';
import {
    Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { createMemoryHistory } from 'history';

import PlayModeMiddleware from '../middlewars/play-mode.middleware';
import GameModeContainer from '../containers/game-mode.container';
import GameContainer from '../containers/game.container';
import pageNotFoundComponent from './page-not-found.component';

var history;
if (typeof (window) !== 'undefined') {
    history = createBrowserHistory();
} else {
    history = createMemoryHistory();
}

const MainComponent = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={GameModeContainer} />
                <Route exact path="/game"
                    render={props => {
                        return PlayModeMiddleware.isPlayModeChosen('playMode') ? (
                            <GameContainer {...props} />
                        ) : (
                                <Redirect to={{
                                    pathname: '/',
                                    state: { from: props.location }
                                }} />
                            )
                    }} />
                <Route component={pageNotFoundComponent} />
            </Switch>
        </Router>
    )
}

export default MainComponent;