import React, { Component } from 'react';
import PossibilityTile from './PossibilityTile'

class EventShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      possibilities: []
    }
  }

  componentDidMount() {
    let eventID = this.props.params.id
    fetch(`/api/v1/events/${eventID}`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status}(${response.statusText})` ,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(response => {
        let event = response
        this.setState( {
          event: event,
          possibilities: event.possibilities
        } )
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let possibilities = this.state.possibilities.map((possibility) => {
      return(
        <PossibilityTile
          body={possibility.body}
          key={possibility.id}
        />
      )
    })
    return(
      <div>
        <h1>Which path would you like to take?</h1>
        <ul>{ possibilities }</ul>
      </div>
    )
  }
}

export default EventShowContainer
