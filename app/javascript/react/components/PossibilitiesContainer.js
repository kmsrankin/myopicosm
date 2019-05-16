import React, { Component } from 'react';
import PossibilityTile from './PossibilityTile'
import { Link } from 'react-router'

class PossibilitiesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      possibilities: this.props.possibilities
    }
    this.handleVote = this.handleVote.bind(this)
    this.countVotes = this.countVotes.bind(this)
  }

  handleVote(possibilityID){
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    fetch(`/api/v1/votes`, {
      method: 'POST',
      body: JSON.stringify({possibility_id: possibilityID}),
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

  countVotes() {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    fetch(`/api/v1/events`, {
      method: 'POST',
      body: JSON.stringify({event_id: this.props.event.id, story_id: this.props.event.story_id}),
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
    if (this.props.creator && this.state.possibilities.length > 0 && !this.props.event.selected_possibility) {
      adminButton = (
        <div className="vote-counter">
          <button onClick={this.countVotes}>Add it up!</button>
        </div>
      )
    }
    let header
    if (this.props.event.selected_possibility) {
      header = (
        <h1 className="story-header">Past Possibilities</h1>
      )
    } else {
      header = (
        <h1 className="story-header">Event Forge</h1>
      )
    }
    return (
      <div>
        {header}
        {possibilities}
        {adminButton}
      </div>
    )
  }
}

export default PossibilitiesContainer
