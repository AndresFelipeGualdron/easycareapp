import React, {Component} from "react";

import EstrellasRanking from '../estrellasRankingComponent/estrellasRanking';

import RequestService from '../../services/requestService';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CalificarCSS from "./CalificarCSS";
import {Container} from "@material-ui/core";
// import {Container} from "@material-ui/core";
// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
// import CalificarCSS from "./CalificarCSS";

export default function Calificar(props) {

    const classes = CalificarCSS();

    function calificar(cal) {
        console.log(cal);
        console.log(props.paseadorSeleccionado);
        var request = new RequestService();
        var antNumCal = props.paseadorSeleccionado.numCalificaciones;
        var antCal = props.paseadorSeleccionado.calificacion;
        console.log(antNumCal);
        console.log(antCal);
        props.paseadorSeleccionado.numCalificaciones = antNumCal + 1;
        if (antNumCal === 0) {
            props.paseadorSeleccionado.calificacion = (antCal + (cal * 1)) / 1;
        } else {
            console.log(antCal);
            console.log(antNumCal);
            console.log(cal);
            console.log(((antCal * antNumCal) + cal) / (antNumCal + 1));
            props.paseadorSeleccionado.calificacion = ((antCal * antNumCal) + cal) / (antNumCal + 1);
        }

        console.log(props.paseadorSeleccionado);
        request.request(calificarCorrecto, calificarIncorrecto, 'PUT', '/paseadores/actualizar', props.paseadorSeleccionado);
    }

    function calificarCorrecto(data) {
        console.log(data);
        window.location.reload();
    }

    function calificarIncorrecto(error) {
        console.log(error);
    }

    // const classes = CalificarCSS();
    return (
        // <React.Fragment>
        //     <div className="container justify-content-center align-items-center">
        //         <div className="row justify-content-center align-items-center">
        //             <h3>Califica tu paseo.</h3>
        //         </div>
        //         <div className="row justify-content-center align-items-center">
        //             <EstrellasRanking
        //                 puntaje={0}
        //                 seleccionable={true}
        //                 clickCalificar={calificar}
        //             />
        //         </div>
        //     </div>
        // </React.Fragment>

        <Container>
            <Grid container justify={"center"}>
                <Grid item className={classes.grid} xs={12}>
                    <br/>
                    <Typography className={classes.title}>
                        Califica tu paseo.
                    </Typography>
                </Grid>
                <Grid container xs={4} justify={"center"}>
                    <img className={classes.img1} src="/img/huella.png" alt=""/>
                </Grid>
                <Grid container justify={"center"} xs={4}>
                    <Grid item className={classes.gridText} xs={12}>
                        <br/><br/>
                        <Typography className={classes.content}>
                            En easyCare nos importa tu opinión, califica tu experiencia nos interesa
                            hacer más felices a tus perritos
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.grid}>
                        
                        <EstrellasRanking
                            puntaje={0}
                            seleccionable={true}
                            clickCalificar={calificar}
                            calificar={true}
                        />
                    </Grid>
                </Grid>
                <Grid container justify={"center"} xs={4}>
                    <img className={classes.img1} src="/img/huella.png" alt=""/>
                </Grid>
            </Grid>
        </Container>
    );
}