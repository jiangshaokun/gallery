// import { combineReducers } from 'redux'

const item = (state = {projectStateArr: []}, action) => {
  switch (action.type) {
    case 'CENTER_ITEM':
      return Object.assign({}, state, {
        projectStateArr: action.projectStateArr
      })

    case 'INVERSE_ITEM':
      return Object.assign({}, state, {
        projectStateArr: state.projectStateArr.map((project, index) => {
          if (index === action.index) {
            return Object.assign({}, project, {
              isInverse: !project.isInverse
            })
          }
          return project
        })
      })

    case 'SET_ARRANGE_TYPE':
      return Object.assign({}, state, {
        arrangeType: action.arrangeType
      })

    default:
      return state
  }
}

// const todoApp = combineReducers({
//   visibilityFilter,
//   todos
// })

export default item
// projectStateArr[action.index].isInverse = !state.projectStateArr[action.index].isInverse
