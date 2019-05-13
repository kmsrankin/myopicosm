import React, { Component } from 'react';
import BodyField from './BodyField'

class StoryFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      storyName: '',
      storyDescription: '',
      errors: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.nameChangeHandler = this.nameChangeHandler.bind(this)
    this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this)
    this.validateSubmission = this.validateSubmission.bind(this)
  }

  nameChangeHandler(event) {
    this.setState( { storyName: event.target.value } )
  }

  descriptionChangeHandler(event) {
    this.setState( { storyDescription: event.target.value } )
  }

  handleSubmit(event) {
    event.preventDefault()
    let payload = {
      name: this.state.storyName,
      description: this.state.storyDescription
    }
    if (this.validateSubmission(payload)) {
      this.props.addNewStory(payload);
      this.setState( {
        storyName: "",
        storyDescription: ""
      } )
    }
  }

  validateSubmission(submission){
    if(submission.name.trim() === "" && submission.description.trim() === "") {
      let newError = {emptyName: "Please provide a story name before submitting", emptyDescription: "Please provide a story description before submitting"}
      this.setState( {errors: newError} )
      return false
    } else if (submission.name.trim() === "") {
      let newError = {emptyName: "Please provide a story name before submitting"};
      this.setState( {errors: newError} );
      return false
    } else if (submission.description.trim() === "") {
      let newError = {emptyDescription: "Please provide a story description before submitting"};
      this.setState( {errors: newError} );
      return false
    } else {
      let errorState = this.state.errors;
      delete errorState.emptyName;
      delete errorState.emptyDescription;
      this.setState( {errors: errorState} );
      return true
    }
  }

  render() {
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
    return(
      <div>
        <h3 className="form-header">or...<br/>Start a new one</h3>
        <form onSubmit={this.handleSubmit} className="new-story-form callout">
          {errorDiv}
          <BodyField
            content={this.state.storyName}
            label="Choose a name"
            name="story-name"
            handleChange={this.nameChangeHandler}
          />
          <BodyField
            content={this.state.storyDescription}
            label="What would you like this story to be about?"
            name="story-description"
            handleChange={this.descriptionChangeHandler}
          />
          <input className="button" type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default StoryFormContainer
