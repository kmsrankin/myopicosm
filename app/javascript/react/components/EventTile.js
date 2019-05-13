import React from 'react'
import { Link } from 'react-router'

const EventTile = (props) => {
  return(
    <div className='block'>
      <div className={`${props.className}`}>
        <Link to={`/stories/${props.storyID}/events/${props.eventID}`} >‡‡   </Link>
        {props.body}
      </div>
    </div>
  )
}

export default EventTile
