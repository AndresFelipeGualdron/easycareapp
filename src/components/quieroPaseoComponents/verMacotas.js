import React, {Component} from "react";
import Header from "../headerComponent/header";
import {ButtonGroup, Container} from "react-bootstrap";
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
            mascotas: [],
        };
        this.volverAMenu = this.volverAMenu.bind(this);

        this.correcto = this.correcto.bind(this);
        this.incorrecto = this.incorrecto.bind(this);

        this.verificarAutenticacion = this.verificarAutenticacion.bind(this);
        this.validacionCorrecta = this.validacionCorrecta.bind(this);
        this.validacionIncorrecta = this.validacionIncorrecta.bind(this);

        this.verificarAutenticacion();

        this.editarMascota = this.editarMascota.bind(this);
        this.eliminarMascota = this.eliminarMascota.bind(this);

        this.clienteCorrecto = this.clienteCorrecto.bind(this);
    }

    componentDidMount() {
        let request = new RequestService();
        request.request(this.correcto, this.incorrecto, 'GET', '/clients/cliente/mascotas');
        request.request(this.clienteCorrecto, this.incorrecto, 'GET', '/clients/cliente/correo');
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

    clienteCorrecto(data){
        this.setState({cliente:data});
    }

    volverAMenu = () => {
        this.props.setFlag("menu");
    };

    editarMascota(pet){
        pet.cliente = this.state.cliente;
        this.props.setMascota(pet);
        this.props.setFlag('registrar');
    }

    async eliminarMascota(pet){
        let request = new RequestService();
        await request.request(() => {}, () => {}, 'DELETE','/mascotas/mascota/'+pet.id)
        let updatedPets = [...this.state.mascotas].filter(i => i.id !== pet.id);
        this.setState({mascotas:updatedPets});
    }

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
                                    <th>Acción</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.mascotas.map((mascota, id) => {
                                    return <tr key={id}>
                                        <td>{mascota.nombre}</td>
                                        <td>{mascota.raza}</td>
                                        <td>{mascota.edad}</td>
                                        <td>{mascota.genero}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Button variant="primary" onClick={() => this.editarMascota(mascota)}>Editar</Button>
                                                <Button variant="danger" onClick={() => this.eliminarMascota(mascota)}>Eliminar</Button>
                                            </ButtonGroup>
                                        </td>
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