import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter, } from "react-router-dom"
import { ColorModeContextProvider } from "./context/ColorModeContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <ColorModeContextProvider>
        <BrowserRouter basename='/Tomer-Avraham-31-08-2022' >
          <App/>
        </BrowserRouter>    
      </ColorModeContextProvider>
    </Provider>
  </React.StrictMode>
);
