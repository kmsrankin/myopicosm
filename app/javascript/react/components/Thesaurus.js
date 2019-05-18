import React, { Component } from 'react';
import BodyField from './BodyField'

class Thesaurus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      queryBody: '',
      thesaurusResponse: {},
      errors: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.bodyChangeHandler = this.bodyChangeHandler.bind(this)
    this.validateSubmission = this.validateSubmission.bind(this)
  }

  bodyChangeHandler(event) {
    this.setState( { queryBody: event.target.value } )
  }

  handleSubmit(event) {
    event.preventDefault()
    let payload = {
      word: this.state.queryBody
    }
    if (this.validateSubmission(payload)) {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

      fetch('/api/v1/thesaurus/search', {
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
          this.setState( {
            queryBody: "",
            thesaurusResponse: body
          } )
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  validateSubmission(submission) {
    let bodyPresent;
    if(submission.word.trim() === ""){
      let newError = {emptyBody: "Try entering something before searching."};
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
    let output
    let synArrays = []
    let antArrays = []
    if (Object.keys(this.state.thesaurusResponse).length > 0) {
      output = Object.keys(this.state.thesaurusResponse).map((key, index) => {
        let synonyms
        let antonyms
        if (this.state.thesaurusResponse[key].syn) {
          synonyms = this.state.thesaurusResponse[key].syn.join(", ")
        }
        if (this.state.thesaurusResponse[key].ant) {
          antonyms = this.state.thesaurusResponse[key].ant.join(", ")
        }
        return (
          <div key={index}>
            <h3>{key}s</h3>
            <p>synonyms: { synonyms }</p>
            <p>antonyms: { antonyms }</p>
          </div>
        )
      })
    }
    return (
      <div>
        <h3>Handy Thesaurus</h3>
        <form onSubmit={this.handleSubmit} className="query-form callout">
          {errorDiv}
          <BodyField
            content={this.state.queryBody}
            label="Enter a word"
            name="query-body"
            handleChange={this.bodyChangeHandler}
          />
          <input className="button" type="submit" value="Submit" />
        </form>
        {output}
      </div>
    )
  }
}

export default Thesaurus
