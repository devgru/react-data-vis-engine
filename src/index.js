import React from 'react';
import ReactDOM from 'react-dom';
import './examples/index.css';
import App from './examples/App';
import registerServiceWorker from './examples/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
