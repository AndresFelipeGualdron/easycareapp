import React, {Component} from 'react';

import RequestService from '../../services/requestService';

export default class Bienvenida extends Component{

    constructor(){
        super();
        this.state = {
            clientesPrueba : []
        };

        //PROBAR REQUEST
        this.probarRequest = this.probarRequest.bind(this);
        this.probarCorrecto = this.probarCorrecto.bind(this);
        this.probarIncorrecto = this.probarIncorrecto.bind(this);
        this.probarRequest();
        //FIN PROBAR REQUEST
    }


    //PROBAR REQUEST

    probarRequest = function(){
        var servicio = new RequestService();
        servicio.request(this.probarCorrecto, this.probarIncorrecto,"GET","/clients");
    }

    probarCorrecto = function(data){
        console.log("Sisas desde la prueba");
        this.setState({
            clientesPrueba : data
        });
        console.log(this.state.clientesPrueba);
    }

    probarIncorrecto = function(error){
        console.log("Nocas desde la prueba");
    }

    //FIN DE PROBAR REQUEST

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-lg-4">
                        <center>
                            <img alt="perritos" src="/img/perrosInicio.PNG" className="img img-responsive col-lg-12" />
                            <button className="btn btn-outline btn-light col-lg-12">!Quiero un paseo!</button>
                        </center>
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <h4>¿Quieres ser uno de nuestros paseadores?</h4>
                        <h6>easyCare te brinda la oportunidad de ser uno de nuestros paseadores y poder acceder a las subastas de paseo.</h6>
                        <button className="btn btn-outline btn-light col-lg-12">¡Se uno de uno de nuestros paseadores!</button>
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <img alt="paseador" src="/img/paseadorInicio.PNG" className="img img-responsive col-lg-12"/>
                        <button className="btn btn-outline btn-light col-lg-12">Paseadores</button>
                    </div>
                    <ul>
                    {this.state.clientesPrueba.map(function(object, i){
                        return <li key={i}>
                            {object.nombre}
                        </li>
                    })}
                    </ul>
                </div>
                
            </div>
        );
    }
}