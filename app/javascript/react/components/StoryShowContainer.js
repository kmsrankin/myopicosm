import React, { Component } from 'react';

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
          story: story
        } )
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    return(
      <div>
        <h1>{ this.state.story.name }</h1>
        <p>{ this.state.story.description }</p>
      </div>
    )
  }
}

export default StoryShowContainer
