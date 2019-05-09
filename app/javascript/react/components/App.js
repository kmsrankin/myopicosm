import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import StoryShowContainer from './StoryShowContainer'
import StoryIndexContainer from './StoryIndexContainer'
import EventShowContainer from './EventShowContainer'

export const App = (props) => {

  return (
    <div>
      <Router history={browserHistory}>
        <Route path="/" component={StoryIndexContainer}/>
        <Route path="/stories" component={StoryIndexContainer}/>
        <Route path="/stories/:story_id/events/:id" component={EventShowContainer}/>
        <Route path="/stories/:id" component={StoryShowContainer}/>
      </Router>
    </div>
  )
}

export default App
