import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import StoryShowContainer from './StoryShowContainer'
import StoryIndexContainer from './StoryIndexContainer'

export const App = (props) => {

  return (
    <div>
      <Router history={browserHistory}>
        <Route path="/stories" component={StoryIndexContainer}/>
        <Route path="/stories/:id" component={StoryShowContainer} />
      </Router>
    </div>
  )
}

export default App
