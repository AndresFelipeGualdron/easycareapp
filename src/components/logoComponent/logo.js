import React, {Component} from 'react';

export default class Logo extends Component{

    saludar() {
        console.log("hola a todos");
    }

    

    render(){

        

        return (
            <div>
                <img alt="imagen principal" src="https://raw.githubusercontent.com/AndresFelipeGualdron/easyCare/master/mockups/1.png"/>
                <button className="square" onMouseMoveCapture={this.saludar} onClickCapture={this.saludar} type="button">Saluda.</button>
            </div>            
        );
    }

}