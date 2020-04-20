import React, {Component} from "react";

import Mapa from '../mapaComponent/mapaIndex';
import Header from '../headerComponent/header';

import { withScriptjs } from "react-google-maps";

const MapLoad = withScriptjs(Mapa);

export default class PaseoEnCurso extends Component{

    constructor(props){
        super(props);
        this.state = {
            zoom : 8
        }

        this.actualizarUbicacion = this.actualizarUbicacion.bind(this);
        this.conectar = this.conectar.bind(this);
        this.actualizarUbicacionPaseador = this.actualizarUbicacionPaseador.bind(this);



        console.log(props);
        console.log(this.props.paseadorSeleccionado.ubicacion.latitud);
        console.log(this.props.paseadorSeleccionado.ubicacion.longitud);
        console.log(this.props.lat);
        console.log(this.props.lng);
    }

    actualizarUbicacion = function(){
        console.log("actualizando ubicacion");
        this.props.actualizarUbicacion();
        console.log(this.props.paseadorSeleccionado);
        this.props.stomp.send("/app/actualizarUbicacionCliente/"+this.props.lat+"/"+this.props.lng,{},JSON.stringify(this.props.paseadorSeleccionado));
    }

    actualizarUbicacionPaseador = function(lat, lng){
        if(this.props.paseadorSeleccionado.ubicacion.latitud !== lat || this.props.paseadorSeleccionado.ubicacion.longitud !== lng){
            var paseador = this.props.paseadorSeleccionado;
            paseador.ubicacion = {
                latitud : lat,
                longitud : lng
            };
            this.props.setPaseadorSeleccionado(paseador);
        }      

    }


    conectar = function(){
        var acpa = this.actualizarUbicacionPaseador;
        var cancelar = this.cancelarPaseo;
        this.props.stomp.subscribe("/topic/actualizarUbicacion."+this.props.me.correo,function(eventbody){
            var object = JSON.parse(eventbody.body);
            console.log(object);
            acpa(object.lat, object.lng);
        });
        this.props.stomp.subscribe("/topic/cancelarPaseo."+this.props.me.correo, function(eventbody){
            var object = JSON.parse(eventbody.body);
            cancelar();
        })
        setInterval(this.actualizarUbicacion,1000);

    }

    cancelarPaseo = function(){
        window.location.reload();
    }




    componentWillMount(){
        this.props.stomp.send("/app/elegirPaseador/"+this.props.numeroSubasta+"/"+this.props.lat+"/"+this.props.lng,{},JSON.stringify(this.props.paseadorSeleccionado));
        this.conectar();
    }

    render(){
        return (
            <React.Fragment>
                <div className='container'>
                    <Header/>
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