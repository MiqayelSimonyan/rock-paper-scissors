import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import MainComponent from './components/main.component';

const renderApp = Component => {
  render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.querySelector('#container')
  );
};

renderApp(MainComponent);

if (module.hot) {
  module.hot.accept('components/main.component', () => {
    renderApp(MainComponent);
  });
}
