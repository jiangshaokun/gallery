require('styles/XingDian.less')

import React from 'react'

class XingDian extends React.Component {
  render () {
    return (
      <section className='xingdian'>
        <ul>
          <li>
            <h3><a href="https://app.seeyoutime.com" target="_blank">APP官网</a></h3>
            <p>基于jQuery, fullpage.js 和原生js开发</p>
          </li>
          <li>
            <h3><a href="https://app.seeyoutime.com/mobile/" target="_blank">APP移动官网(手机打开)</a></h3>
            <p>基于zepto, pageslider.js, parallax.js, less开发, gulp 和 webpack 作为构建工具</p>
          </li>
          <li>
            <h3><a href="https://admin.seeyoutime.com/" target="_blank">公司运营后台</a></h3>
            <p>基于vue 1.0, vue-router, vue-cli, jquery, ace.js(bootstrap) 开发</p>
          </li>
          <li>
            <h3><a href="https://customer-admin.seeyoutime.com/" target="_blank">外部客户后台</a></h3>
            <p>基于vue 2.0, vue-router, vue-cli, vuex, jquery, adminLTE(bootstrap) 开发</p>
          </li>
          <li>
            <h3>APP内交互与活动页面</h3>
            <p>基于IOS和安卓客户端实现的<a href="https://github.com/lzyzsd/JsBridge" target="_blank">JSBridge</a>,实现与APP交互</p>
          </li>
        </ul>
      </section>
    )
  }
}

XingDian.defaultProps = {}

export default XingDian
