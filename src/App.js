import React, {Component} from 'react';
import './App.css';
import GoogleMap from "./components/GoogleMap";
import styled from 'styled-components';
import CustomMarker from "./components/CustomMarker";

const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
`;


// ID LWNZFPLXZW2GHQ1N1ZC5CTWTEJZZDR0JCTTQIBCAT2UIEBQS
// SECRET 4FZVE0ZCVFNDTE3ME5PHTFEQWU4PJRQC4UL0ONX5GQA2CVCQ

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

    onApiLoaded = (map, maps) => {
        this.setState({map})
    }

    showInfoWindow = (marker) => {
        console.log(marker.title)
        var clientId = "LWNZFPLXZW2GHQ1N1ZC5CTWTEJZZDR0JCTTQIBCAT2UIEBQS";
        var clientSecret = "4FZVE0ZCVFNDTE3ME5PHTFEQWU4PJRQC4UL0ONX5GQA2CVCQ";
        var url = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20130815&ll=" + marker.lat + "," + marker.lng + "&limit=1";
        fetch(url)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log("Sorry data can't be loaded")
                        marker.infowindow.setContent("Sorry data can't be loaded");
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                        console.log(data)
                        var location_data = data.response.venues[0];
                        var verified = '<b>Verified Location: </b>' + (location_data.verified ? 'Yes' : 'No') + '<br>';
                        var checkinsCount = '<b>Number of CheckIn: </b>' + location_data.stats.checkinsCount + '<br>';
                        var usersCount = '<b>Number of Users: </b>' + location_data.stats.usersCount + '<br>';
                        var tipCount = '<b>Number of Tips: </b>' + location_data.stats.tipCount + '<br>';
                        var readMore = '<a href="https://foursquare.com/v/'+ location_data.id +'" target="_blank">Read More on Foursquare Website</a>'

                        var infoWindow = new window.google.maps.InfoWindow({
                            content: "Pippo"
                        });
                        console.log(this.state)
                        this.toggleInfoWindow(infoWindow, marker);
                        // infoWindow.setContent(checkinsCount + usersCount + tipCount + verified + readMore);
                    });
                }
            )
            .catch(function (err) {
                marker.infowindow.setContent("Sorry data can't be loaded");
            });
    }

    toggleInfoWindow(infowindow, marker) {
        debugger
        infowindow.open(this.state.map, marker)
    }

    render() {
        const {markers} = this.state;
        return (
            <Wrapper>
                <GoogleMap
                    defaultZoom={16}
                    defaultCenter={[45.4641013, 9.1897378]}
                    onGoogleApiLoaded={({ map, maps }) => this.onApiLoaded(map, maps)}
                >
                    {markers.map((m => (
                        <CustomMarker

                            text={m.title}
                            key={m.title}
                            lat={m.lat}
                            lng={m.lng}
                            onClick={(event)=>this.showInfoWindow(event, m)}/>
                    )))}

                </GoogleMap>
            </Wrapper>
        );
    }

}

export default App;
