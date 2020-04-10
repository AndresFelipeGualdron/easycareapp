import React, {Component} from 'react';

export default class Bienvenida extends Component{

    constructor(props){
        super(props);
        this.paseadoresClick = this.paseadoresClick.bind(this);
        this.paseadoresClick = this.paseadoresClick.bind(this);
    }

    paseadoresClick = function(event){
        event.preventDefault();
        console.log("hola");
        window.location = "/paseadores";
    }

    quieroPaseoClick = function(event){
        event.preventDefault();
        window.location = "/menuPaseo";
    }

    serPaseadorClick = function(event){
        event.preventDefault();
        window.location = "https://arsw-easycareapp-paseadores.herokuapp.com/";
    }

    render(){
        return (
            <div className="row">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-4">
                            <center>
                                <img alt="perritos" src="/img/perrosInicio.PNG" className="img img-responsive col-lg-12" />
                                <button onClick = {this.quieroPaseoClick} className="btn btn-outline btn-light col-lg-12">!Quiero un paseo!</button>
                            </center>
                        </div>
                        <div className="col-md-12 col-lg-4">
                            <h4>¿Quieres ser uno de nuestros paseadores?</h4>
                            <h6>easyCare te brinda la oportunidad de ser uno de nuestros paseadores y poder acceder a las subastas de paseo.</h6>
                            <button onClick={this.serPaseadorClick} className="btn btn-outline btn-light col-lg-12">¡Se uno de nuestros paseadores!</button>
                        </div>
                        <div className="col-md-12 col-lg-4">
                            <img alt="paseador" src="/img/paseadorInicio.PNG" className="img img-responsive col-lg-12"/>
                            <button onClick = {this.paseadoresClick} className="btn btn-outline btn-light col-lg-12">Paseadores</button>
                        </div>
                    </div>
                    
                </div>
            </div>
            
        );
    }
}