import React, {Component, Suspense} from 'react';
import { BrowserRouter, Route, } from "react-router-dom";

import Login from '../loginComponent/login';
import Registro from '../registroComponent/registro';
import Home from '../homeComponent/home';

export default class Template extends Component{

    render(){
        return (
            <Suspense fallback={<div class="  spinner-border"></div>}>
                <BrowserRouter>
                    <React.Fragment>

                        <Route exact path="/">
                            <Home/>
                        </Route>

                        <Route exact path="/iniciarSesion">
                            <div className="container">
                                <Login/>
                            </div>
                        </Route>

                        <Route exact path="/registro">
                            <div className="container">
                                <Registro/>
                            </div>         
                        </Route>

                    </React.Fragment>
                </BrowserRouter>
            </Suspense>
            
        );
    }
}