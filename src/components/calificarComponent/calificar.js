import React, {Component} from "react";

import EstrellasRanking from '../estrellasRankingComponent/estrellasRanking';

import RequestService from '../../services/requestService';

export default class Calificar extends Component{

    constructor(props){
        super(props);
        this.calificar = this.calificar.bind(this);

    }

    calificar = function(cal){
        var request = new RequestService();
        this.props.paseadorSeleccionado.calificacion = cal;
        console.log(this.props.paseadorSeleccionado);
        request.request(this.calificarCorrecto.bind(this), this.calificarIncorrecto.bind(this),'PUT','/paseadores/actualizar',this.props.paseadorSeleccionado);
    }

    calificarCorrecto = function(data){
        console.log(data);
        window.location.reload();
    }

    calificarIncorrecto = function(error){
        console.log(error);
    }


    render(){
        return (
        <React.Fragment>
            <div className = "container justify-content-center align-items-center">
                <div className="row justify-content-center align-items-center">
                    <h3>Califica tu paseo.</h3>
                </div>
                <div className="row justify-content-center align-items-center">
                    <EstrellasRanking
                    puntaje = {0}
                    seleccionable = {true}
                    clickCalificar = {this.calificar}
                    />
                </div>
            </div>
        </React.Fragment>
        );
    }
}