import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App apiKey={"3750fc3b89c9ff609a6180bcc6ba8669"} username={"okend"} tracks={10} />, document.getElementById('react'));
registerServiceWorker();
