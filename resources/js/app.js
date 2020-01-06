import React from 'react';
import ReactDOM from 'react-dom';
import Meerkat from './Meerkat';
import { BrowserRouter } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import 'react-table/react-table.css';

ReactDOM.render(
  <BrowserRouter>
    <Meerkat />
  </BrowserRouter>,
  document.getElementById('meerkat')
);
