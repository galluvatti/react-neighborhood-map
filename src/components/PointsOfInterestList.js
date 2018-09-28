import React, {Component} from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class PointsOfInterestList extends Component {

    state = {
        query: '',
        placesList: []
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    componentDidMount() {
        // const places = [];
        // this.props.list.forEach((p) => places.push(p));
        // this.setState({placesList:places});
    }

    render() {
        const {list} = this.props;
        const {query} = this.state;
        let showingPlaces
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            showingPlaces = list.filter((place) => match.test(place.title))
        } else {
            showingPlaces = list
        }
        showingPlaces.sort(sortBy('title'))
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
                    {showingPlaces.map((point) => (
                        <li key={point.title}>{point.title}</li>
                    ))}
                </ul>
            </div>
        )
    }

    static propTypes = {
        list: PropTypes.array.isRequired
    }
}


export default PointsOfInterestList;