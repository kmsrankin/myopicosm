import React, { Component } from 'react';
import EventTile from './EventTile';
import PossibilityFormContainer from './PossibilityFormContainer'
import { Link } from 'react-router'
import Thesaurus from './Thesaurus'

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
        let events = story.events.sort((a, b) => a.id - b.id)
        this.setState( {
          story: story,
          events: events
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
        let eventID = body.possibility.event_id
        return window.location.href = `/stories/${this.state.story.id}/events/${eventID}`
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let events = this.state.events.map((event) => {
      if (event.selected_possibility) {
        let image
        if (event.select_pictures.length > 0) {
          image = event.select_pictures[Math.floor(Math.random() * event.select_pictures.length)].event_photo.url
        }
        return(
          <EventTile
            storyID={this.state.story.id}
            eventID={event.id}
            body={event.selected_possibility.body}
            key={event.id}
            className="event"
            image={image}
          />
        )
      } else {
        return(
          <EventTile
            storyID={this.state.story.id}
            eventID={event.id}
            body="<== Click here to explore the possibilities..."
            key={event.id}
            className="last-event event"
          />
        )
      }
    })
    let lastEvent
    if (this.state.events.length > 0) {
      lastEvent = this.state.events.slice(-1)[0].id
    }
    return(
      <div className="show-container">
        <Link to={"/stories"} className="back-button">
          Select a different story
        </Link>
        <div className="story-header">
          <h1>{ this.state.story.name }</h1>
          <p className="story-description">{ this.state.story.description }</p>
          <a href="#form">
            Click Here To Jump To The Bottom Of The Page
          </a>
        </div>
        <div className="block">
          <div className="thesaurus">
           <Thesaurus />
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
      </div>
    )
  }
}

export default StoryShowContainer
