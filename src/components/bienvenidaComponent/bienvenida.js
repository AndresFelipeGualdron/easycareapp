import React, {Component} from 'react';

export default class Bienvenida extends Component{

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
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <img alt="paseador" src="/img/paseadorInicio.PNG" className="img img-responsive col-lg-12"/>
                        <button className="btn btn-outline btn-light col-lg-12">Paseadores</button>
                    </div>
                </div>
                
            </div>
        );
    }
}