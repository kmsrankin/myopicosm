import React, { Component } from 'react';
import StoryTile from './StoryTile';
import StoryFormContainer from './StoryFormContainer'

class StoryIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [],
    }
    this.addNewStory = this.addNewStory.bind(this)
  }

  componentDidMount() {
    fetch(`/api/v1/stories`)
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
        let stories = response
        this.setState( {
          stories: stories
        } )
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addNewStory(formPayload) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    fetch('/api/v1/stories', {
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
        let newStory = body
        this.setState( { stories: this.state.stories.concat(newStory)} )
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let stories = this.state.stories.map((story) => {
      return(
        <StoryTile
          name={story.name}
          id={story.id}
          key={story.id}
        />
      )
    })
    return(
      <div className="show-container">
        <h2 className="story-header">Choose Your Story</h2>
        <div className="story-index">{stories}
        <StoryFormContainer
          addNewStory={this.addNewStory}
        />
        </div>
      </div>
    )
  }
}

export default StoryIndexContainer
