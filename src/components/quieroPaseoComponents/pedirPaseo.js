import React, {Component} from "react";

import Button from "react-bootstrap/Button";


import Header from "../headerComponent/header";
import Subasta from "../subastaComponent/subasta";
import Mapa from '../mapaComponent/mapa';

import RequestService from "../../services/requestService";

export default class PedirPaseo extends Component{

    constructor(props){
        super(props);
        this.state = {
            mascotasSeleccionadas : [],
            mascotas : [],
            permitirPaseoOtrasMascotas : true,
            duracionPaseo : 0,
            zoom :11,
            miLat : 0,
            miLng : 0 ,
            permisoLocation : false,
            subastaIniciada : false
        };

        this.volverMenu = this.volverMenu.bind(this);

        this.pedirMascotas = this.pedirMascotas.bind(this);
        this.pedirMascotasCorrecto = this.pedirMascotasCorrecto.bind(this);
        this.pedirMascotasIncorrecto = this.pedirMascotasIncorrecto.bind(this);
        this.seleccionarMascota = this.seleccionarMascota.bind(this);
        this.seleccionarPaseoMultiplesMascotas = this.seleccionarPaseoMultiplesMascotas.bind(this);
        this.seleccionarPaseoSoloMisMascotas = this.seleccionarPaseoSoloMisMascotas.bind(this);
        this.cambiarTiempoPaseo = this.cambiarTiempoPaseo.bind(this);
        this.iniciarSubasta = this.iniciarSubasta.bind(this);
        this.pedirLocation = this.pedirLocation.bind(this);

        this.pedirMascotas();
        this.pedirLocation();        


    }

    componentWillMount(){
        console.log("llamando metodos importantes");
        this.pedirMascotas();
        this.pedirLocation();
    }

    //Pedir mascotas
    pedirMascotas = function(){
        var request = new RequestService();
        request.request(this.pedirMascotasCorrecto, this.pedirMascotasIncorrecto, 'GET', '/clients/cliente/mascotas');
        
    }

    pedirMascotasCorrecto = function(data){
        console.log(data);
        this.setState({mascotas : data});
    }

    pedirMascotasIncorrecto = function(error){
        console.error(error);
    }

    //Fin pedir mascotas

    //LOCALIZAR
    pedirLocation = function(){
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position);
                this.setState({
                    miLat : position.coords.latitude,
                    miLng : position.coords.longitude
                });
            },
            error => {
                console.error(error);
                console.log("paila");
            }
        );

    }

    //FIN LOCALIZAR

    seleccionarMascota = function(mascota){
        var temp1 = this.state.mascotasSeleccionadas;
        var temp2 = this.state.mascotas;
        temp1.push(mascota);
        this.setState(
            {
                mascotasSeleccionadas : temp1,
            }
        );
        var ind = temp2.indexOf(mascota);
        if(ind !== -1){
            temp2.splice(ind, 1);
            this.setState({
                mascotas : temp2,
            });
        }
    }

    eliminarMascotaSeleccionada = function(mascota){
        var temp1 = this.state.mascotasSeleccionadas;
        var temp2 = this.state.mascotas;
        temp2.push(mascota);
        this.setState({
            mascotas : temp2
        });
        var ind = temp1.indexOf(mascota);
        if(ind !== -1){
            temp1.splice(ind,1);
            this.setState({
                mascotasSeleccionadas : temp1
            });
        }
    }

    seleccionarPaseoMultiplesMascotas = function(){
        this.setState({
            permitirPaseoOtrasMascotas : true
        });
    }

    seleccionarPaseoSoloMisMascotas = function(){
        this.setState({
            permitirPaseoOtrasMascotas : false
        });
    }

    cambiarTiempoPaseo = function(event){
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    iniciarSubasta = function(){
        if(this.state.mascotasSeleccionadas.lenght === 0 || this.state.duracionPaseo === 0){
            alert("Hay campos incorrectos en su solicitud");
        }else{
            this.setState({
                subastaIniciada : true
            });
        }
    }

    volverMenu = function(){
        this.props.setFlag("menu");
    }

    render(){
        if(this.state.subastaIniciada){
            return <Subasta/>;
        }
        return (
            <React.Fragment>
                <div className='container'>
                    <Header/>
                </div>                
                <hr/>
                <div className="container">
                    <div className="row justify-content-center">
                        <form>
                            <div className="form-group">
                                <h5>Seleccione una o más mascotas:</h5>
                                {this.state.mascotasSeleccionadas.map((masc, id) => {
                                    return <button type="button" key={id} className="btn btn-primary btn-block">{masc.nombre} <span onClick={() => {this.eliminarMascotaSeleccionada(masc)}} className="badge badge-danger">X</span></button>
                                })}
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle btn-block" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Selecciona
                                    </button>
                                    <div className="dropdown-menu btn-block" aria-labelledby="dropdownMenu2">
                                        {this.state.mascotas.map((mascota, id) => {
                                            return <button className="dropdown-item" type="button" onClick={() => this.seleccionarMascota(mascota)} key={id}>{mascota.nombre}</button>;
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-check-inline">
                                    <label className="form-check-label">
                                        <input defaultChecked onChange={this.seleccionarPaseoMultiplesMascotas} type="radio" className="form-check-input" name="optradio"/>Permitir paseo con otras mascotas
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <label className="form-check-label">
                                        <input onChange = {this.seleccionarPaseoSoloMisMascotas} type="radio" className="form-check-input" name="optradio"/>No permitir paseo con otras mascotas
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <h5>¿Cuanto tiempo quieres que dure el paseo? (minutos):</h5>
                                <input name="duracionPaseo" onChange={this.cambiarTiempoPaseo} type='number' placeholder='tiempo' className='form-control' />
                            </div>
                            <Mapa lat={this.state.miLat} lng = {this.state.miLng} zoom = {this.state.zoom} />
                            <div className='form-group'>
                                <button onClick={this.iniciarSubasta} type="button" className='btn btn-success' >Pedir paseo</button>
                            </div>
                        </form>
                    </div>
                    <div className="row justify-content-center">
                        <Button type={'button'} variant={'outline-warning'} onClick={this.volverMenu}>
                            Volver al menu
                        </Button>
                    </div>
                </div>
                
            </React.Fragment>
        );
    }

}