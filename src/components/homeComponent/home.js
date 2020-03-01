import React, {Component} from 'react';
import { BrowserRouter, Route, } from "react-router-dom";

import Bienvenida from '../bienvenidaComponent/bienvenida';
import Login from '../loginComponent/login';
import Registro from '../registroComponent/registro';

export default class Home extends Component{


    render(){
        return (
            <BrowserRouter>
                <React.Fragment>

                    <Route exact path="/">
                        <Bienvenida/>
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