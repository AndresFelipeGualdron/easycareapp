import React, {Component} from "react";

export default class PaseoEnCurso extends Component{

    render(){
        return (
            <React.Fragment>
                <p>
                    Tu paseo esta en curso, con el paseador {this.props.paseadorSeleccionado.nombre}, duracion : {this.props.duracionPaseo}
                </p>
            </React.Fragment>
        );
    }
}