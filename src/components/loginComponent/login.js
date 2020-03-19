import React, {Component} from 'react';
import { ACCESS_TOKEN } from '../../constants/index';

import Logo from '../logoComponent/logo';
import ModalCargando from '../modalCargandoComponent/modalCargando';
import LoginService from '../../services/loginService';



import './login.css';

export default class Login extends Component{

    constructor(){
        super();
        this.state = {
            correo: "",
            password: "",
            cargando: false,
            sesionIniciada : false
        };
        this.hadleChange = this.hadleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
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

    cerrarModal = function(){
        this.setState({
            correo: this.state.correo,
            password: this.state.password,
            cargando: false,
            sesionIniciada: this.state.sesionIniciada
        });
    }

    hadleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    handleSubmit = (event) => {
        // console.log(event.target);
        this.setState({
            correo: this.state.correo,
            password: this.state.password,
            cargando: true,
            sesionIniciada: this.state.sesionIniciada
        });
        event.preventDefault();

        var miInit = new Headers({
            method: 'POST'
        });

        var terminado = this.cerrarModal;

        var loginAceptado = function(token){
            localStorage.setItem(ACCESS_TOKEN, token);
            terminado();
            window.location="/";
        
        }

        var loginRechazado = function(){
            terminado();
            alert("login no aceptado");
        }

        new LoginService().login(this.state.correo,this.state.password, loginAceptado, loginRechazado, miInit);

        
    }

    render(){
        return (
            <React.Fragment>
                <ModalCargando
                modalIsOpen={this.state.cargando}
                />
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
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
                                <input name="correo" required onChange={this.hadleChange} type="email" className="form-control" placeholder="Email"></input>
                            </div>
                            <div className="form-group">
                                <input name="password" required onChange={this.hadleChange} type="password" className="form-control" placeholder="Password"></input>
                            </div>
                            <a href="/registro"><h6>No tienes cuanta?</h6></a>
                            <button className="btn btn-light">Ingresar</button>
                        </div>
                    </form>
                </div>
                                
            </React.Fragment>
            
        );
    }
}