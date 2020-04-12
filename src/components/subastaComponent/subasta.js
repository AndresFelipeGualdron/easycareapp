import React, {Component} from "react";

import { formatterPeso } from '../../formatos/money';

import WebSocket from '../../services/webSocket';
import RequestService from '../../services/requestService';

import Header from '../headerComponent/header';
import EstrellasRanking from '../estrellasRankingComponent/estrellasRanking';

import './subasta.css';

export default class Subasta extends Component{

    constructor(props){
        super(props);
        this.state = {
            paseadores : [],
            ofertas : [],
            paseadorSeleccionado : '',
            moneySeleccionado : 0,
            numeroSubasta : null,
            stomp : null,
            socket : null,
            flag : 'subasta'
            
        };

        this.crearPaseo = this.crearPaseo.bind(this);
        this.crearPaseoCorrecto = this.crearPaseoCorrecto.bind(this);
        this.crearPaseoIncorrecto = this.crearPaseoIncorrecto.bind(this);
        this.crearSubastaCorrecto = this.crearSubastaCorrecto.bind(this);
        this.crearSubastaIncorrecto = this.crearSubastaIncorrecto.bind(this);
        this.conectar = this.conectar.bind(this);
        this.cancelarSubasta = this.cancelarSubasta.bind(this);

    }

    conectar = function(ws){
        this.setState({
            stomp : ws
        });
        ws.subscribe("/topic/subasta."+this.state.numeroSubasta, function(eventbody){
            console.log(eventbody);
        });
    }

    //CREAR Subasta

    crearPaseo = function(){
        var request = new RequestService();
        request.request(this.crearPaseoCorrecto, this.crearPaseoIncorrecto, 'POST', '/paseos/paseo/'+this.props.lat+'/'+this.props.lng);
        

    }

    crearPaseoCorrecto = function(paseo){
        console.log(paseo);
        var request = new RequestService();
        request.request(this.crearSubastaCorrecto, this.crearSubastaIncorrecto, 'POST', '/subastas/subasta/'+paseo.id+'/'+this.props.mascotasSeleccionadas.length+'/'+this.props.permitirPaseoOtrasMascotas);
    }

    crearPaseoIncorrecto = function(error){
        console.error(error);
    }

    crearSubastaCorrecto = function(subasta){
        console.log(subasta);
        this.setState({
            numeroSubasta : subasta.id
        });
        this.state.stomp.send("/app/nuevaSubasta."+this.state.numeroSubasta,{},JSON.stringify(subasta));
    }

    crearSubastaIncorrecto = function(error){

    }

    //FIN CREAR Subasta

    cancelarSubasta = function(){
        this.props.backCerrarSubasta();
        this.state.stomp.send("/app/cerrarSubasta."+this.state.numeroSubasta,{},{});
    }


    componentWillMount(){
        this.crearPaseo();
        var webSocket = new WebSocket();
        this.setState({
            socket : webSocket
        });
        webSocket.connectAndSubscribe(this.conectar);
    }


    render(){
        return <React.Fragment>
            <div className='container'>
                <Header/>
            </div>
            <hr/>
            <div className='container'>
                <button className='btn btn-danger' onClick={this.cancelarSubasta} >Cancelar Subasta</button>
                <div className='row justify-content-center'>
                    <div className='col-md-6 col-sm-12 paseadoresSection'>
                        <center>
                            <span className="badge badge-success">Andres Gualdron</span> <EstrellasRanking soloLectura={true} puntaje={3}/>
                            <span className="badge badge-success">Andres Gualdron</span> <EstrellasRanking soloLectura={true} puntaje={3}/>
                            <span className="badge badge-success">Andres Gualdron</span> <EstrellasRanking soloLectura={true} puntaje={3}/>
                            <span className="badge badge-success">Andres Gualdron</span> <EstrellasRanking soloLectura={true} puntaje={3}/>
                            <span className="badge badge-success">Andres Gualdron</span> <EstrellasRanking soloLectura={true} puntaje={3}/>
                            <span className="badge badge-success">Andres Gualdron</span> <EstrellasRanking soloLectura={true} puntaje={3}/>
                            <span className="badge badge-success">Andres Gualdron</span> <EstrellasRanking soloLectura={true} puntaje={3}/>
                            <span className="badge badge-success">Andres Gualdron</span> <EstrellasRanking soloLectura={true} puntaje={3}/>
                            <span className="badge badge-success">Andres Gualdron</span> <EstrellasRanking soloLectura={true} puntaje={3}/>
                            <span className="badge badge-success">Andres Gualdron</span> <EstrellasRanking soloLectura={true} puntaje={3}/>
                            <span className="badge badge-success">Andres Gualdron</span> <EstrellasRanking soloLectura={true} puntaje={3}/>
                            <span className="badge badge-success">Andres Gualdron</span> <EstrellasRanking soloLectura={true} puntaje={3}/>
                            <span className="badge badge-success">Andres Gualdron</span> <EstrellasRanking soloLectura={true} puntaje={3}/>
                            <span className="badge badge-success">Andres Gualdron</span> <EstrellasRanking soloLectura={true} puntaje={3}/>
                            <span className="badge badge-success">Andres Gualdron</span> <EstrellasRanking soloLectura={true} puntaje={3}/>
                            <span className="badge badge-success">Andres Gualdron</span> <EstrellasRanking soloLectura={true} puntaje={3}/>
                            <span className="badge badge-success">Andres Gualdron</span> <EstrellasRanking soloLectura={true} puntaje={3}/>
                        </center>
                    </div>
                    <div className='col-md-6 col-sm-12 eventosSection'>
                        <div className='col-sm-12 eventoSection'>
                            <span className="badge badge-success">Andres Gualdron</span> OFRECIÓ <b><i>{formatterPeso.format(50000)} </i></b>
                            <button className='btn btn-success btn-sm ' >Aceptar oferta</button>
                            <EstrellasRanking soloLectura={true} puntaje={3}/>
                        </div>
                        
                    </div>
                </div>
            </div>
        </React.Fragment>
    }



}