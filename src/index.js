import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'tachyons';
import ReactRouter from 'react-dom';

ReactDOM.render(
  // <ReactRouter>
  <App />,
  // </ReactRouter>,
  document.getElementById('root')
);
registerServiceWorker();
