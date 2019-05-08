import React, { Component } from 'react';
import StoryTile from './StoryTile'

class StoryIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [],
    }
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
      <ul>{stories}</ul>
    )
  }
}

export default StoryIndexContainer
