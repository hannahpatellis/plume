import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';

ReactDom.render(<App />, document.getElementById('react-app'));

registerServiceWorker();