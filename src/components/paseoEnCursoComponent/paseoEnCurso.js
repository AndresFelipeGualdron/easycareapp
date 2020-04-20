import React, {Component} from "react";

export default class PaseoEnCurso extends Component{






    componentWillMount(){
        this.props.stomp.send("/app/elegirPaseador/"+this.props.numeroSubasta+"/"+this.props.lat+"/"+this.props.lng,{},JSON.stringify(this.props.paseadorSeleccionado));
    }

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