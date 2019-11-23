require('styles/contact.less')

import React from 'react'

class Contact extends React.Component {
  render () {
    return (
      <section className='contact'>
        <p>
          <a href='https://github.com/jiangshaokun/' target='_blank'>Github</a>
        </p>
        <p>
          <a href='mailto:1455935316@qq.com'>Mail</a>
        </p>
      </section>
    )
  }
}

Contact.defaultProps = {
}

export default Contact
