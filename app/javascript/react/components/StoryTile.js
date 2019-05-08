import React from 'react'
import { Link } from 'react-router'

const StoryTile = (props) => {
  return(
    <li>
      <Link to={`/stories/${props.id}`}>{props.name}</Link>
    </li>
  )
}

export default StoryTile
