import React, { Component } from 'react';
import PossibilitiesContainer from './PossibilitiesContainer'
import GalleryContainer from './GalleryContainer'
import { Link } from 'react-router'


class EventShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      selectedDisplay: null
    }
    this.setSelectedDisplay = this.setSelectedDisplay.bind(this)
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
          selectedDisplay: "possibilities"
        } )
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  setSelectedDisplay(){
    if (this.state.selectedDisplay === "possibilities") {
      this.setState( { selectedDisplay: "gallery" } )
    } else {
      this.setState( { selectedDisplay: "possibilities" } )
    }
  }

  render(){
    let possibilities = []
    let images = []
    let eventID

    if (this.state.event.id) {
      possibilities = this.state.event.possibilities
      images = this.state.event.pictures
      eventID = this.state.event.id
    }

    if (this.state.selectedDisplay === "possibilities") {
      return (
        <div className="show-container">
          <Link to={`/stories/${this.state.event.story_id}`} className="back-button">
            Return To the Story
          </Link>
          <span className="tab-group">
            <span
              className="selected-tab"
            >
              View Narrations
            </span>
            <span
              onClick={this.setSelectedDisplay}
              className="unselected-tab"
            >
              View Gallery
            </span>
          </span>
          <PossibilitiesContainer
            possibilities={possibilities}
            creator={this.state.event.creator}
            event={this.state.event}
          />
        </div>
      )
    } else if (this.state.selectedDisplay === "gallery") {
      return (
        <div className="show-container">
          <Link to={`/stories/${this.state.event.story_id}`} className="back-button">
              Return To the Story
          </Link>
          <span className="tab-group">
            <span
              onClick={this.setSelectedDisplay}
              className="unselected-tab"
            >
              View Narrations
            </span>
            <span
              className="selected-tab"
            >
              View Gallery
            </span>
          </span>
          <GalleryContainer
            eventID={eventID}
            images={images}
          />
        </div>
      )
    } else {
      return (
        <h1>Please wait. No WAAAAAAAAIIITT!!!!</h1>
      )
    }
  }
}

export default EventShowContainer
