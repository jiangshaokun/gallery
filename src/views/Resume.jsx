require('styles/Resume.less')

import React from 'react'

class Resume extends React.Component {
  render () {
    return (
      <section className='resume'>
        <h1 className='my-name'>江绍坤</h1>
        <p className='profession'>
          前端开发攻城师
        </p>
        <h3 className='title'>专业技能</h3>
        <div className='menu ability'>
          <ul>
            <li>
              熟练掌握 语义化的 HTML 和具有兼容性的 CSS 及原生 JavaScript
            </li>
            <li>
              熟悉 HTML5, CSS3, ES6
            </li>
            <li>
              熟练使用 LESS, JQuery/Zepto, Vue, Bootstrap 等框架
            </li>
            <li>
              熟练使用 Egret 引擎开发 H5 游戏
            </li>
            <li>
              熟练使用 Gulp, Webpack 等构建工具
            </li>
            <li>
              熟悉 PHP, NodeJS
            </li>
            <li>
              熟悉 移动web, 微信web, 管理后台等开发
            </li>
          </ul>
        </div>
        <h3 className='title'>工作经历</h3>
        <div className='menu experience'>
          <div className='experience-item'>
            <div className='company-wrapper'>
              <span><a className='company-link' href='http://www.rabbitpre.com/' target='_blank'>兔展</a></span>
              <span>2015.07 - 2016.08</span>
              <span>前端工程师</span>
            </div>
            <ul className='work-content'>
              <li>
                H5 游戏开发
              </li>
              <li>
                H5 定制项目前端以及后台开发
              </li>
            </ul>
          </div>
          <div className='experience-item'>
            <div className='company-wrapper'>
              <span><a className='company-link' href='https://app.seeyoutime.com/' target='_blank'>形点网络</a></span>
              <span>2016.09 - 现在</span>
              <span>前端工程师</span>
            </div>
            <ul className='work-content'>
              <li>
                APP官网, 推广页面等
              </li>
              <li>
                公司运营后台, 客户后台
              </li>
              <li>
                APP内交互页面与活动页面
              </li>
            </ul>
          </div>
        </div>
        <h3 className='title'>教育背景</h3>
        <div className='menu education'>
          <span><a href='http://www.gdufs.edu.cn/' target='_blank'>广东外语外贸大学</a></span>
          <span>2011.09 - 2015.07</span>
          <span>软件工程</span>
          <span>一批本科</span>
        </div>
        <h3 className='title'>个人简介</h3>
        <div className='menu introduction'>
          <p>
            喜欢动漫,音乐,游泳,乒乓球
          </p>
          <p>
            对 web 前端有浓厚兴趣
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
