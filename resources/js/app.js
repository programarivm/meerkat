import React from 'react';
import ReactDOM from 'react-dom';
import Meerkat from './Meerkat.js';
import { HashRouter } from "react-router-dom";

import 'pace-js';

import 'pace-js/themes/blue/pace-theme-center-simple.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-table/react-table.css';

ReactDOM.render(
  <HashRouter>
    <Meerkat />
  </HashRouter>,
  document.getElementById('meerkat')
);
