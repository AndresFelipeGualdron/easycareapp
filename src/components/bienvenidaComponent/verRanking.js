import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import BienvenidaCSS from "./bienvenidaCSS";

export default function VerRanking() {

    const classes = BienvenidaCSS();

    function handleClick() {
        window.location='/paseadores';
    }

    return(
        <Grid container justify={"center"}>
            <img onClick={handleClick} className={classes.rankingImg} src="/img/ranking.jpg" alt=""/>
            <Grid container justify={"center"}>
                <Grid item xs={11}>
                    <Typography className={classes.paseoText}>
                        Conoce a los paseadores favoritos, en nuestro ranking de paseadores
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}