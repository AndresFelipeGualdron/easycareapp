import React, {Component} from "react";

import Mapa from '../mapaComponent/mapaIndex';
import PaseoEnCursoOficial from '../paseoEnCursoOficialComponent/paseoEnCursoOficial';

import { withScriptjs } from "react-google-maps";

const MapLoad = withScriptjs(Mapa);

export default class PaseoEnCurso extends Component{

    constructor(props){
        super(props);
        this.state = {
            zoom : 8,
            flag : 'prePaseo',
            polyLines : []
        }

        this.actualizarUbicacion = this.actualizarUbicacion.bind(this);
        this.conectar = this.conectar.bind(this);
        this.actualizarUbicacionPaseador = this.actualizarUbicacionPaseador.bind(this);
        this.iniciarPaseo = this.iniciarPaseo.bind(this);



        console.log(props);
        console.log(this.props.paseadorSeleccionado.ubicacion.latitud);
        console.log(this.props.paseadorSeleccionado.ubicacion.longitud);
        console.log(this.props.lat);
        console.log(this.props.lng);
    }

    actualizarUbicacion = function(){
        console.log("actualizando ubicacion");
        var st = this.props.stomp;
        var change = this.props.actualizarUbicacion;
        var paseador = this.props.paseadorSeleccionado;
        var lat = this.props.lat;
        var lng = this.props.lng;
        navigator.geolocation.watchPosition((position) => {
            console.log(position);
            if(lat !== position.coords.latitud || lng !== position.coords.longitude){
                change(position.coords.latitude, position.coords.longitude);
                st.send("/app/actualizarUbicacionCliente/"+position.coords.latitude+"/"+position.coords.longitude,{},JSON.stringify(paseador));
            }
            
        },
        (error) => {
            alert("Se necesitan permisos de Location.");
            console.error(error);
            console.log("paila");
        });
        // this.props.actualizarUbicacion();
        // console.log(this.props.paseadorSeleccionado);
        // this.props.stomp.send("/app/actualizarUbicacionCliente/"+this.props.lat+"/"+this.props.lng+"/"+this.props.numeroSubasta,{},JSON.stringify(this.props.paseadorSeleccionado));
    }

    actualizarUbicacionPaseador = function(lat, lng){
        if(this.props.paseadorSeleccionado.ubicacion.latitud !== lat || this.props.paseadorSeleccionado.ubicacion.longitud !== lng){
            var li = this.state.polyLines;
            li.push({"lat" : lat, "lng" : lng})
            console.log("-------------------------------");
            console.log(li);
            this.setState({
                polyLines : li
            });
            var paseador = this.props.paseadorSeleccionado;
            paseador.ubicacion = {
                latitud : lat,
                longitud : lng
            };
            this.props.setPaseadorSeleccionado(paseador);
        }      

    }

    iniciarPaseo = function(){
        this.setState({
            flag : 'paseoEnCurso'
        });
    }

    conectar = async function(){
        var acpa = this.actualizarUbicacionPaseador;
        var cancelar = this.cancelarPaseo;
        var comenzar = this.iniciarPaseo;
        this.props.stomp.subscribe("/topic/actualizarUbicacion."+this.props.me.correo,async function(eventbody){
            var object = JSON.parse(eventbody.body);
            console.log(object);
            acpa(object.lat, object.lng);
        });
        this.props.stomp.subscribe("/topic/cancelarPaseo."+this.props.me.correo, async function(eventbody){
            var object = JSON.parse(eventbody.body);
            cancelar();
        })
        this.props.stomp.subscribe("/topic/comenzarPaseoVivo."+this.props.me.correo, async function(eventbody){
            var object = JSON.parse(eventbody.body);
            comenzar()
        });
        // setInterval(this.actualizarUbicacion,10000);
        this.actualizarUbicacion();

    }

    cancelarPaseo = function(){
        window.location.reload();
    }




    componentDidMount(){
        this.props.stomp.send("/app/elegirPaseador/"+this.props.numeroSubasta+"/"+this.props.lat+"/"+this.props.lng,{},JSON.stringify(this.props.paseadorSeleccionado));
        this.conectar();
    }

    render(){
        if(this.state.flag === 'paseoEnCurso'){
            return (
                <React.Fragment>
                    <PaseoEnCursoOficial
                    paseadorSeleccionado = {this.props.paseadorSeleccionado}
                    locationMap={this.props.locationMap}
                    direccion = {this.props.direccion}
                    lat = {this.props.lat}
                    lng = {this.props.lng}
                    permitirPaseoOtrasMascotas = {this.props.permitirPaseoOtrasMascotas}
                    mascotasSeleccionadas = {this.props.mascotasSeleccionadas}
                    duracionPaseo = {this.props.duracionPaseo}
                    me = {this.props.me}
                    stomp = {this.props.stomp}
                    numeroSubasta = {this.props.numeroSubasta}
                    actualizarUbicacion = {this.props.actualizarUbicacion}
                    setPaseadorSeleccionado = {this.props.setPaseadorSeleccionado}
                    polyLines ={this.state.polyLines}
                    setFlag = {this.props.setFlag}
                    />
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
                <div className="container">
                    <h1>Tu paseador está en Camino.</h1>
                </div>
                <MapLoad
                    zoom = {this.state.zoom} 
                    markers = {[]}
                    ruta = {{origin : {lat : this.props.lat, lng : this.props.lng}, destino : {lat : this.props.paseadorSeleccionado.ubicacion.latitud, lng : this.props.paseadorSeleccionado.ubicacion.longitud}}}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCqKmVbM7IdQY8obz9cTA6MpIAM2XWgVPs&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `700px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    center= {{lat : this.props.lat, lng : this.props.lng}}
                    
                />
                <div className='container'>
                    <div className='row'>   
                        <div className='col-sm-12'>
                            <button onClick={this.cancelarPaseo} className='btn btn-danger form-control'>Cancelar Paseo</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}