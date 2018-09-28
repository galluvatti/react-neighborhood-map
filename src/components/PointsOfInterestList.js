import React, {Component} from 'react'
import PropTypes from 'prop-types'

class PointsOfInterestList extends Component {

    state = {
        query: ''
    }

    filterList = (query) => {

    }

    render() {
        return (
            <div className="search-box">
                <input
                    type="text"
                    className="search-text"
                    placeholder="Search a location..."
                    value={this.state.query}
                    onChange={this.filterList}
                ></input>
                <ul>
                    {this.props.list.map((point) => (
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