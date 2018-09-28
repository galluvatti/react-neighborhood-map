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
            ],
            markers: []
        }
        this.loadMap = this.loadMap.bind(this);
    }

    loadMap() {
        console.log("Init Map")
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
                title: point.title
            });

            markers.push(marker);
        })
        this.setState({markers: markers});
    }

    componentDidMount() {
        //Loading Google Maps API
        window.loadMap = this.loadMap;
        var script = document.createElement("script");
        script.src = "https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyCGekEiZ6lE1XN9rQrmIAqbnN-pF7xMX60&callback=loadMap";
        script.defer = true;
        script.async = true;
        document.body.appendChild(script);
        console.log('Script Loaded')
    }

    render() {
        console.log('rendering component')
        return (
            <div id='map'></div>
        )
    }
}

export default GoogleMap;