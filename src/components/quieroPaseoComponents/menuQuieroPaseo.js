import React, {Component} from "react";
import Header from "../headerComponent/header";
import Container from "react-bootstrap/Container";
import {Card} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import QuieroUnPaseo from "./quieroUnPaseo";
import VerMascotas from "./verMacotas";
import PedirPaseo from "./pedirPaseo";
import LoginService from "../../services/loginService";

export default class PaseoMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: 'menu',
            mascota: null
        };
        this.registrar = this.registrar.bind(this);
        this.verMascotas = this.verMascotas.bind(this);

        this.verificarAutenticacion = this.verificarAutenticacion.bind(this);
        this.validacionCorrecta = this.validacionCorrecta.bind(this);
        this.validacionIncorrecta = this.validacionIncorrecta.bind(this);

        this.verificarAutenticacion();

        this.pedirPaseo = this.pedirPaseo.bind(this);
        this.setFlag = this.setFlag.bind(this);
        this.setMascota = this.setMascota.bind(this);
        this.getMascota = this.getMascota.bind(this);

    }

    //Verificar login

    verificarAutenticacion = e => {
        let servicio = new LoginService();
        servicio.validate(this.validacionCorrecta, this.validacionIncorrecta);
    };

    validacionCorrecta = () => {
        // this.setClaseBoton("oculto");
    };

    validacionIncorrecta = () => {
        console.log("redireccionando...");
        window.location = "/iniciarSesion";

    };

    registrar = () => {
        this.setState({flag: 'registrar'});
    };

    verMascotas = () => {
        this.setState({flag: 'verMascotas'});
    };

    pedirPaseo = function () {
        this.setState(
            {
                flag: 'pedirPaseo'
            }
        );
    }

    setFlag = function (f) {
        this.setState(
            {
                flag: f
            }
        );
    }

    setMascota(mas) {
        this.setState({
            mascota : mas
        });
    }

    getMascota(){
        return this.state.mascota;
    }


    render() {
        if (this.state.flag === 'registrar') {
            return <QuieroUnPaseo setFlag={this.setFlag} setMascota={this.setMascota} getMascota={this.getMascota}/>;
        } else if (this.state.flag === 'verMascotas') {
            return <VerMascotas setFlag={this.setFlag} setMascota={this.setMascota} getMascota={this.getMascota}/>;
        } else if (this.state.flag === 'pedirPaseo') {
            return <PedirPaseo setFlag={this.setFlag}/>;
        }
        return (
            <React.Fragment>
                <div className='container'>
                    <Header/>
                </div>
                <br/>
                <Container>
                    <Row className='justify-content-center'>
                        <Col md={'auto'}>
                            <Card style={{width: '30rem'}} className='text-center' bs={'light'}>
                                <Card.Img variant='top' src='/img/cachorritos.PNG'/>
                                <Card.Header><h2>Menú de opciones</h2></Card.Header>
                                <Card.Body>
                                    <Button type={'button'} variant={'outline-secondary'} block
                                            onClick={this.verMascotas}>
                                        Consultar mis mascotas
                                    </Button>
                                    <br/>
                                    <Button type={'button'} variant={'outline-secondary'} block
                                            onClick={this.registrar}>
                                        Registrar una mascota
                                    </Button>
                                    <br/>
                                    <Button variant={'outline-secondary'} block>Actualizar una mascota</Button>
                                    <br/>
                                    <Button onClick={this.pedirPaseo} variant={'outline-secondary'} block>Pedir un
                                        paseo</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}