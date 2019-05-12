import React, { Component } from 'react';
import EventTile from './EventTile';
import PossibilityFormContainer from './PossibilityFormContainer'

class StoryShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      story: {},
      events: []
    }
    this.addNewPossibility = this.addNewPossibility.bind(this)
  }

  componentDidMount() {
    let storyId = this.props.params.id
    fetch(`/api/v1/stories/${storyId}`)
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
        let story = response
        this.setState( {
          story: story,
          events: story.events
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
        return window.location.href = `/stories/${this.state.story.id}/events/${this.state.events.slice(-1)[0].id}`
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let events = this.state.events.map((event) => {
      if (event.selected_possibility) {
        return(
          <EventTile
            storyID={this.state.story.id}
            eventID={event.id}
            body={event.selected_possibility.body}
            key={event.id}
          />
        )
      } else {
        return(
          <EventTile
            storyID={this.state.story.id}
            eventID={event.id}
            body="Click here to explore the possibilities..."
            key={event.id}
            className="last-event"
          />
        )
      }
    })
    let lastEvent
    if (this.state.events.length > 0) {
      lastEvent = this.state.events.slice(-1)[0].id
    }
    return(
        <div>
          <div className="story-header">
            <h1>{ this.state.story.name }</h1>
            <p className="story-description">{ this.state.story.description }</p>
            <a href="#form">Click Here To Jump To The Bottom Of The Page</a>
          </div>
          <div className="scroll">
            <div>{ events }</div>
            <div id="form">
              <PossibilityFormContainer
                addNewPossibility={this.addNewPossibility}
                eventID={lastEvent}
              />
            </div>
          </div>
        </div>
    )
  }
}

export default StoryShowContainer
