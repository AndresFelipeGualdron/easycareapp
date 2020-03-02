import React, {Component} from 'react';

import Bienvenida from '../bienvenidaComponent/bienvenida';
import Header from '../headerComponent/header';

export default class Home extends Component{


    render(){
        return (
            <div>
                <div>
                    <Header/>
                </div>
                <div>
                    <Bienvenida/>
                </div>
            </div>
        );
    }
}