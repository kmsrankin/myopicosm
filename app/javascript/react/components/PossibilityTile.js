import React, { Component } from 'react'

class PossibilityTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vote: this.props.vote
    }
    this.grabID = this.grabID.bind(this)
    this.clickVote = this.clickVote.bind(this)
  }

  grabID() {
    return this.props.id
  }

  clickVote(){
    let vote = this.state.vote
    this.props.handleVote(this.grabID())
    this.setState({
      vote: !vote
    })
  }

  render() {
    let voteStamp
    if (this.state.vote) {
      voteStamp = "Voted"
    } else {
      voteStamp = "Vote"
    }
    return (
      <li>
        <button onClick={this.clickVote}>{voteStamp}</button>
        {this.props.vote}
        {this.props.body}
      </li>
    )
  }
}

export default PossibilityTile
