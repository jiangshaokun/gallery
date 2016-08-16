import React from 'react'

class ProjectItem extends React.Component {
  /*
   * imgFigure 的点击处理函数
   */
  handleClick (e) {
    if (this.props.arrange.isCenter) {
      this.props.inverse()
    } else {
      this.props.center()
    }

    e.stopPropagation()
    e.preventDefault()
  }

  render () {
    let styleObj = {}
    let projectClassName = 'project-item'

    // 如果props属性中指定了这张图片的位置，则使用
    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos
    }

    // 如果图片的旋转角度有值并且不为0， 添加旋转角度
    if (this.props.arrange.rotate) {
      (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function (value) {
        styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)'
      }.bind(this))
    }

    // 如果是居中的图片， z-index设为99
    if (this.props.arrange.isCenter) {
      styleObj.zIndex = '99'
      projectClassName += this.props.arrange.isInverse ? ' is-inverse' : ''
    } else {
      styleObj.zIndex = this.props.index
    }

    return (
      <figure className={projectClassName} style={styleObj} onClick={this.handleClick.bind(this)}>
        <img className='project-photo' src={this.props.data.imageURL} alt={this.props.data.title} />
        <figcaption>
          <h3 className='project-title'>{this.props.data.title}</h3>
          <div className='project-back' onClick={this.handleClick.bind(this)}>
            <p>
              涉及技术:
              {this.props.data.dev}
            </p>
            <p>
              负责部分:
              {this.props.data.work}
            </p>
            <p>
              项目地址:
            </p>
            <img src={this.props.data.qrCode} alt={this.props.data.title} />
          </div>
        </figcaption>
      </figure>
    )
  }
}

export default ProjectItem
