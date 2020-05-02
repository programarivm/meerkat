import React from 'react';
import ReactDOM from 'react-dom';
import Meerkat from '@/Meerkat';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Meerkat />
  </BrowserRouter>,
  document.getElementById('meerkat')
);
