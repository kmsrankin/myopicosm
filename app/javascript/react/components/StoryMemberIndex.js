import React, { Component } from 'react'

class StoryMemberIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      newMemberName: '',
      newMembership: {},
      errors: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.bodyChangeHandler = this.bodyChangeHandler.bind(this)
    this.validateSubmission = this.validateSubmission.bind(this)
  }

  componentDidMount() {
    let storyID = this.props.id
    fetch(`/api/v1/stories/${storyID}/memberships`)
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

  bodyChangeHandler(event) {
    this.setState( { newMemberName: event.target.value } )
  }

  handleSubmit(event) {
    event.preventDefault()
    let payload = {
      newMember: this.state.newMemberName,
      storyID: this.props.id
    }
    if (this.validateSubmission(payload)) {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

      fetch('/api/v1/memberships', {
        method: 'POST',
        body: JSON.stringify(payload),
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
          let newMembership = body
          let currentMembers = this.state.members
          this.setState( {
            newMemberName: "",
            members: currentMembers.concat(newMembership)
          } )
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  validateSubmission(submission) {
    let bodyPresent;
    if(submission.newMember.trim() === ""){
      let newError = {emptyBody: "Try entering something before clicking submit."};
      this.setState({errors: newError});
      bodyPresent = false;
    } else {
      let errorState = this.state.errors;
      delete errorState.emptyBody;
      this.setState({errors: errorState});
      bodyPresent = true;
    }
    return bodyPresent
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
    let errorItems;
    let errorDiv;
    if(Object.keys(this.state.errors).length > 0){
      errorItems = Object.values(this.state.errors).map(error =>{
        return(
          <li key={error}>{error}</li>
        );
      })
      errorDiv = <div>{errorItems}</div>;
    }

    return (
      <div>
        <h3>New Member Form</h3>
        <form onSubmit={this.handleSubmit} className="query-form">
          {errorDiv}
          <label>Email
            <input
              type="text"
              name="new-member-name"
              value={this.state.newMemberName}
              onChange={this.bodyChangeHandler}
            />
          </label>
          <input className="button" type="submit" value="Submit" />
        </form>
        This Story's Members:
        {members}
      </div>
    )
  }
}

export default StoryMemberIndex
