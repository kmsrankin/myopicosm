import React from 'react'

const Instructions = (props) => {
  return(
    <div className="instructions-scroll">
      <h3>Instructions</h3>
      <p>
        First time using Myopicosm? To get started, head to the bottom of the story scroll. There you will find a form where you can make suggestions for what should happen next in the story. Make sure that you know what is happening in the story before you make submissions.
      </p><br />
      <p>
        If you would just like to see what people have suggested so far, click the pair of double daggers on the last event in the scroll (this one is colored blue and just says "Click here to explore the possibilities...")
        There, you will be able to vote for your favorite narrations or go to another tab where you can upload images to depict the associated event.
      </p><br />
      <p>
        I'm sure you are wondering when the story actually continues. As of now, it is up to the owner of the story to decide when the next event in the story should be determined. Only they have access to the button that adds up the votes and assigns the outcome.
      </p>
    </div>
  )
}

export default Instructions
