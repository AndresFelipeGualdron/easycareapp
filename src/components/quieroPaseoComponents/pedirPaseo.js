import React, {Component} from "react";


import Header from "../headerComponent/header";
import Subasta from "../subastaComponent/subasta";
import Mapa from '../mapaComponent/mapaIndex';

import RequestService from "../../services/requestService";

import './pedirPaseo.css';
import { withScriptjs } from "react-google-maps";

const MapLoader = withScriptjs(Mapa);

export default class PedirPaseo extends Component{

    constructor(props){
        super(props);
        this.state = {
            mascotasSeleccionadas : [],
            mascotas : [],
            permitirPaseoOtrasMascotas : true,
            duracionPaseo : 0,
            zoom :15,
            miLat : 0,
            miLng : 0 ,
            permisoLocation : false,
            locationMap : true,
            direccion : "",
            paseo : null,
            subastaIniciada : false,
            me : null,
        };

        this.volverMenu = this.volverMenu.bind(this);

        this.pedirMascotas = this.pedirMascotas.bind(this);
        this.pedirMascotasCorrecto = this.pedirMascotasCorrecto.bind(this);
        this.pedirMascotasIncorrecto = this.pedirMascotasIncorrecto.bind(this);
        this.seleccionarMascota = this.seleccionarMascota.bind(this);
        this.seleccionarPaseoMultiplesMascotas = this.seleccionarPaseoMultiplesMascotas.bind(this);
        this.seleccionarPaseoSoloMisMascotas = this.seleccionarPaseoSoloMisMascotas.bind(this);
        this.cambiar = this.cambiar.bind(this);
        this.iniciarSubasta = this.iniciarSubasta.bind(this);
        this.pedirLocation = this.pedirLocation.bind(this);
        this.changeLocationMap = this.changeLocationMap.bind(this);
        this.cerrarSubasta = this.cerrarSubasta.bind(this);
        this.quienSoy = this.quienSoy.bind(this);
        this.quienSoyCorrecto = this.quienSoyCorrecto.bind(this);
        this.quienSoyIncorrecto = this.quienSoyIncorrecto.bind(this);
        this.actualizarUbicacion = this.actualizarUbicacion.bind(this);

    }

    actualizarUbicacion = function(lat , lng){
        this.setState({
            miLat : lat,
            miLng : lng
        });
    }

    

    //QUIEN SOY

    quienSoy = function(){
        var request = new RequestService();
        request.request(this.quienSoyCorrecto, this.quienSoyIncorrecto, 'GET', '/clients/whoami');
    }

    quienSoyCorrecto = function(data){
        console.log(data);
        this.setState({
            me : data
        });
    }

    quienSoyIncorrecto = function(error){

    }

    //FIN QUIEN SOY

    componentDidMount(){
        console.log("llamando metodos importantes");
        this.quienSoy();
        this.pedirMascotas();
        this.pedirLocation();
    }

    //Pedir mascotas
    pedirMascotas(){
        var request = new RequestService();
        request.request(this.pedirMascotasCorrecto, this.pedirMascotasIncorrecto, 'GET', '/clients/cliente/mascotas');
        
    }

    pedirMascotasCorrecto(data){
        console.log(data);
        this.setState({mascotas : data});
    }

    pedirMascotasIncorrecto(error){
        console.error(error);
    }

    //Fin pedir mascotas

