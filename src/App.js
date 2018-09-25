import React, {Component} from 'react';
import './App.css';
import GoogleMap from "./components/GoogleMap";
import styled from 'styled-components';
import CustomMarker from "./components/CustomMarker";

const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
`;

class App extends Component {

    state = {
        markers: [
            {
                title: "Duomo",
                lat: 45.4640976,
                lng: 9.1919265
            },
            {
                title: "Teatro della Scala",
                lat: 45.4663866,
                lng: 9.1889054
            },
            {
                title: "Ristorante Cracco",
                lat: 45.4653468,
                lng: 9.189871
            },
            {
                title: "Piazza dei Mercanti",
                lat: 45.4645779,
                lng: 9.1877259
            }, {
                title: "Museo del 900",
                lat: 45.4634873,
                lng: 9.1902915
            },
            {
                title: "Palazzo Reale",
                lat: 45.4631162,
                lng: 9.191188
            }
        ]
    }

    render() {
        return (
            <Wrapper>
                <GoogleMap
                    defaultZoom={16}
                    defaultCenter={[45.4641013, 9.1897378]}
                >
                    {this.state.markers.map((m => (
                        <CustomMarker
                            text={m.title}
                            key={m.title}
                            lat={m.lat}
                            lng={m.lng}/>
                    )))}

                </GoogleMap>
            </Wrapper>
        );
    }
}

export default App;
