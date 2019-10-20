import React from 'react';
import ReactDOM from 'react-dom';
import Meerkat from './Meerkat.js';
import { BrowserRouter } from "react-router-dom";

import 'pace-js';

import 'pace-js/themes/blue/pace-theme-center-simple.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-table/react-table.css';

ReactDOM.render(
  <BrowserRouter>
    <Meerkat />
  </BrowserRouter>,
  document.getElementById('meerkat')
);
