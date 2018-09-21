import React, {Component} from 'react';
import './App.css';

import CustomMap from './components/CustomMap.js'
import PlacesList from './components/PlacesList.js'

class App extends Component {
    render() {
        return (
            <div className="App">
                <PlacesList/>
                <CustomMap
                    isMarkerShown={true}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCGekEiZ6lE1XN9rQrmIAqbnN-pF7xMX60&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{height: `100%`}}/>}
                    containerElement={<div style={{height: `400px`}}/>}
                    mapElement={<div style={{height: `100%`}}/>}
                />
            </div>
        );
    }
}

export default App;
