import {Container, Link} from "@material-ui/core";
import React from "react";
import Grid from "@material-ui/core/Grid";
import BienvenidaCSS from "./bienvenidaCSS";
import Typography from "@material-ui/core/Typography";

export default function Paseo() {
    const classes = BienvenidaCSS();

    function handleClick() {
        window.location='/menuPaseo';
    }

    return (
        <Grid onClick={handleClick} container justify={"center"}>
            <img className={classes.paseoImg} src="/img/paseo.png" alt=""/>
            <Grid container justify={"center"}>
                <Grid item xs={11}>
                    <Typography className={classes.paseoText}>
                        No tienes tiempo para sacar a tus perritos a pasear, no te preocupes, puedes pedir el
                        servicio aquí
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}