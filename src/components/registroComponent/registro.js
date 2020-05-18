import React, {useEffect, useState} from "react";
import LoginService from "../../services/loginService";
import {Button, Card, Container, Grid} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Logo from "../logoComponent/logo";
import RegistroCSS from "./RegistroCSS";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ModalCargando from "../modalCargandoComponent/modalCargando";
import {ACCESS_TOKEN} from "../../constants";

export default function Registro() {

    const [person, setPerson] = useState(null);
    const [charging, setCharging] = useState(false);

    const classes = RegistroCSS();

    useEffect(() => {
        function verificarAutenticacion() {
            let servicio = new LoginService();
            servicio.validate(validacionCorrecta, validacionIncorrecta);
        }

        function validacionCorrecta() {
            console.log('Redireccionando...');
            window.location('/');
        }

        function validacionIncorrecta() {
            // this.setClaseBoton("");
        }

        verificarAutenticacion();
    })

    function handle(event) {
        setPerson({...person, [event.target.name]: event.target.value});
    }

    function registrar(event) {
        event.preventDefault();
        console.log(person.correo + " "+ person.password + " " + person.rePassword);

        if(person.password === person.rePassword){
            setCharging(true);
            let servicio = new LoginService();
            servicio.registrar(person.correo, person.password, person.nombre, person.cedula,person.telefono, registroCorrecto, registroIncorrecto);
        }else{
            alert("Las contraseñas no son iguales");
        }
    }

    function registroCorrecto(token) {
        localStorage.setItem(ACCESS_TOKEN, token);
        setCharging(false);
    }

    function registroIncorrecto() {
        setCharging(false);
        alert("No se pudo realizar el registro. Intentelo más tarde");
    }

    return (
        <Container>
            <ModalCargando
                modalIsOpen={charging}
            />
            <Logo/>
            <br/>
            <Grid container justify={"center"} >
                <Card item className={classes.card} variant={"outlined"}>
                    <br/>
                    <CardMedia
                        className={classes.image}
                        component={'img'}
                        image="/img/cachorritos.PNG"
                    />
                    <CardContent className={classes.content}>
                        <Typography className={classes.title} color={"textSecondary"} gutterBottom>
                            Registrate
                        </Typography>
                        <hr/>
                        <form onSubmit={registrar}>
                            <TextField
                                className={classes.textField}
                                name={'correo'}
                                onChange={handle}
                                label={'Correo'}
                                required
                                size={"small"}
                            />
                            <TextField
                                className={classes.textField}
                                name={'nombre'}
                                onChange={handle}
                                label={'Nombres'}
                                required
                                size={"small"}
                            />
                            <TextField
                                className={classes.textField}
                                name={'cedula'}
                                onChange={handle}
                                label={'Cedula'}
                                required
                                size={"small"}
                            />
                            <TextField
                                className={classes.textField}
                                name={'telefono'}
                                onChange={handle}
                                label={'Telefono'}
                                required
                                size={"small"}
                            />
                            <TextField
                                className={classes.textField}
                                name={'password'}
                                onChange={handle}
                                label={'Contraseña'}
                                required
                                size={"small"}
                                type={'password'}
                            />
                            <TextField
                                className={classes.textField}
                                name={'rePassword'}
                                onChange={handle}
                                label={'Confirmar contraseña'}
                                required
                                size={"small"}
                                type={'password'}
                            />
                            <br/><br/>
                            <Button type={"submit"} color={'primary'}>
                                Registrarse
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>

        </Container>
    )

}