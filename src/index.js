import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
<<<<<<< HEAD
import { HashRouter } from "react-router-dom"
=======
import { HashRouter } from "react-router-dom";
>>>>>>> 7a1f7f2311f6770d3a3768e34cf1a221e0dac82b
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
