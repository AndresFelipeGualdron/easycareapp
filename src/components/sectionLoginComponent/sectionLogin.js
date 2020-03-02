import React, {Component} from 'react';

import './sectionLogin.css';

export default class SectionLogin extends Component{

    render(){
        return (
            <div className="col-lg-12">
                <center>
                    <div className="btnLogin">
                        <a href="/iniciarSesion">
                            <button className="btn btn-outline btn-light btn-block">Iniciar Sesión</button>
                        </a>
                    </div>
                    <div className="btnLogin">
                        <a href="/registro">
                            <button className="btn btn-outline btn-light btn-block">Registrarse</button>
                        </a>
                    </div>
                </center>
            </div>
        );
    }
}