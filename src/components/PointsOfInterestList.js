import React, {Component} from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class PointsOfInterestList extends Component {

    state = {
        query: ''
    }

    /**
     * Update the query value used to filter markers
     * @param query
     */
    updateQuery = (query) => {
        this.setState({query: query.trim()})
    }

    render() {
        const {list, populateInfoWindow, closeInfoWindow} = this.props;
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
            if (showingPlaces.includes(marker)) {
                marker.setVisible(true)
            }
            else {
                marker.setVisible(false);
                closeInfoWindow();
            }
        })

        return (
            <div className="search-box" role="search">
                <input
                    aria-label="search text"
                    tabIndex={1}
                    type="text"
                    className="search-text"
                    placeholder="Search a location..."
                    value={this.state.query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                ></input>
                <ul role="group">
                    {showingPlaces.map((marker) => (
                        <li
                            role="button"
                            tabIndex={0}
                            key={marker.title}
                            onClick={() => populateInfoWindow(marker)}
                            onKeyPress={() => populateInfoWindow(marker)}
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
        populateInfoWindow: PropTypes.func.isRequired,
        closeInfoWindow: PropTypes.func.isRequired
    }
}


export default PointsOfInterestList;