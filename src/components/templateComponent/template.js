import React, {Component} from 'react';
import { BrowserRouter, Route, } from "react-router-dom";

import Login from '../loginComponent/login';
import Registro from '../registroComponent/registro';
import Home from '../homeComponent/home';

export default class Template extends Component{

    render(){
        return (
            <BrowserRouter>
                <React.Fragment>

                    <Route exact path="/">
                        <Home/>
                    </Route>

                    <Route exact path="/iniciarSesion">
                        <Login/>
                    </Route>

                    <Route exact path="/registro">
                        <Registro/>
                    </Route>

                </React.Fragment>
            </BrowserRouter>
        );
    }
}