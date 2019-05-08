import React, { Component } from 'react';
import EventTile from './EventTile';

class StoryShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      story: {},
      events: []
    }
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
            body="Explore the possibilities..."
            key={event.id}
          />
        )
      }
    })
    return(
      <div>
        <h1>{ this.state.story.name }</h1>
        <p>{ this.state.story.description }</p>
        <ul>{ events }</ul>
      </div>
    )
  }
}

export default StoryShowContainer
