import React, {Component} from 'react';

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

    loadMap() {
        var mapView = document.getElementById('map');
        mapView.style.height = window.innerHeight + "px";
        mapView.style.width = window.innerWidth + "px";
        const map = new window.google.maps.Map(mapView, {
            zoom: 16,
            center: {lat: 45.4640976, lng: 9.1919265}
        });
        this.setState({map: map});
        const markers = [];
        this.state.pointsOfInterest.forEach((point) => {
            const marker = new window.google.maps.Marker({
                position: {lat: point.lat, lng: point.lng},
                map: map,
                title: point.title,
                animation: window.google.maps.Animation.DROP
            });
            var largeInfowindow = new window.google.maps.InfoWindow();
            this.setState({infoWindow: largeInfowindow})
            marker.addListener('click', function () {
                window.populateInfoWindow(this);
            });
            markers.push(marker);
        })
        this.setState({markers: markers});
    }

    populateInfoWindow = (marker) => {
        this.state.infoWindow.marker = marker;

        // this.openInfoWindow('Pippo');
        var clientId = "LWNZFPLXZW2GHQ1N1ZC5CTWTEJZZDR0JCTTQIBCAT2UIEBQS";
        var clientSecret = "4FZVE0ZCVFNDTE3ME5PHTFEQWU4PJRQC4UL0ONX5GQA2CVCQ";
        var url = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20130815&ll=" + marker.position.lat() + "," + marker.position.lng() + "&limit=1";
        fetch(url)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        window.openInfoWindow("Unable to load data from FourSquare");
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                        console.log(data)
                        const venue = data.response.venues[0];
                        const checkins = '<b>Users who checked in: </b>' + venue.stats.checkinsCount + '<br>';
                        const fourSquareUrl = '<a href="https://foursquare.com/v/' + venue.id + '" target="_blank">Go to FourSquare site</a>'

                        window.openInfoWindow(checkins + fourSquareUrl)
                    });
                }
            )
            .catch(function (err) {
                window.openInfoWindow("Unable to load data from FourSquare");
            });
    }

    openInfoWindow(content) {
        this.state.infoWindow.setContent(content)
        this.state.infoWindow.open(this.state.map, this.state.infoWindow.marker)
    }

    componentDidMount() {
        //Loads Google Maps API
        window.loadMap = this.loadMap;
        window.populateInfoWindow = this.populateInfoWindow;
        window.openInfoWindow = this.openInfoWindow;
        var script = document.createElement("script");
        script.src = "https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyCGekEiZ6lE1XN9rQrmIAqbnN-pF7xMX60&callback=loadMap";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    }

    render() {
        return (
            <div id='map'></div>
        )
    }
}

export default GoogleMap;