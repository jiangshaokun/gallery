require('styles/Resume.less')

import React from 'react';

class Resume extends React.Component {
  render() {
    return (
      <section className="resume">
        <h1 className="my-name">江绍坤</h1>
        <p className="profession">前端开发攻城狮</p>
        <h3 className="title">专业技能</h3>
        <div className="menu ability">
          <ul>
            <li>熟练掌握 语义化的 HTML 和具有兼容性的 CSS 及原生 JavaScript</li>
            <li>熟悉 HTML5, CSS3, ES6</li>
            <li>熟练使用 LESS, JQuery/Zepto.js, TypeScript</li>
            <li>熟悉 React, Vue, Bootstrap 框架</li>
            <li>熟练使用 Egret 引擎开发 H5 游戏</li>
            <li>熟练使用 Gulp, Webpack, Yeoman 构建工具</li>
            <li>熟悉 PHP, Mysql</li>
            <li>熟悉 node, express</li>
            <li>熟悉 移动web, 微信web开发</li>
          </ul>
        </div>
        <h3 className="title">工作经历</h3>
        <div className="menu experience">
          <div className="experience-item">
            <div className="company-wrapper">
              <span><a className="company-link" href="http://meiriq.com/" target="_blank">每日Q游戏</a></span>
              <span>2015.08 - 2015.11</span>
              <span>前端工程狮</span>
            </div>
            <ul className="work-content">
              <li>负责公司 TV 游戏开发与适配</li>
              <li>开发移动端 Hybird 页面</li>
            </ul>
          </div>
          <div className="experience-item">
            <div className="company-wrapper">
              <span><a className="company-link" href="http://www.rabbitpre.com/" target="_blank">兔展</a></span>
              <span>2015.12 - 现在</span>
              <span>全栈工程狮</span>
            </div>
            <ul className="work-content">
              <li>兔展广州分部创始成员</li>
              <li>负责公司合作方高级定制H5项目前端以及后台开发</li>
            </ul>
          </div>
        </div>
        <h3 className="title">教育背景</h3>
        <div className="menu education">
          <span><a href="http://www.gdufs.edu.cn/" target="_blank">广东外语外贸大学</a></span>
          <span>2011.09 - 2015.07</span>
          <span>软件工程</span>
          <span>一批本科</span>
        </div>
        <h3 className="title">个人简介</h3>
        <div className="menu introduction">
          <p>喜欢动漫,音乐,游泳,乒乓球</p>
          <p>对 web 前端有浓厚兴趣</p>
          <p>为人和善, 做事认真负责</p>
          <p>喜欢接触新事物, 自学能力强</p>
        </div>

      </section>
    );
  }
}

Resume.defaultProps = {};

export default Resume;
