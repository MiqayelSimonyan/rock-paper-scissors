import React from 'react';
import PropTypes from 'prop-types';

const GameModeComponent = props => {
    const { index, type, click } = props;

    return (
        <li onClick={click.bind(null, index)}>
            {type}
        </li>
    )
}

GameModeComponent.propTypes = {
    index: PropTypes.number,
    type: PropTypes.string,
    click: PropTypes.func
};

export default GameModeComponent;