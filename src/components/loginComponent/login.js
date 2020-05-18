import React, {useEffect, useState} from 'react';
import {ACCESS_TOKEN} from '../../constants/index';

import Logo from '../logoComponent/logo';
import ModalCargando from '../modalCargandoComponent/modalCargando';
import LoginService from '../../services/loginService';

import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import {blue, brown} from "@material-ui/core/colors";
import useLoginCSS from "./LoginCSS";

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(blue[300]),
        backgroundColor: brown[200],
        '&:hover': {
            backgroundColor: blue[200]
        },
    },
}))(Button);

export default function Login() {

    const classes = useLoginCSS();

    const [register, setRegister] = useState({
        correo: '',
        password: ''
    });
    const [cargando, setCargando] = useState(false);

    //Verificar login

    useEffect(() => {
        verificarAutentificacion();
    })

    function verificarAutentificacion() {
        let servicio = new LoginService();
        servicio.validate(validacionCorrecta, validacionIncorrecta)

    }

    function validacionCorrecta() {
        console.log("redireccionando...");
        window.location = "/";
    }

    function validacionIncorrecta() {
        console.info('Validación incorrecta');
    }

    //Fin verficar login

    function cerrarModal() {
        setCargando(false);
    }

    function handle(event) {
        setRegister({...register, [event.target.name]: event.target.value});
        console.info(register);
    }

    function handleSubmit(event) {
        setCargando(true);
        event.preventDefault();

        let init = new Headers({
            method: 'POST'
        })

        function loginAceptado(token) {
            if (token !== undefined) {
                localStorage.setItem(ACCESS_TOKEN, token);
                cerrarModal();
                window.location = "/";
            }
        }

        function loginRechazado() {
            cerrarModal();
            alert('Login no aceptado');
        }

        new LoginService().login(register.correo, register.password, loginAceptado, loginRechazado, init)
    }

    return (
        <Container>
            <ModalCargando modalIsOpen={cargando}/>
            <Grid container justify={'center'}>
                <Logo/>
                <Card className={classes.card} variant={'outlined'}>
                    <CardHeader
                        className={classes.head}
                        title={"Inicio de sesión"}
                    />
                    <CardMedia
                        className={classes.image}
                        component="img"
                        alt={'user login'}
                        image="/img/Sesion.jpg"
                        height="230"
                    />
                    <CardContent className={classes.content}>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                required
                                name={'correo'}
                                className={classes.input}
                                label="Correo"
                                onChange={handle}
                            />
                            <br/>
                            <TextField
                                required
                                name={'password'}
                                className={classes.input}
                                label="Contraseña"
                                type={'password'}
                                onChange={handle}
                            />
                            <br/><br/><br/>
                            <ColorButton type={'submit'}>
                                Login
                            </ColorButton>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Container>
    );
}