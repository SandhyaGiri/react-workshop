import React from 'react';
import ReactDOM from 'react-dom';
import App from './workshop1/App';

import './index.css';

ReactDOM.render(<App pollInterval={50000}/>, document.getElementById('root'));
