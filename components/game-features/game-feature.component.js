import React from 'react';
import PropTypes from 'prop-types';

import GameFeaturesIconsComponent from './game-features-icons.component';
import 'assets/styles/game-features.scss';

const GameFeatureComponent = props => {
  const { name, click } = props;

  return <li onClick={click}>
    <GameFeaturesIconsComponent feature={name} />
  </li>;
};

GameFeatureComponent.propTypes = {
  name: PropTypes.string,
  click: PropTypes.func
};

export default GameFeatureComponent;
