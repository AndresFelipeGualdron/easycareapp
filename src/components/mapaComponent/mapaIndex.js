import React, {Component, PureComponent} from "react";
import { withGoogleMap, GoogleMap, DirectionsRenderer, Marker, Polyline } from 'react-google-maps';


// 4.755410, -74.101669

export default class Mapa extends Component{


  constructor(props){
    super(props);
    this.state = {
      googleMapUrl : "https://maps.googleapis.com/maps/api/js?key=AIzaSyCqKmVbM7IdQY8obz9cTA6MpIAM2XWgVPs&libraries=geometry,drawing,places"
    }
    // new DirectionsService();
    
  }

  componentDidMount() {
    if(this.props.ruta !== undefined){
      console.log(this.props.markers);
      const directionsService = new window.google.maps.DirectionsService();
  
      const origin = { lat: this.props.ruta.origin.lat, lng: this.props.ruta.origin.lng };
      const destination = { lat: this.props.ruta.destino.lat, lng: this.props.ruta.destino.lng };
  
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
    
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   console.log(nextProps);
    // console.log(this.props);
  //   console.log(areEqual());
  //   return false;
  // }


    render(){
      console.log("renderizando...");
      const GoogleMapExample = withGoogleMap(props => (
        <GoogleMap
          defaultCenter={{ lat: this.props.center.lat, lng: this.props.center.lng }}
          defaultZoom={this.props.zoom}
        >
          <DirectionsRenderer
            directions={this.state.directions}
          />

          {this.props.markers.map((mark,i) => {
            return(<Marker
            key = {i}
            position = {{lat :mark.lat , lng :mark.lng}}
            label = {mark.label}
            
            />);
          })}

          {(this.props.polyLines !== undefined) ? (
              <Polyline
              path={this.props.polyLines}
              options={{ strokeColor: "#FF0000 " }} />
          ) : (
            ''
          )}

          
          
        </GoogleMap>
      ));
  
      return (
        <div>
          <GoogleMapExample
            containerElement={<div style={{ height: `500px`, width: "100%" }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      );
    }
}