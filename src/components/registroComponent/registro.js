import React, {Component} from 'react';

import { ACCESS_TOKEN } from '../../constants/index';
import LoginService from '../../services/loginService';
import ModalCargando from '../modalCargandoComponent/modalCargando';

import Logo from '../logoComponent/logo';

export default class Registro extends Component{

    constructor(){
        super();
        this.state = {
            cargando : false,
            correo : "",
            password: "",
            rePassword: "",
            cedula: "",
            nombre: "",
            telefono: ""
        };


        this.verificarAutenticacion = this.verificarAutenticacion.bind(this);
        this.validacionCorrecta = this.validacionCorrecta.bind(this);
        this.validacionIncorrecta = this.validacionIncorrecta.bind(this);
        this.registrar = this.registrar.bind(this);
        this.hadleChange = this.hadleChange.bind(this);
        this.registroCorrecto = this.registroCorrecto.bind(this);
        this.registroIncorrecto = this.registroIncorrecto.bind(this);

    }

    componentWillMount = function(){
        this.verificarAutenticacion();
    }

    //Verificar login

    hadleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        });
    }

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

    //REGISTRO
    registrar(event){
        event.preventDefault();
        console.log(this.state.correo + " "+ this.state.password + " " + this.state.rePassword);
        
        if(this.state.password === this.state.rePassword){
            this.setState({
                cargando : true
            });
            var servicio = new LoginService();
            servicio.registrar(this.state.correo,this.state.password,this.state.nombre,this.state.cedula,this.state.telefono,this.registroCorrecto, this.registroIncorrecto);
        }else{
            alert("Las contraseñas no son iguales");
        }
        
    }

    registroCorrecto = function (token){
        localStorage.setItem(ACCESS_TOKEN, token);
        this.setState({
            cargando : false
        });
        this.verificarAutenticacion();
    }

    registroIncorrecto = function (error){
        this.setState({
            cargando : false
        });
        console.log(error);
        alert("No se pudo realizar el registro. Intentelo más tarde.");
    }

    //FIN REGISTRO

    render(){
        return (
            <React.Fragment>
                <ModalCargando
                modalIsOpen = {this.state.cargando}
                />
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
                    <div className="container">
                        <form onSubmit={this.registrar}>
                            <div className="form-group">
                                <input required type="email" name="correo" onChange={this.hadleChange} className="form-control" placeholder="Email"></input>
                            </div>
                            <div className="form-group">
                                <input required type="text" name="nombre" onChange={this.hadleChange} className="form-control" placeholder="Nombre"></input>
                            </div>
                            <div className="form-group">
                                <input required type="text" name="cedula" onChange={this.hadleChange} className="form-control" placeholder="Cedula"></input>
                            </div>
                            <div className="form-group">
                                <input required type="text" name="telefono" onChange={this.hadleChange} className="form-control" placeholder="Telefono"></input>
                            </div>
                            <div className="form-group">
                                <input required type="password" name="password" onChange={this.hadleChange} className="form-control" placeholder="Password"></input>
                            </div>
                            <div className="form-group">
                                <input required type="password" name="rePassword" onChange={this.hadleChange} className="form-control" placeholder="Password again"></input>
                            </div>
                            <a href="/iniciarSesion"><h6>Ya teines cuenta?</h6></a>
                            <button className="btn btn-light">Enviar</button>
                        </form>
                        
                    </div>
                </div>
            </React.Fragment>
            
        );
    }
}