import React, {Component} from "react";

import Button from "react-bootstrap/Button";

import Header from "../headerComponent/header";

export default class PedirPaseo extends Component{

    constructor(props){
        super(props);

        this.volverMenu = this.volverMenu.bind(this);

    }

    volverMenu = function(){
        // console.log(this.props.flag);
        this.props.setFlag("menu");
        // console.log(this.props.flag);
    }

    render(){
        return (
            <React.Fragment>
                <Header/>
                <div className="container">
                    <form>
                        <div className="form-group">
                            <select className="form-control">
                                <option>Default select</option>
                            </select>
                        </div>
                    </form>
                    <Button type={'button'} variant={'outline-warning'} onClick={this.volverMenu}>
                        Volver al menu
                    </Button>
                </div>
                
            </React.Fragment>
        );
    }

}