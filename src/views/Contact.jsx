require('styles/Contact.less')

import React from 'react'

const qrCode = require('../images/wechat.jpg')

class Contact extends React.Component {
  render () {
    return (
      <section className='contact'>
        <p>
          <a href='https://jiangshaokun.github.io' target='_blank'>Blog</a>
        </p>
        <p>
          <a href='https://github.com/jiangshaokun/' target='_blank'>Github</a>
        </p>
        <p>
          <a href='mailto:1455935316@qq.com'>Mail</a>
        </p>
        <p>
          微信:
        </p>
        <div className='wechat'>
          <img className='qrCode' src={qrCode} alt='微信二维码' />
        </div>
      </section>
    )
  }
}

Contact.defaultProps = {
}

export default Contact
