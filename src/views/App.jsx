require('normalize.css/normalize.css')
require('styles/app.less')

import React from 'react'
import NavLink from '../components/NavLink'

class App extends React.Component {
  render () {
    return (
      <div className='content'>
        <ul className='nav'>
          <li>
            <NavLink to='/gallery' onlyActiveOnIndex>
              画廊
            </NavLink>
          </li>
          <li>
            <NavLink to='/contact'>
              更多
            </NavLink>
          </li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

App.defaultProps = {}

export default App
