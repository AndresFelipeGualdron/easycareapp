import React, {Component} from "react";

import GoogleMapReact from 'google-map-react';



const AnyReactComponent = ({ text }) => (
    <div style={{
      color: 'white', 
      background: 'grey',
      padding: '15px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)'
    }}>
      {text}
    </div>
  );

export default class Mapa extends Component{

    


    render(){
        return <React.Fragment>
            <GoogleMapReact
                bootstrapURLKeys={ {key : 'AIzaSyCqKmVbM7IdQY8obz9cTA6MpIAM2XWgVPs'} }
                defaultCenter={{lat : this.props.lat, lng : this.props.lng}}
                defaultZoom={this.props.zoom}
                >
                <AnyReactComponent
                    lat={this.props.lat}
                    lng={this.props.lng}
                    text={"Me"}
                />
            </GoogleMapReact>
        </React.Fragment>
    }
}