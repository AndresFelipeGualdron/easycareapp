import React, {Component} from 'react';
import { ACCESS_TOKEN } from '../../constants/index';
import LoginService from '../../services/loginService';

import './sectionLogin.css';

export default class SectionLogin extends Component{

    constructor(props){
        super();
        this.state = {
            claseBoton : "",
            nombreBotonRegistro: "Registrarse",
            linkRegistroLogout: "/registro",
            clientesPrueba: []
        }
        this.verificarAutenticacion = this.verificarAutenticacion.bind(this);
        this.validacionCorrecta = this.validacionCorrecta.bind(this);
        this.validacionIncorrecta = this.validacionIncorrecta.bind(this);
        this.cerrarSesion = this.cerrarSesion.bind(this);
        
        
    }

    componentWillMount = function(){
        this.verificarAutenticacion();
    }


    //VERIFICAR LOGIN


    verificarAutenticacion = function(e){
        var servicio = new LoginService();
        servicio.validate(this.validacionCorrecta,this.validacionIncorrecta);
    }
    validacionCorrecta = function(){
        // this.setClaseBoton("oculto");
        console.log("validacion correcta "+this);
        this.setState({
            claseBoton : "oculto",
            nombreBotonRegistro: "Cerrar Sesión",
            linkRegistroLogout: "/logout"
        });
        
    }

    validacionIncorrecta = function(){
        // this.setClaseBoton("");
        console.log("validacion incorrecta");
        this.setState({
            claseBoton : "",
            nombreBotonRegistro: "Registrarse",
            linkRegistroLogout: "/registro"
        });
    }

    //FIN VALIDACION LOGIN

    cerrarSesion = function(event){
        if(this.state.nombreBotonRegistro === "Cerrar Sesión"){
            event.preventDefault();
            localStorage.removeItem(ACCESS_TOKEN);
            this.verificarAutenticacion();
        }
        window.location.reload();
    }

    

    

    render(){
        return (
            <div className="col-lg-12">
                <center>
                    <div className="btnLogin">
                        <a href="/iniciarSesion">
                            <button className={"btn btn-outline btn-light btn-block "+this.state.claseBoton}>Iniciar Sesión</button>
                        </a>
                    </div>
                    <div className="btnLogin">
                        <a href={this.state.linkRegistroLogout}>
                        <button onClick={this.cerrarSesion} className={"btn btn-outline btn-light btn-block "}>{this.state.nombreBotonRegistro}</button>
                        </a>
                    </div>
                </center>
            </div>
        );
    }
}