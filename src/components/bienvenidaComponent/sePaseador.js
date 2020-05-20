import React from "react";
import Grid from "@material-ui/core/Grid";
import bienvenidaCSS from "./bienvenidaCSS";
import Typography from "@material-ui/core/Typography";
import {Link} from "@material-ui/core";

export default function SePaseador() {

    const classes = bienvenidaCSS();

    function handleClick() {
        window.location = "https://arsw-easycareapp-paseadores.herokuapp.com/";
    }

    return (
        <Grid container justify={"center"}>
            <img onClick={handleClick} className={classes.sepaseadorImg} src="/img/paseador.jpg" alt=""/>
            <Grid container justify={"center"}>
                <Grid item xs={11}>
                    <Typography className={classes.paseoText}>
                        easyCare te brinda la oportunidad de ser uno de nuestros paseadores y poder acceder a
                        las subastas de paseo.
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}