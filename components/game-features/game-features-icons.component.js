import React from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faHandRock from '@fortawesome/fontawesome-free-solid/faHandRock';
import faHandPaper from '@fortawesome/fontawesome-free-solid/faHandPaper';
import faHandScissors from '@fortawesome/fontawesome-free-solid/faHandScissors';

const GameFeaturesIconsComponent = (props) => {
    const { feature } = props;
    return (
        <span>
            {feature.toLowerCase() === 'paper' ?
                <span><FontAwesomeIcon icon={faHandPaper} /></span> :
                feature.toLowerCase() === 'rock' ?
                    <span><FontAwesomeIcon icon={faHandRock} /></span> :
                    feature.toLowerCase() === 'scissors' ?
                        <span><FontAwesomeIcon icon={faHandScissors} /></span> : ''}
        </span>
    )
}

export default GameFeaturesIconsComponent;