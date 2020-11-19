export const isObj = obj => Object.prototype.toString.call(obj) === '[object Object]'
export const isFunc = func => Object.prototype.toString.call(func) === '[object Function]'
export const isArr = arr => Object.prototype.toString.call(arr) === '[object Array]'
export const isNaN = input => typeof input === 'number' && input !== input

export const dateStrToDateObj = dateStr => {
  if (typeof dateStr !== 'string' || !dateStr.includes('-')) {
    return null
  }

  const dateStrArr = dateStr.split('-').map(str => str * 1)
  dateStrArr[1] -= 1
  const dObj = new Date(...dateStrArr)

  if (isNaN(dObj.getTime())) {
    return null
  }
  return dObj
}

export const getDateInfo = dObj => {
  const year = dObj.getFullYear()
  const month = dObj.getMonth() + 1
  const date = dObj.getDate()
  return { year, month, date }
}

export function judgeDateStatus(baseDateObj, dateObj) {
  console.log(baseDateObj, dateObj)
  const { year: by, month: bm, date: bd } = baseDateObj
  const { year: y, month: m, date: d } = dateObj

  if ((y < by) || (y === by && m < bm) || (y === by && m === bm && d < bd)) {
    return -1 // 左邊
  } else if (y === by && m === bm && d === bd) {
    return 0 // 中間
  } else {
    return 1 // 右邊
  }
}

export function initClass(options, dCls) {
  const clsObj = {}
  for (let clsKey in dCls) {
    let cls = options[clsKey]
    if (cls !== undefined) {
      if (typeof cls !== 'string') {
        cls = dCls[clsKey]
      }
      delete options[clsKey]
    } else {
      cls = dCls[clsKey]
    }
    clsObj[clsKey] = cls ? cls.split(' ') : []
  }
  return clsObj
}

export function deepcopy(target) {
  if (isObj(target)) {
    const obj = {}
    for (let key in target) {
      obj[key] = deepcopy(target[key])
    }
    return obj
  } else if (isArr(target)) {
    const arr = []
    for (let i = 0; i < target.length; i++) {
      const val = target[i]
      arr.push(deepcopy(val))
    }
    return arr
  } else {
    return target
  }
}
