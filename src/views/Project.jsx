require('styles/Project.less')

import React from 'react'
import ReactDOM from 'react-dom'
import ProjectItem from '../components/ProjectItem'

import { connect } from 'react-redux'
import { centerItem, inverseItem, setArrangeType } from '../actions/actions'

let projectData = require('../data/projectData.json')

// 利用自执行函数， 将图片名信息转成图片URL路径信息,projectData 转变为数组
projectData = ((dataObj) => {
  let _arr = []
  for (let i = 0, length = dataObj.length; i < length; i++) {
    let singleData = dataObj[i]
    singleData.imageURL = require('../images/' + singleData.projectImg)
    singleData.qrCode = require('../images/' + singleData.qrCode)
    _arr[i] = singleData
  }
  return _arr
})(projectData)

// 随机生成一个值
function getRangeRandom (low, high) {
  return Math.ceil(Math.random() * (high - low) + low)
}

class Project extends React.Component {
  constructor () {
    super() // 排列所需数据
    this.Range = {
      centerPos: {
        left: 0,
        top: 0
      },
      left: { // 水平方向的取值范围
        x: [0, 0],
        y: [0, 0]
      },
      right: { // 垂直方向的取值范围
        x: [0, 0],
        y: [0, 0]
      },
      circle: {
        central: {
          left: 0,
          top: 0
        },
        angleRange: 0,
        r: 0
      },
      width: 0,
      height: 0
    }
  }

  /*
   * 翻转图片
   * @param index 传入执行inverse操作的对应的项目状态数组的index值
   * @returns {Function} 这是一个闭包函数, 其内return一个真正待被执行的函数
   */
  inverse (index) {
    return function () {
      this.props.dispatch(inverseItem(index)) // todo
    }.bind(this)
  }

  /*
   * 利用arrange函数， 居中对应index的图片
   * @param index 需要被居中的对应的项目数组的index值
   * @returns {Function}
   */
  center (index) {
    return function () {
      this.arrange(index)
    }.bind(this)
  }

  /**
   * 布局所有项目
   * @param index 中心项目索引
   */
  arrange (index) {
    switch (this.props.arrangeType) {
      case 'circle':
        this.arrangeCircle(index)
        break
      default:
        this.arrangeHash(index)
    }
  }

  /**
   * 圆形布局
   * @param centerIndex 中心项目索引
   */
  arrangeCircle (centerIndex) {
    let _projectStateArr = new Array(projectData.length) // 项目数据数组长度的新数组
    let projectCenterArr = _projectStateArr.splice(centerIndex, 1) // 从数组中剔除中心项
    const PI = Math.PI
    const r = this.Range.circle.r
    const central = this.Range.circle.central
    const angleRange = this.Range.circle.angleRange
    const length = _projectStateArr.length
    const width = this.Range.width
    const height = this.Range.height

    // 首先居中 centerIndex 的图片, 居中的 centerIndex 的图片不需要旋转
    projectCenterArr[0] = {
      pos: {
        left: central.left,
        top: central.top
      },
      rotate: 0,
      isInverse: false,
      isCenter: true
    }

    // 圆形布局剩下的
    for (let i = 0; i < length; i++) {
      let _rotate = i * angleRange / (length - 1) - 90
      let _left
      let _top
      if (_rotate > 0) {
        _left = central.left + width / 2 + r * Math.abs(Math.cos(2 * PI / 360 * (90 - _rotate)))
        _top = central.top + height / 2 - r * Math.abs(Math.sin(2 * PI / 360 * (90 - _rotate)))
      } else {
        _left = central.left + width / 2 - r * Math.abs(Math.cos(2 * PI / 360 * (90 + _rotate)))
        _top = central.top + height / 2 - r * Math.abs(Math.sin(2 * PI / 360 * (90 + _rotate)))
      }
      _projectStateArr[i] = {
        pos: {
          top: _top,
          left: _left
        },
        rotate: _rotate,
        isInverse: false,
        isCenter: false
      }
    }

    _projectStateArr.splice(centerIndex, 0, projectCenterArr[0]) // 将中心项还原回数组
    this.props.dispatch(centerItem(_projectStateArr)) // todo
  }

