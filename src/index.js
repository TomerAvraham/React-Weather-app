import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { HashRouter } from "react-router-dom"
import { ColorModeContextProvider } from "./context/ColorModeContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <ColorModeContextProvider>
        <HashRouter  >
          <App/>
        </HashRouter>    
      </ColorModeContextProvider>
    </Provider>
  </React.StrictMode>
);
