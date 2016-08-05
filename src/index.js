import 'core-js/fn/object/assign'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './views/App'
import Project from './views/Project'
import Resume from './views/Resume'
import Contact from './views/Contact'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers/reducers'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'

const store = createStore(reducer)

// Render the main component into the dom
ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/about/" component={App}>
        <IndexRoute component={Project}/>
        <Route path="/about/project" component={Project}/>
        <Route path="/about/resume" component={Resume}/>
        <Route path="/about/contact" component={Contact}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'))
