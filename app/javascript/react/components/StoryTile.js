import React from 'react'
import { Link } from 'react-router'

const StoryTile = (props) => {
  return(
    <div>
      <h3 className="story">
        <Link to={`/stories/${props.id}`}>{props.name}</Link>
      </h3>
    </div>
  )
}

export default StoryTile
