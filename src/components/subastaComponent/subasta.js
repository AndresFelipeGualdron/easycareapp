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
            flag : 'subasta',
            
        };

        this.crearSubasta = this.crearSubasta.bind(this);
        this.actualizarSubasta = this.actualizarSubasta.bind(this);
        this.conectar = this.conectar.bind(this);
        this.cancelarSubasta = this.cancelarSubasta.bind(this);

    }

    actualizarSubasta = function(subasta){
        this.setState({
            numeroSubasta : subasta.id
        });
    }

    conectar = function(ws){
        this.setState({
            stomp : ws
        });
        var ac = this.actualizarSubasta;
        ws.subscribe("/topic/subastas", function(eventbody){
            console.log(eventbody);
            var object = JSON.parse(eventbody.body);
            ac(object);
        });
        this.crearSubasta();
    }

    //CREAR Subasta

    crearSubasta = function(){
        var sb = {
            id : 0,
            oferta : 0,
            creador : this.props.me,
            idPaseo : {
                id : 0,
                ruta : {
                    puntoPartida : '',
                    puntoLlegada : ''
                },
                duracion : 0,
                especificaciones : '',
                precio : 0
            },
            numMascotas : this.props.mascotasSeleccionadas.length,
            permitirMasMascotas : this.props.permitirPaseoOtrasMascotas
        };
        var enviar = {
            subasta : sb,
            latitud : this.props.lat,
            longitud : this.props.lng,
        };
        this.state.stomp.send("/app/nuevaSubasta",{},JSON.stringify(enviar));
    }

    //FIN CREAR Subasta

    cancelarSubasta = function(){
        this.props.backCerrarSubasta();
        this.state.stomp.send("/app/cerrarSubasta."+this.state.numeroSubasta,{},{});
    }


    componentWillMount(){
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