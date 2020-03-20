import React, {Component} from 'react';

import Header from '../headerComponent/header';

export default class PaseadoresRanking extends Component{

    constructor(){
        super();
        this.state = {
            paseadores : []
        }

    }

    //PEDIR PASEADORES

    obtenerPaseadores = function(){

    }

    obtenerPaseadoresCorrecto = function(data){

    }

    obtenerPaseadoresIncorrecto = function(error){

    }

    //FIN PEDIR PASEADORES



    render(){
        return (
            <React.Fragment>
                <Header/>
                <div className="container">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>John</td>
                            <td>Doe</td>
                            <td>john@example.com</td>
                        </tr>
                        <tr>
                            <td>Mary</td>
                            <td>Moe</td>
                            <td>mary@example.com</td>
                        </tr>
                        <tr>
                            <td>July</td>
                            <td>Dooley</td>
                            <td>july@example.com</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}