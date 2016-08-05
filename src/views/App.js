require('normalize.css/normalize.css')
require('styles/App.less')

import React from 'react'
import NavLink from '../components/NavLink'

class App extends React.Component {
  render() {
    return (
      <div className="content">
        <ul className="nav">
          <li><NavLink to="/about/" onlyActiveOnIndex>项目展示</NavLink></li>
          <li><NavLink to="/about/resume">个人简历</NavLink></li>
          <li><NavLink to="/about/contact">联系方式</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

App.defaultProps = {
};

export default App;
