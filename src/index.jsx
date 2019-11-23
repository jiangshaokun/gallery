import 'core-js/fn/object/assign'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './views/App'
import Gallery from './views/Gallery.jsx'
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
      <Route path='/' component={App}>
        <IndexRoute component={Gallery}/>
        <Route path='/gallery' component={Gallery}/>
        <Route path='/contact' component={Contact}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'))
