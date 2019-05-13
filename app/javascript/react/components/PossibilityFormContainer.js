import React, { Component } from 'react';
import BodyField from './BodyField'

class PossibilityFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      possibilityBody: '',
      errors: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.bodyChangeHandler = this.bodyChangeHandler.bind(this)
    this.validateSubmission = this.validateSubmission.bind(this)
  }

  bodyChangeHandler(event) {
    this.setState( { possibilityBody: event.target.value } )
  }

  handleSubmit(event) {
    event.preventDefault()
    let payload = {
      body: this.state.possibilityBody,
      event_id: this.props.eventID
    }
    if (this.validateSubmission(payload)) {
      this.props.addNewPossibility(payload);
      this.setState( { possibilityBody: "" } )
    }
  }

  validateSubmission(submission) {
    let bodyPresent;
    if(submission.body.trim() === ""){
      let newError = {emptyBody: "Try typing a few letter before submitting the form ya damgus"};
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
      <form onSubmit={this.handleSubmit} className="possibility-form callout">
        {errorDiv}
        <BodyField
          content={this.state.possibilityBody}
          label="What do you think should happen next?"
          name="possibility-body"
          handleChange={this.bodyChangeHandler}
        />
        <input className="button" type="submit" value="Submit" />
      </form>
    )
  }
}

export default PossibilityFormContainer
