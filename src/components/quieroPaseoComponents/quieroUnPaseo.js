import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import Container from "reactstrap/es/Container";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Header from "../headerComponent/header";

import LoginService from '../../services/loginService';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import PaseoMenu from "./menuQuieroPaseo";
import RequestService from "../../services/requestService";


export default class QuieroUnPaseo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag : 'registro'
        };
        this.handle = this.handle.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.verificarAutenticacion = this.verificarAutenticacion.bind(this);
        this.validacionCorrecta = this.validacionCorrecta.bind(this);
        this.validacionIncorrecta = this.validacionIncorrecta.bind(this);
        this.volverAMenu = this.volverAMenu.bind(this);

        this.verificarAutenticacion();

        this.clienteCorrecto = this.clienteCorrecto.bind(this);
        this.clienteIncorrecto = this.clienteIncorrecto.bind(this);

        this.correctHandler = this.correctHandler.bind(this);
        this.incorrectHandler = this.incorrectHandler.bind(this);
    }

    componentDidMount() {
        let clienteService = new RequestService();
        clienteService.request(this.clienteCorrecto, this.clienteIncorrecto,'GET', '/clients/cliente/correo');
    }

    clienteCorrecto = data => {
        this.setState({
            cliente : data
        })
    };

    clienteIncorrecto = error => {
        console.error(error);
    };

    //Verificar login

    verificarAutenticacion = e => {
        var servicio = new LoginService();
        servicio.validate(this.validacionCorrecta,this.validacionIncorrecta);
    };

    validacionCorrecta = function(){
        // this.setClaseBoton("oculto");
    };

    validacionIncorrecta = function(){
        console.log("redireccionando...");
        window.location="/iniciarSesion";
        
    };

    //Fin verificar login

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handle = event => {
        // let request = new RequestService();
        //         // request.request(this.correctHandler, this.incorrectHandler, 'POST', '/mascotas/')
        //         //
        //         // event.preventDefault();

    };

    correctHandler = () => {
        console.info();
    };

    incorrectHandler = error => {
        console.error(error);
    }

    volverAMenu = () => {
        this.setState({flag : 'menu'})
    };

    render() {
        if (this.state.flag === 'menu'){
            return <PaseoMenu/>;
        }
        return (
            <React.Fragment>
                <Header/>
                <Container>
                    <br/><br/>
                    <Row className="justify-content-center">
                        <Col xs={7}>
                            <Card style={{width: '33rem'}} className="text-center" bg={"light"}>
                                <Card.Header><h3>Registra tu perrito</h3></Card.Header>
                                <br/><br/>
                                <Form onSubmit={this.handle}>
                                    <Form.Group as={Row} className="justify-content-center">
                                        <Form.Label column sm={2}> Nombre: </Form.Label>
                                        <Col sm={6}>
                                            <Form.Control name={"nombre"} type="text" onChange={this.handleChange}
                                                          placeholder="Nombre"/>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="justify-content-center">
                                        <Form.Label column sm={2}>Raza:</Form.Label>
                                        <Col xs={6}>
                                            <Form.Control as={"select"} onChange={this.handleChange} name={"Raza"}>
                                                <option>Husky</option>
                                                <option>Labrador</option>
                                                <option>Bulldog</option>
                                                <option>Pastor Alemán</option>
                                                <option>Golden Retriever</option>
                                                <option>Pitbull</option>
                                                <option>Otro</option>
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="justify-content-center">
                                        <Form.Label column sm={2}>Edad:</Form.Label>
                                        <Col sm={6}> <Form.Control type="text" placeholder="Edad" onChange={this.handleChange}
                                                                   name={"Edad"}/> </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="justify-content-center">
                                        <Form.Label column sm={2}>Género:</Form.Label>
                                        <Col sm={6}> <Form.Control onChange={this.handleChange} type="text" placeholder="Género"
                                                                   name={"genero"} onClick={this.registrarMascota}/> </Col>
                                    </Form.Group>
                                    <br/>
                                    <Form.Group as={Row} className="justify-content-center">
                                        <Col sm={"auto"}> <Button variant={"light"} type="submit">Siguiente</Button> </Col>
                                    </Form.Group>
                                </Form>
                            </Card>
                        </Col>
                        <Col>
                            <Image src={"/img/PerritoPaseo.jpg"} width={"80%"}/>
                        </Col>
                    </Row>
                    <br/><br/>
                    <Row className='justify-content-center'>
                        <Col md={'auto'}>
                            <Button type={'button'} variant={'outline-warning'} onClick={this.volverAMenu}>
                                Volver a menu
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
            
        );
    }

}