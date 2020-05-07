import React, {Component} from "react";

import { formatterPeso } from '../../formatos/money';

import WebSocket from '../../services/webSocket';
import RequestService from '../../services/requestService';

import Header from '../headerComponent/header';
import EstrellasRanking from '../estrellasRankingComponent/estrellasRanking';
import Calificar from '../calificarComponent/calificar';

import './subasta.css';
import PaseoEnCurso from "../paseoEnCursoComponent/paseoEnCurso";

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
        this.agregarOferta = this.agregarOferta.bind(this);
        this.aceptarOferta = this.aceptarOferta.bind(this);
        this.estaPaseador = this.estaPaseador.bind(this);
        this.setPaseadorSeleccionado = this.setPaseadorSeleccionado.bind(this);
        this.actualizarSubastaCorrecto = this.actualizarSubastaCorrecto.bind(this);
        this.actualizarSubastaIncorrecto = this.actualizarSubastaIncorrecto.bind(this);
        this.setFlag = this.setFlag.bind(this);

    }

    setFlag = function(f){
        this.setState({
            flag : f
        });
    }

    

    setPaseadorSeleccionado = function(paseador){
        this.setState({
            paseadorSeleccionado : paseador
        });
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

    agregarOferta = function(oferta){
        var arr = this.state.ofertas;
        arr.push(oferta);
        this.setState({
            ofertas : arr
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
        var agof = this.agregarOferta;
        var usuario = this.props.me;
        ws.subscribe("/topic/subastas", function(eventbody){
            console.log(eventbody);
            var object = JSON.parse(eventbody.body);
            var agr = ag;
            var el = elim;
            var ofag = agof;
            ac(object);
            ws.subscribe('/topic/subasta.'+object.id, function(eventbody2){
                console.log(eventbody2);
                var object = JSON.parse(eventbody2.body);
                agr(object);
            });
            ws.subscribe('/app/subasta/'+object.id+'/'+usuario, function(eventbody2){
                console.log(eventbody2);
                var object = JSON.parse(eventbody2.body);
                agr(object);
            });
            ws.subscribe("/topic/eliminarpaseador/subasta."+object.id, function(eventbody3){
                var object = JSON.parse(eventbody3.body);
                el(object);
            });
            ws.subscribe("/topic/agregaroferta/subasta."+object.id,function(eventbody4){
                var object = JSON.parse(eventbody4.body);
                ofag(object);
            })
        });
        crear();
        
        
    }

    //CREAR Subasta

    crearSubasta = function(){
        console.log(this.props.permitirPaseoOtrasMascotas);
        var sb = {
            id : 0,
            oferta : 0,
            creador : this.props.me,
            paseo : {
                id : 0,
                ruta : {
                    puntoPartida : '',
                    puntoLlegada : ''
                },
                duracion : this.props.duracionPaseo,
                especificaciones : (this.props.permitirPaseoOtrasMascotas) ? 'Se permite paseo con otras mascotas' : 'No se permite paseo con otras mascotas',
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

    estaPaseador = function(paseador){
        var flag = false;
        console.log(paseador);
        this.state.paseadores.forEach(pas => {
            if(paseador.correo === pas.correo){
                flag = true;
            }
        });
        return flag;
    }

    actualizarSubastaCorrecto = function(data){
        this.setState({
            subasta : data,
            flag : "paseoEnCurso"
        });
    }

    actualizarSubastaIncorrecto = function(error){

    }

    aceptarOferta = function(oferta){
        if(this.estaPaseador(oferta.ofertor)){
            var sb = this.state.subasta;
            sb.paseo.precio = oferta.oferta;
            var request = new RequestService();
            console.log(sb);
            request.request(this.actualizarSubastaCorrecto, this.actualizarSubastaIncorrecto, 'PUT', '/subastas/actualizar', sb);
            console.log(oferta);
            this.setState({
                paseadorSeleccionado : oferta.ofertor
            });
        }else{
            alert("El paseador ya no etá en la subasta");
        }
        
    }


    componentDidMount(){
        var webSocket = new WebSocket();
        this.setState({
            socket : webSocket,
        });
        webSocket.connectAndSubscribe(this.conectar, {user : this.props.me});
    }


    render(){
        if(this.state.flag === 'paseoEnCurso'){
            return < PaseoEnCurso 
            paseadorSeleccionado = {this.state.paseadorSeleccionado}
            locationMap={this.props.locationMap}
            direccion = {this.props.direccion}
            lat = {this.props.lat}
            lng = {this.props.lng}
            permitirPaseoOtrasMascotas = {this.props.permitirPaseoOtrasMascotas}
            mascotasSeleccionadas = {this.props.mascotasSeleccionadas}
            duracionPaseo = {this.props.duracionPaseo}
            me = {this.props.me}
            stomp = {this.state.stomp}
            numeroSubasta = {this.state.numeroSubasta}
            actualizarUbicacion = {this.props.actualizarUbicacion}
            setPaseadorSeleccionado = {this.setPaseadorSeleccionado}
            setFlag = {this.setFlag}
            />
        }
        if(this.state.flag === 'calificar'){
            return <Calificar
                setPaseadorSeleccionado = {this.setPaseadorSeleccionado}
                paseadorSeleccionado = {this.state.paseadorSeleccionado}
                setFlag = {this.setFlag}
            />
        }
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
                            {this.state.ofertas.map((ofer, i) => {
                                return (
                                    <React.Fragment key={i}>
                                        <span className="badge badge-success">{ofer.ofertor.nombre}</span> OFRECIÓ <b><i>{formatterPeso.format(ofer.oferta)} </i></b>
                                        <button onClick={() => {this.aceptarOferta(ofer)}} className='btn btn-success btn-sm ' >Aceptar oferta</button>
                                        <EstrellasRanking soloLectura={true} puntaje={ofer.ofertor.calificacion}/>
                                    </React.Fragment>
                                );
                            })}
                        </div>                        
                    </div>
                </div>
            </div>
        </React.Fragment>
    }



}