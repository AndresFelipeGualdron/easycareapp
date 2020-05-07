import React, {Component} from "react";


import './estrellasRanking.css';

export default class EstrellasRanking extends Component{

    clickCa = function(ca){
        console.log(ca);
        if(this.props.seleccionable){
            this.props.clickCalificar(ca);
        }
    }

    

    render(){
        return <React.Fragment>
            <form>
                <p className="clasificacion">
                    <input className="estrellaRanking" onClick={(this.props.soloLectura) ? (null) : (this.props.seleccionar)} id="radio1" type="radio" name="calificacion" value="5"/>
                    <label onClick={(event) => {this.clickCa(5)}} className={(this.props.soloLectura ? ( (this.props.puntaje >= 5) ? ('seleccionado') : ('') ) : ('seleccionable'))} htmlFor="radio1">★</label>
                    <input className="estrellaRanking" onClick={(this.props.soloLectura) ? (null) : (this.props.seleccionar)} id="radio2" type="radio" name="calificacion" value="4"/>
                    <label onClick={(event) => {this.clickCa(4)}} className={(this.props.soloLectura ? ((this.props.puntaje >= 4) ? ('seleccionado') : ('')) : ('seleccionable'))} htmlFor="radio2">★</label>
                    <input className="estrellaRanking" onClick={(this.props.soloLectura) ? (null) : (this.props.seleccionar)} id="radio3" type="radio" name="calificacion" value="3"/>
                    <label onClick={(event) => {this.clickCa(3)}} className={(this.props.soloLectura ? ((this.props.puntaje >= 3) ? ('seleccionado') : ('')) : ('seleccionable'))} htmlFor="radio3">★</label>
                    <input className="estrellaRanking" onClick={(this.props.soloLectura) ? (null) : (this.props.seleccionar)} id="radio4" type="radio" name="calificacion" value="2"/>
                    <label onClick={(event) => {this.clickCa(2)}} className={(this.props.soloLectura ? ((this.props.puntaje >= 2) ? ('seleccionado') : ('')) : ('seleccionable'))} htmlFor="radio4">★</label>
                    <input className="estrellaRanking" onClick={(this.props.soloLectura) ? (null) : (this.props.seleccionar)} id="radio5" type="radio" name="calificacion" value="1"/>
                    <label onClick={(event) => {this.clickCa(1)}} className={(this.props.soloLectura ? ((this.props.puntaje >= 1) ? ('seleccionado') : ('')) : ('seleccionable'))} htmlFor="radio5">★</label>
                </p>
            </form>
        </React.Fragment>
    }
}