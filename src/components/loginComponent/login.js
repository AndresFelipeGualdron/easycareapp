import React, {Component} from 'react';

import Logo from '../logoComponent/logo';
import ModalCargando from '../modalCargandoComponent/modalCargando';
import RequestService from '../../services/requestService';

import './login.css';

export default class Login extends Component{

    constructor(){
        super();
        this.state = {
            correo: "",
            password: "",
            cargando: false
        };
        this.hadleChange = this.hadleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
        
    }

    cerrarModal = function(){
        this.setState({
            correo: this.state.correo,
            password: this.state.password,
            cargando: false
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
            cargando: true
        });

        new RequestService().saludar();
        

        event.preventDefault();
        var miInit = {
            method: 'POST'
        };

        var terminado = this.cerrarModal;

        var loginAceptado = function(usuario){
                        
        }
    
        var loginRechazado = function(){
            alert("login no aceptado");
        }

        // fetch("http://localhost:8080/client/login/?correo="+this.state.correo+"&"+"password="+this.state.password,miInit)
        // .then(function(response){
        //     terminado();
        //     if(response.ok) return response.json();
        //     loginRechazado();
        // })
        // .then(function(response){
        //     console.log(response);
        //     loginAceptado(response);
        // })
        // .catch(function(error){
        //     console.log(error);
        // });
    }

    render(){
        return (
            <React.Fragment>
                <ModalCargando
                modalIsOpen={this.state.cargando}
                />
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
            </React.Fragment>
            
        );
    }
}