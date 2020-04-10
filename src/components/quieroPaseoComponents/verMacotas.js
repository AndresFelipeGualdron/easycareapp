import React, {Component} from "react";
import Header from "../headerComponent/header";
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import RequestService from "../../services/requestService";
import Table from "react-bootstrap/Table";
import LoginService from "../../services/loginService";

export default class VerMascotas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: 'misMascotas',
            mascotas: []
        };
        this.volverAMenu = this.volverAMenu.bind(this);

        this.correcto = this.correcto.bind(this);
        this.incorrecto = this.incorrecto.bind(this);

        this.verificarAutenticacion = this.verificarAutenticacion.bind(this);
        this.validacionCorrecta = this.validacionCorrecta.bind(this);
        this.validacionIncorrecta = this.validacionIncorrecta.bind(this);

        this.verificarAutenticacion();
    }

    componentDidMount() {
        let request = new RequestService();
        request.request(this.correcto, this.incorrecto, 'GET', '/clients/cliente/mascotas');
        console.log(this.state.mascotas)
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

    // Fin verificar login

    correcto = data => {
        this.setState({
            mascotas: data
        });
    };

    incorrecto = error => {
        console.error(error);
    };

    volverAMenu = () => {
        this.props.setFlag("menu");
    };

    render() {
        return (
            <React.Fragment>
                <div className='container'>
                    <Header/>
                </div>                
                <Container>
                    <Row className='justify-content-center'>
                        <Col md={'auto'}>
                            <h2>Mis mascotas</h2>
                            <br/><br/>
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col xs={40}>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Raza</th>
                                    <th>Edad</th>
                                    <th>Género</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.mascotas.map((mascota, id) => {
                                    return <tr key={id}>
                                        <td>{mascota.nombre}</td>
                                        <td>{mascota.raza}</td>
                                        <td>{mascota.edad}</td>
                                        <td>{mascota.genero}</td>
                                    </tr>;
                                })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col md={'auto'}>
                            <Button type={'button'} variant={'outline-warning'} onClick={this.volverAMenu}>
                                Volver al menu
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}