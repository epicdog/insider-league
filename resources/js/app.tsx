import './bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/app.css';

import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)