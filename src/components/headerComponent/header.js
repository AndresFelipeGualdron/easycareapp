import React, {Component} from 'react';
import Logo from '../logoComponent/logo';
import SectionLogin from '../sectionLoginComponent/sectionLogin';

export default class Header extends Component{


    render(){
        return (
            <div className="row">
                <div className="col-lg-6 col-md-12">
                    <Logo/>
                </div>
                <div className="col-lg-6 col-md-12">
                    <SectionLogin/>
                </div>
                <hr/> 
            </div>
        );
    }
}