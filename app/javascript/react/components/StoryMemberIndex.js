import React, { Component } from 'react'

class StoryMemberIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: []
    }
  }

  componentDidMount() {
    let storyId = this.props.params.id
    fetch(`/api/v1/stories/${storyId}/memberships`)
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
        this.setState( {
          members: response
        } )
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let members = []
    if (this.state.members.length > 0) {
      members = this.state.members.map((member) => {
        return(
          <div key={member.id}>
            {member.email}
          </div>
        )
      })
    }

    return (
      <div>
        This Story's Members:
        {members}
      </div>
    )
  }
}

export default StoryMemberIndex
