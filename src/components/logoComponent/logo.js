import React, {Component} from 'react';

export default class Logo extends Component{

    render(){

        

        return (
            <div className="container-fluid col-lg-12">
                <a href="/"><img className="img img-responsive mx-auto d-block" alt="imagen principal" src="/img/logo.PNG"/></a>
                {/* <button className="form-control" onMouseMoveCapture={this.saludar} onClickCapture={this.saludar} type="button">Saluda.</button> */}
            </div>            
        );
    }

}