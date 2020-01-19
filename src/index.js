import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from './styles/GlobalStyle';
import App from './App';
import themes from './styles/themes';

ReactDOM.render(
  <>
    <GlobalStyle />
    <App themes={themes} />
  </>,
  document.getElementById('root')
);
