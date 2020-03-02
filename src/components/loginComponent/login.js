import React, {Component} from 'react';

import Logo from '../logoComponent/logo';

import './login.css';

export default class Login extends Component{

    render(){
        return (
            <div className="container">
                <div className="">
                    <Logo/>
                </div>
                <div className="contenido">
                    <center>
                        <h3>Iniciar Sesión</h3>
                        <h6>Hola de nuevo!</h6>
                    </center>
                </div>
                <div className="">
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email"></input>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password"></input>
                    </div>
                    <a href="/registro"><h6>No tienes cuanta?</h6></a>
                    <button className="btn btn-light">Ingresar</button>
                </div>
            </div>
        );
    }
}