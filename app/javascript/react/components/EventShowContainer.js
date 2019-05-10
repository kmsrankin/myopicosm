import React, { Component } from 'react';
import PossibilityTile from './PossibilityTile'
import PossibilityFormContainer from './PossibilityFormContainer'

class EventShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      possibilities: [],
      userID: null
    }
    this.addNewPossibility = this.addNewPossibility.bind(this)
    this.handleVote = this.handleVote.bind(this)
    this.selectPossibility = this.selectPossibility.bind(this)
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
          possibilities: event.possibilities,
          userID: event.user_id
        } )
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addNewPossibility(formPayload) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    fetch('/api/v1/possibilities', {
      method: 'POST',
      body: JSON.stringify(formPayload),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      credentials: 'same-origin'
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
           error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        let currentPossibilities = this.state.possibilities
        this.setState({ possibilities: currentPossibilities.concat(body.possibility) })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleVote(possibilityID){
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    fetch(`/api/v1/votes`, {
      method: 'POST',
      body: JSON.stringify({possibility_id: possibilityID, user_id: this.state.userID}),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      credentials: 'same-origin'
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status}(${response.statusText})` ,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  selectPossibility() {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    fetch(`/api/v1/events`, {
      method: 'POST',
      body: JSON.stringify({event_id: this.state.event.id, story_id: this.state.event.story_id}),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      credentials: 'same-origin'
    })
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
      .then(body => {
        return window.location.href = `/stories/${body.story.id}`
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let possibilities = this.state.possibilities.map((possibility) => {
      return(
        <PossibilityTile
          body={possibility.body}
          key={possibility.id}
          vote={possibility.current_user_vote_type}
          handleVote={this.handleVote}
          id={possibility.id}
        />
      )
    })
    let adminButton
    if (this.state.event.creator && this.state.possibilities.length > 0) {
      adminButton = (
        <div>
          <button onClick={this.selectPossibility}>Add it up!</button>
        </div>
      )
    }
    if (this.state.event.selected_possibility) {
      return(
        <div>
          <h1>These things could have happened.. But didn't.</h1>
          <ul>{ possibilities }</ul>
        </div>
      )
    } else {
      return(
        <div>
          <h1>Which path would you like to take?</h1>
          <ul>{ possibilities }</ul>
          <div>{adminButton}</div>
          <PossibilityFormContainer
            addNewPossibility={this.addNewPossibility}
            eventID={this.state.event.id}
          />
        </div>
      )
    }
  }
}

export default EventShowContainer
