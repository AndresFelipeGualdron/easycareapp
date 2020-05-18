import React, {Component} from "react";

import EstrellasRanking from '../estrellasRankingComponent/estrellasRanking';

import RequestService from '../../services/requestService';
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CalificarCSS from "./CalificarCSS";

export default class Calificar extends Component{

    constructor(props){
        super(props);
        this.calificar = this.calificar.bind(this);

    }

    calificar = function(cal){
        console.log(cal);
        console.log(this.props.paseadorSeleccionado);
        var request = new RequestService();
        var antNumCal = this.props.paseadorSeleccionado.numCalificaciones;
        var antCal = this.props.paseadorSeleccionado.calificacion;
        console.log(antNumCal);
        console.log(antCal);
        this.props.paseadorSeleccionado.numCalificaciones = antNumCal + 1;
        if(antNumCal === 0){
            this.props.paseadorSeleccionado.calificacion = (antCal + (cal * 1))  / 1;
        }else{
            console.log(antCal);
            console.log(antNumCal);
            console.log(cal);
            console.log(((antCal * antNumCal) + cal)  / (antNumCal + 1));
            this.props.paseadorSeleccionado.calificacion = ((antCal * antNumCal) + cal)  / (antNumCal + 1);
        }

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
        // const classes = CalificarCSS();
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

            // <Container>
            //     <Grid container justify={"center"}>
            //         <Typography className={classes.title}>
            //             Califica tu paseo.
            //         </Typography>
            //     </Grid>
            // </Container>

        );
    }
}