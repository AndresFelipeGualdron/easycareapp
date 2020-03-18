import React, {Component} from 'react';

import LoginService from '../../services/loginService';

import Logo from '../logoComponent/logo';

export default class Registro extends Component{

    constructor(){
        super();
        this.verificarAutenticacion = this.verificarAutenticacion.bind(this);
        this.validacionCorrecta = this.validacionCorrecta.bind(this);
        this.validacionIncorrecta = this.validacionIncorrecta.bind(this);
        this.verificarAutenticacion();
    }

    //Verificar login

    verificarAutenticacion = function(e){
        var servicio = new LoginService();
        servicio.validate(this.validacionCorrecta,this.validacionIncorrecta);
    }

    validacionCorrecta = function(){
        // this.setClaseBoton("oculto");
        console.log("redireccionando...");
        window.location="/";
        
    }

    validacionIncorrecta = function(){
        // this.setClaseBoton("");
        
    }

    //Fin verificar login

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