import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import Container from "reactstrap/es/Container";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Header from "../headerComponent/header";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";


export default class QuieroUnPaseo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handle = this.handle.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handle = event => {
        alert(this.state.buton);
        event.preventDefault();
    };

    render() {
        return (
            <React.Fragment>
                <Header/>
                <Container>
                    <br/><br/>
                    <Row className="justify-content-center">
                        <Col md={"auto"}><h1>Datos de tu mascota</h1></Col>
                    </Row>
                    <br/>
                    <Row className="justify-content-center">
                        <Col xs={7}>
                            <br/><br/><br/><br/>
                            <Form onSubmit={this.handle}>
                                <Form.Group as={Row} className="justify-content-center">
                                    <Form.Label column sm={2}> Nombre: </Form.Label>
                                    <Col sm={5}>
                                        <Form.Control name={"nombre"} type="email" onChange={this.handleChange}
                                                    placeholder="Nombre"/>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="justify-content-center">
                                    <Form.Label column sm={2}>Raza:</Form.Label>
                                    <Col xs={5}>
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
                                    <Col sm={5}> <Form.Control type="text" placeholder="Edad" onChange={this.handleChange}
                                                            name={"Edad"}/> </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="justify-content-center">
                                    <Form.Label column sm={2}>Género:</Form.Label>
                                    <Col sm={5}> <Form.Control onChange={this.handleChange} type="text" placeholder="Género"
                                                            name={"genero"}/> </Col>
                                </Form.Group>
                                <br/><br/>
                                <Form.Group as={Row} className="justify-content-center">
                                    <Col sm={"auto"}> <Button variant={"light"} type="submit">Siguiente</Button> </Col>
                                </Form.Group>
                            </Form>

                        </Col>
                        <Col>
                            <Image src={"/img/PerritoPaseo.jpg"} width={"80%"}/>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
            
        );
    }

}