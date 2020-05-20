import React, {Component} from 'react';

import Bienvenida from '../bienvenidaComponent/bienvenida';
import Header from '../headerComponent/header';
import Prueba from "../bienvenidaComponent/prueba";

export default class Home extends Component {


    render() {
        return (
            <div className="container-fluid">
                <Header
                />
                <Prueba
                />
            </div>
        );
    }
}