    //LOCALIZAR
    pedirLocation(){
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position);
                this.setState({
                    miLat : position.coords.latitude,
                    miLng : position.coords.longitude,
                    permisoLocation : true,
                    precision : position.coords.accuracy
                });
            },
            error => {
                alert("Se necesitan permisos de Location.");
                console.error(error);
                console.log("paila");
            }
        );

    }

    //FIN LOCALIZAR

    seleccionarMascota(mascota){
        var temp1 = this.state.mascotasSeleccionadas;
        temp1.push(mascota);
        this.setState({mascotasSeleccionadas:temp1});
        var temp2 = [...this.state.mascotas].filter(pet => mascota.id !== pet.id);
        this.setState({mascotas : temp2});
    }

    eliminarMascotaSeleccionada(mascota){
        var temp2 = this.state.mascotas;
        temp2.push(mascota);
        this.setState({
            mascotas : temp2
        });

        var temp1 = [...this.state.mascotasSeleccionadas].filter(pet => pet.id !== mascota.id);
        this.setState({mascotas:temp1});
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

    cambiar(event){
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    iniciarSubasta = function(){
        if(this.state.miLat === 0) alert("debe dar permisos de location.");
        else{
            if(this.state.mascotasSeleccionadas.lenght === 0 || this.state.duracionPaseo === 0){
                alert("Hay campos incorrectos en su solicitud, verifique que todos los campos esten llenos");
            }else{
                this.setState({
                    subastaIniciada : true
                });
            }
        }
        
    }

    cerrarSubasta = function(){
        this.setState({
            subastaIniciada : false
        });
    }

    changeLocationMap = function(flag){
        this.setState({locationMap : flag});
    }

    volverMenu = function(){
        this.props.setFlag("menu");
    }

    render(){
        if(this.state.subastaIniciada){
            return <Subasta 
            locationMap={this.state.locationMap}
            direccion = {this.state.direccion}
            lat = {this.state.miLat}
            lng = {this.state.miLng}
            permitirPaseoOtrasMascotas = {this.state.permitirPaseoOtrasMascotas}
            mascotasSeleccionadas = {this.state.mascotasSeleccionadas}
            duracionPaseo = {this.state.duracionPaseo}
            backCerrarSubasta = {this.cerrarSubasta}
            me = {this.state.me}
            actualizarUbicacion = {this.actualizarUbicacion}
             />;
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
                                        <input defaultChecked={this.state.permitirPaseoOtrasMascotas} onChange={this.seleccionarPaseoMultiplesMascotas} type="radio" className="form-check-input" name="optradio"/>Permitir paseo con otras mascotas
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <label className="form-check-label">
                                        <input defaultChecked={!this.state.permitirPaseoOtrasMascotas} onChange = {this.seleccionarPaseoSoloMisMascotas} type="radio" className="form-check-input" name="optradio"/>No permitir paseo con otras mascotas
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <h5>¿Cuanto tiempo quieres que dure el paseo? (minutos):</h5>
                                <input name="duracionPaseo" onChange={this.cambiar} type='number' placeholder='tiempo' className='form-control' />
                            </div>
                            {(this.state.locationMap) ? (<MapLoader 
                            zoom = {this.state.zoom} 
                            markers = {[{lat : this.state.miLat, lng :this.state.miLng, label : "me"}]}
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCqKmVbM7IdQY8obz9cTA6MpIAM2XWgVPs&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `700px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            center= {{lat : this.state.miLat, lng : this.state.miLng}}
                            />) : ( 
                            <input onChange={this.cambiar} className='form-control' placeholder='Dirección' /> 
                            )}
                            
                            <div className='form-group'>
                                <label>En que dirección deben recoger a sus mascotas?</label>
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle btn-block" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Selecciona método de localización
                                    </button>
                                    <div className="dropdown-menu btn-block" aria-labelledby="dropdownMenu2">
                                        <button type="button" className="dropdown-item" onClick={() => this.changeLocationMap(true)} >Mapa</button>
                                        <button type="button" className="dropdown-item" onClick={() => this.changeLocationMap(false)} >Dirección</button>
                                    </div>
                                </div>
                                                              
                            </div>
                            <div className='form-group'>
                                <button onClick={this.iniciarSubasta} type="button" className='btn btn-success' >Pedir paseo</button>
                                <button className='btn btn-secondary' onClick={this.volverMenu}>Volver al menu</button>
                            </div>
                        </form>
                    </div>
                </div>
                
            </React.Fragment>
        );
    }

}