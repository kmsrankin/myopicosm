import React, { Component } from 'react';
import BodyField from './BodyField'

class PossibilityFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      possibilityBody: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.bodyChangeHandler = this.bodyChangeHandler.bind(this)
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
    this.props.addNewPossibility(payload)
    this.setState( { possibilityBody: "" } )
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit} className="new-possibility-form callout">
        <BodyField
          content={this.state.possibilityBody}
          label="Possibility Body"
          name="possibility-body"
          handleChange={this.bodyChangeHandler}
        />

        <div className="button-group">
          <button className="button">Clear</button>
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    )
  }
}

export default PossibilityFormContainer
