require('styles/Resume.less')

import React from 'react'

class Resume extends React.Component {
  render () {
    return (
      <section className='resume'>
        <h3 className='title'>职业信息</h3>
        <div className='menu experience'>
          <div className='experience-item'>
            <div className='company-wrapper'>
              <span><a className='company-link' href='http://www.wps.cn/' target='_blank'>金山WPS</a></span>
              <span>前端工程师</span>
            </div>
          </div>
        </div>
        <h3 className='title'>教育背景</h3>
        <div className='menu education'>
          <span><a href='http://www.gdufs.edu.cn/' target='_blank'>广东外语外贸大学</a></span>
          <span>软件工程</span>
          <span>2011.09 - 2015.07</span>
          <span>本科</span>
        </div>
        <h3 className='title'>专业技能</h3>
        <div className='menu ability'>
          <ul>
            <li>
              熟练掌握 语义化的 HTML 和具有兼容性的 CSS 及原生 JavaScript
            </li>
            <li>
              熟练使用 JQuery, Less, Bootstrap, Vue 等框架
            </li>
            <li>
              熟练使用 Gulp, Webpack 等构建工具
            </li>
            <li>
              熟悉 PHP, NodeJS
            </li>
            <li>
              熟悉 移动web, 管理后台, 电商网站等开发
            </li>
          </ul>
        </div>
        <h3 className='title'>个人简介</h3>
        <div className='menu introduction'>
          <p>
            喜欢动漫,音乐,游泳,乒乓球
          </p>
          <p>
            为人和善, 做事认真负责
          </p>
          <p>
            喜欢接触新事物, 自学能力强
          </p>
        </div>
      </section>
    )
  }
}

Resume.defaultProps = {}

export default Resume
