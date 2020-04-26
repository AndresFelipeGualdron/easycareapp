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
import RequestService from "../../services/requestService";


export default class QuieroUnPaseo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            flag : 'registro',
            pet : null
        };
        this.handle = this.handle.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.verificarAutenticacion = this.verificarAutenticacion.bind(this);
        this.validacionCorrecta = this.validacionCorrecta.bind(this);
        this.validacionIncorrecta = this.validacionIncorrecta.bind(this);
        this.volverAMenu = this.volverAMenu.bind(this);

        this.correcto = this.correcto.bind(this);
        this.incorrecto = this.incorrecto.bind(this);

        this.verificarAutenticacion();
    }

    componentDidMount() {
        let request = new RequestService();
        request.request(this.correcto, this.incorrecto, 'GET', '/clients/cliente/correo');
    }

    correcto = data => {
        let pet = {...this.state.pet};
        pet["cliente"] = data;
        this.setState({pet});
    }

    incorrecto = error => {
        console.error(error);
    }

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
        const name = event.target.name;
        let pet = {...this.state.pet};
        pet[name] = event.target.value;
        this.setState({pet});
    };

    async handle(){
        let pet = {...this.state.pet};
        const update = this.props.getMascota();
        let request = new RequestService();
        if (update){
            pet["id"] = update.id;
            request.request(() => {}, () => {}, 'PUT','/mascotas', pet);
        }else{
            request.request(() => {}, () => {}, 'POST','/mascotas', pet);
        }
        this.props.setMascota(null);

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
                    <br/><br/>
                    <Row className="justify-content-center">
                        <Col xs={7}>
                            <Card style={{width: '33rem'}} className="text-center" bg={"light"}>
                                <Card.Header><h3>Registra tu perrito</h3></Card.Header>
                                <br/><br/>
                                <Form>
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
                                            <Form.Control as={"select"} onChange={this.handleChange} name={"raza"}>
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
                                                                   name={"edad"}/> </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="justify-content-center">
                                        <Form.Label column sm={2}>Género:</Form.Label>
                                        <Col sm={6}> <Form.Control onChange={this.handleChange} type="text" placeholder="Género"
                                                                   name={"genero"}/> </Col>
                                    </Form.Group>
                                    <br/>
                                    <Form.Group as={Row} className="justify-content-center">
                                        <Col sm={"auto"}> <Button variant={"light"} type="button" onClick={this.handle}>Aceptar</Button> </Col>
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