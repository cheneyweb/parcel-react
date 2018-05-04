import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from 'mobx-react'
import rs from './stores/root'
import App from './components/App.js'

window.rs = rs

ReactDOM.render(
    <Provider rs={rs}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('app')
)