  /**
   * 散列布局
   * @param centerIndex 中心项目索引
   */
  arrangeHash (centerIndex) {
    let _projectStateArr = new Array(projectData.length) // 项目数据数组长度的新数组
    let projectCenterArr = _projectStateArr.splice(centerIndex, 1) // 从数组中剔除中心项

    // 首先居中 centerIndex 的图片, 居中的 centerIndex 的图片不需要旋转
    projectCenterArr[0] = {
      pos: this.Range.centerPos,
      rotate: 0,
      isInverse: false,
      isCenter: true
    }

    // 布局左右两侧的图片
    for (let i = 0, length = _projectStateArr.length, meanNumber = length / 2; i < length; i++) {
      let itemLeftPos = null

      // 前半部分布局左边， 右半部分布局右边
      if (i < meanNumber) {
        itemLeftPos = this.Range.left
      } else {
        itemLeftPos = this.Range.right
      }

      _projectStateArr[i] = {
        pos: {
          top: getRangeRandom(this.Range.left.y[0], this.Range.left.y[1]),
          left: getRangeRandom(itemLeftPos.x[0], itemLeftPos.x[1])
        },
        rotate: getRangeRandom(-30, 30),
        isInverse: false,
        isCenter: false
      }
    }

    _projectStateArr.splice(centerIndex, 0, projectCenterArr[0]) // 将中心项还原回数组
    this.props.dispatch(centerItem(_projectStateArr)) // todo
  }

  handleBtnClick (e) {
    switch (this.props.arrangeType) {
      case 'circle':
        this.props.dispatch(setArrangeType('hash'))
        this.arrangeHash(0)
        break
      default:
        this.props.dispatch(setArrangeType('circle'))
        this.arrangeCircle(0)
    }
    e.stopPropagation()
    e.preventDefault()
  }

  componentDidMount () {
    // 首先拿到舞台的大小
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage)
    let stageW = stageDOM.clientWidth
    let stageH = stageDOM.clientHeight
    let halfStageW = Math.ceil(stageW / 2)
    let halfStageH = Math.ceil(stageH / 2)

    // 拿到项目单元的大小
    let projectDOM = ReactDOM.findDOMNode(this.refs.project0)
    let projectW = projectDOM.clientWidth
    let projectH = projectDOM.clientHeight
    let halfProjectW = Math.ceil(projectW / 2)
    let halfProjectH = Math.ceil(projectH / 2)

    // 计算中心点的位置
    this.Range.centerPos = {
      left: halfStageW - halfProjectW,
      top: halfStageH - halfProjectH
    }

    // 计算两侧项目位置的取值范围,圆形的界限
    this.Range.left.x = [0 - halfProjectW, halfStageW - projectW]
    this.Range.left.y = [0 - halfProjectH, stageH - halfProjectH]
    this.Range.right.x = [halfStageW, stageW - halfProjectW]
    this.Range.right.y = this.Range.left.y
    this.Range.circle.central.left = halfStageW - halfProjectW
    this.Range.circle.central.top = stageH - projectH
    this.Range.circle.r = stageH - halfProjectH
    this.Range.circle.angleRange = 150
    this.Range.width = projectW
    this.Range.height = projectH

    // 排列图片
    this.arrange(0)
  }

  render () {
    // 通过调用 connect() 注入:
    const {projectStateArr} = this.props // todo

    let projects = []

    projectData.forEach((value, index) => {

      if (!projectStateArr[index]) {
        projectStateArr[index] = {
          pos: {
            left: '0',
            top: '0'
          },
          rotate: 0,
          isInverse: false,
          isCenter: false
        }
      }

      projects.push(<ProjectItem
                      key={index}
                      index={index}
                      data={value}
                      arrange={projectStateArr[index]}
                      center={this.center(index)}
                      inverse={this.inverse(index)}
                      ref={'project' + index} />)
    })
    return (
      <div>
        <div className='btn-switch-wrap'>
          <button className='btn-switch' onClick={this.handleBtnClick.bind(this)}>
            SWITCH MODE
          </button>
        </div>
        <div className='stage' ref='stage'>
          {projects}
        </div>
      </div>
    )
  }
}

Project.defaultProps = {}

// 基于全局 state ，哪些是我们想注入的 props ?
// 注意：使用 https://github.com/reactjs/reselect 效果更佳。 // todo
function select (state) {
  return {
    arrangeType: state.arrangeType,
    projectStateArr: state.projectStateArr
  }
}

const ConnectedProject = connect(select)(Project)

export default ConnectedProject
