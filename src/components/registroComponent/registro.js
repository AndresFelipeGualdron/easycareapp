import React, {Component} from 'react';

import Logo from '../logoComponent/logo';

export default class Registro extends Component{

    render(){
        return (
            <div className="container">
                <div className="">
                    <Logo/>
                </div>
                <div className="contenido">
                    <center>
                        <h3>Registrarse</h3>
                        <h6>Bienvenido!</h6>
                    </center>
                </div>
                <div>
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email"></input>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password"></input>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password again"></input>
                    </div>
                    <a href="/iniciarSesion"><h6>Ya teines cuenta?</h6></a>
                    <button className="btn btn-light">Enviar</button>
                </div>
            </div>
        );
    }
}