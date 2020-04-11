import React, {Component} from "react";

import { formatterPeso } from '../../formatos/money';

import Header from '../headerComponent/header';
import EstrellasRanking from '../estrellasRankingComponent/estrellasRanking';

import './subasta.css';

export default class Subasta extends Component{


    componentWillMount(){
        
    }


    render(){
        return <React.Fragment>
            <div className='container'>
                <Header/>
            </div>
            <hr/>
            <div className='container'>
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