import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";

import './index.css';

import App from './App';
import {store} from "./store";
import {BrowserRouter} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
</StrictMode>);
