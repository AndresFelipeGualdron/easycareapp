import React, {Component} from 'react';

export default class HolaMundo extends Component{

    

    render(){

        function saludar() {
            console.log("hola a todos");
        }

        return (
            <div>
                <img alt="imagen principal" src="https://raw.githubusercontent.com/AndresFelipeGualdron/easyCare/master/mockups/1.png"/>
                <button className="square" onClick={saludar()} type="button">Saluda.</button>
            </div>
            
        );
    }

}