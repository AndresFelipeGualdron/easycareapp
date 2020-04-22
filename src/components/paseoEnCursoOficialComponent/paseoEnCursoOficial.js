import React, {Component} from "react";

import { withScriptjs } from "react-google-maps";

import Mapa from '../mapaComponent/mapaIndex';

const MapLoad = withScriptjs(Mapa);

export default class PaseoEnCursoOficial extends Component{
    constructor(props){
        super(props);
        this.state = {
            zoom : 15
        }
    }

    render(){
        return (
            <React.Fragment>
                <MapLoad
                    zoom = {this.state.zoom} 
                    markers = {[{lat : this.props.paseadorSeleccionado.ubicacion.latitud, lng : this.props.paseadorSeleccionado.ubicacion.longitud, label : 'Pa'}]}
                    // ruta = {{origin : {lat : this.props.lat, lng : this.props.lng}, destino : {lat : this.props.paseadorSeleccionado.ubicacion.latitud, lng : this.props.paseadorSeleccionado.ubicacion.longitud}}}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCqKmVbM7IdQY8obz9cTA6MpIAM2XWgVPs&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `700px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    center= {{lat : this.props.lat, lng : this.props.lng}}
                    polyLines = {this.props.polyLines}
                />
            </React.Fragment>
        );
    }
}