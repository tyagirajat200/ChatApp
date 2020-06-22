import React from 'react'
import Routes from './Routes/Routes'
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from "react-redux";
import store from './store'

function App() {

    return (
        <Provider store={store}>
        <div >
            <BrowserRouter>
            <Routes/>
            </BrowserRouter>
           
        </div>
        </Provider>
    )
}

export default App
