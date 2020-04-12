import React, {Component} from "react";

import { formatterPeso } from '../../formatos/money';

import WebSocket from '../../services/webSocket';

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
            subasta : null
            
        };

        this.crearSubasta = this.crearSubasta.bind(this);
        this.actualizarSubasta = this.actualizarSubasta.bind(this);
        this.conectar = this.conectar.bind(this);
        this.cancelarSubasta = this.cancelarSubasta.bind(this);
        this.eliminarPaseador = this.eliminarPaseador.bind(this);
        this.agregarPaseador = this.agregarPaseador.bind(this);

    }

    actualizarSubasta = function(sub){
        console.log(sub);
        this.setState({
            numeroSubasta : sub.id,
            subasta : sub
        });
    }

    agregarPaseador(paseador){
        var arr = this.state.paseadores;
        arr.push(paseador);
        this.setState({
            paseadores : arr
        });
    }

    eliminarPaseador(paseador){
        var arr = this.state.paseadores;
        for(var i=0;i<arr.length;i++){
            console.log();
            if(arr[i].correo === paseador.correo){
                arr.splice(i,1);
            }
        }
        this.setState({
            paseadores : arr
        });
    }

    conectar = function(ws){
        this.setState({
            stomp : ws
        });
        var ac = this.actualizarSubasta;
        var elim = this.eliminarPaseador;
        var crear = this.crearSubasta;
        var ag = this.agregarPaseador;
        ws.subscribe("/topic/subastas", function(eventbody){
            console.log(eventbody);
            var object = JSON.parse(eventbody.body);
            var agr = ag;
            var el = elim;
            ac(object);
            ws.subscribe('/topic/subasta.'+object.id, function(eventbody2){
                console.log(eventbody2);
                var object = JSON.parse(eventbody2.body);
                agr(object);
            });
            ws.subscribe("/topic/eliminarpaseador/subasta."+object.id, function(eventbody3){
                var object = JSON.parse(eventbody3.body);
                el(object);
            });
        });
        crear();
        
        
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
                            {this.state.paseadores.map((paseador, i) => {
                                return (
                                    <React.Fragment key={i}>
                                        <span className="badge badge-success">{paseador.nombre}</span> <EstrellasRanking soloLectura={true} puntaje={paseador.calificacion}/>
                                    </React.Fragment>
                                );
                            })}
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