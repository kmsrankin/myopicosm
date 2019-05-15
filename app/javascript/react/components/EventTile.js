import React, { Component } from 'react'
import { Link } from 'react-router'

class EventTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    }
    this.toggleImageDisplay = this.toggleImageDisplay.bind(this)
  }

  toggleImageDisplay(){
    let display = this.state.selected
    this.setState( { selected: !display } )
  }

  render(){
    console.log(this.state)
    let image
    let toggleIndicator
    if (this.props.image) {
      toggleIndicator = (
        <span>^^<br /></span>
      )
      if (this.state.selected) {
        image = (
          <img src={this.props.image} className="display"/>
        )
      }
    }
    return(
      <div onClick={this.toggleImageDisplay} className='block'>
        <div className={`${this.props.className}`}>
          {toggleIndicator}
          {image}
          <Link to={`/stories/${this.props.storyID}/events/${this.props.eventID}`} >‡‡   </Link>
          {this.props.body}
        </div>
      </div>
    )
  }
}

export default EventTile
