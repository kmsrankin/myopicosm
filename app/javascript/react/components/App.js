import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import Story from './Story'

export const App = (props) => {

  return (
    <div>
      <Router history={browserHistory}>
        <Route path="/stories/:id" component={Story} />
      </Router>
    </div>
  )
}

export default App
