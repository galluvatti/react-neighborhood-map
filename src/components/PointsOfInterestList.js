import React, {Component} from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class PointsOfInterestList extends Component {

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    render() {
        const {list, populateInfoWindow} = this.props;
        const {query} = this.state;
        let showingPlaces
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            showingPlaces = list.filter((place) => match.test(place.title))
        } else {
            showingPlaces = list
        }
        showingPlaces.sort(sortBy('title'))
        list.forEach((marker) => {
            showingPlaces.includes(marker)? marker.setVisible(true) : marker.setVisible(false);
        })
        return (
            <div className="search-box">
                <input
                    type="text"
                    className="search-text"
                    placeholder="Search a location..."
                    value={this.state.query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                ></input>
                <ul>
                    {showingPlaces.map((marker) => (
                        <li
                            key={marker.title}
                            onClick={()=>populateInfoWindow(marker)}
                        >
                            {marker.title}
                            </li>
                    ))}
                </ul>
            </div>
        )
    }

    static propTypes = {
        list: PropTypes.array.isRequired,
        populateInfoWindow: PropTypes.func.isRequired
    }
}


export default PointsOfInterestList;