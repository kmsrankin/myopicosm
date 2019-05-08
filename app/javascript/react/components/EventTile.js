import React from 'react'
import { Link } from 'react-router'

const EventTile = (props) => {
  return(
    <div>
      <Link to={`stories/${props.storyID}/events/${props.eventID}`} >‡‡   </Link>
      {props.body}
    </div>
  )
}

export default EventTile
