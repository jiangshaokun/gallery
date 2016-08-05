export const centerItem = (projectStateArr) => {
  return {
    type: 'CENTER_ITEM',
    projectStateArr
  }
}

export const inverseItem = (index) => {
  return {
    type: 'INVERSE_ITEM',
    index
  }
}

export const setArrangeType = (arrangeType) => {
  return {
    type: 'SET_ARRANGE_TYPE',
    arrangeType
  }
}
