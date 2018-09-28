import React, {Component} from 'react';
import PointsOfInterestList from "./PointsOfInterestList.js";

const clientId = "LWNZFPLXZW2GHQ1N1ZC5CTWTEJZZDR0JCTTQIBCAT2UIEBQS";
const clientSecret = "4FZVE0ZCVFNDTE3ME5PHTFEQWU4PJRQC4UL0ONX5GQA2CVCQ";

class GoogleMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pointsOfInterest: [
                {
                    title: "Duomo",
                    lat: 45.4640976,
                    lng: 9.1919265
                },
                {
                    title: "Grom",
                    lat: 45.4663866,
                    lng: 9.1889054
                },
                {
                    title: "Galleria Vittorio Emanuele II",
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
                    title: "Giacomo Caffe'",
                    lat: 45.4631162,
                    lng: 9.191188
                }
            ],
            markers: [],
            infoWindow: ''
        }
        this.loadMap = this.loadMap.bind(this);
        this.populateInfoWindow = this.populateInfoWindow.bind(this);
        this.openInfoWindow = this.openInfoWindow.bind(this);
    }

    /**
     * Initializes the google map so that it fits the entire available space
     * Also initializes the locations
     */
    loadMap() {
        const mapView = document.getElementById('map');
        mapView.style.height = window.innerHeight + "px";
        mapView.style.width = window.innerWidth + "px";
        const map = new window.google.maps.Map(mapView, {
            zoom: 16,
            center: {lat: 45.4640976, lng: 9.1919265},
            mapTypeControl: false
        });
        this.setState({map: map});
        const markers = [];
        this.state.pointsOfInterest.forEach((point) => {
            const marker = new window.google.maps.Marker({
                position: {lat: point.lat, lng: point.lng},
                map: map,
                title: point.title
            });
            const infoWindow = new window.google.maps.InfoWindow();
            infoWindow.addListener('closeclick', function () {
                infoWindow.marker.setAnimation(null)
                infoWindow.marker = null;
            });

            this.setState({infoWindow: infoWindow})
            marker.addListener('click', function () {
                window.populateInfoWindow(this);
            });
            markers.push(marker);
        })
        this.setState({markers: markers});
    }

    /**
     * Call FourSquare API to retrieve venue info about the selected marker
     * Link to FourSquare API
     * https://foursquare.com/developers
     * @param marker
     */
    populateInfoWindow = (marker) => {
        this.setState((prevState) => {
            const infoWindow = prevState.infoWindow;
            if (infoWindow.marker != null)
                infoWindow.marker.setAnimation(null)
            infoWindow.marker = marker;
            return {infoWindow: infoWindow};
        })
        const url = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20130815&ll=" + marker.position.lat() + "," + marker.position.lng() + "&limit=1";
        fetch(url)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        window.openInfoWindow("Unable to load data from FourSquare");
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                        const venue = data.response.venues[0];
                        const usersCheckedIn = '<b>Users who checked in: </b>' + venue.stats.checkinsCount + '<br>';
                        const fourSquareUrl = '<a href="https://foursquare.com/v/' + venue.id + '" target="_blank">Go to FourSquare site</a>'

                        window.openInfoWindow(usersCheckedIn + fourSquareUrl)
                    });
                }
            )
            .catch(function (err) {
                window.openInfoWindow("Unable to load data from FourSquare");
            });
    }

    /**
     * Open the info window with the selected content
     * @param content
     */
    openInfoWindow(content) {
        this.state.infoWindow.setContent(content)
        this.state.infoWindow.open(this.state.map, this.state.infoWindow.marker)
        this.state.infoWindow.marker.setAnimation(window.google.maps.Animation.BOUNCE)
    }

    /**
     * Load the Google API Js
     * Info at https://developers.google.com/maps/documentation
     */
    componentDidMount() {
        //Loads Google Maps API
        window.loadMap = this.loadMap;
        window.populateInfoWindow = this.populateInfoWindow;
        window.openInfoWindow = this.openInfoWindow;
        const script = document.createElement("script");
        script.src = "https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyCGekEiZ6lE1XN9rQrmIAqbnN-pF7xMX60&callback=loadMap";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    }

    render() {
        return (
            <div>
                <PointsOfInterestList list={this.state.markers} populateInfoWindow={this.populateInfoWindow}/>
                <div id='map'/>
            </div>
        )
    }
}

export default GoogleMap;