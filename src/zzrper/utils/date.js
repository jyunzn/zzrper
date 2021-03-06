import { isNaN } from './common'

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

/**
 * @description
 *    Use baseDateObj as a benchmark to compare the relative position of dateObj
 * @param {object} { year, month, date }
 * @param {object} { year, month, date }
 * @return {enum}
 *    -1: before
 *    0:  the same day
 *    1:  future
 */
export function judgeDateStatus(baseDateObj, dateObj) {
  const { year: by, month: bm, date: bd } = baseDateObj
  const { year: y, month: m, date: d } = dateObj

  if ((y < by) || (y === by && m < bm) || (y === by && m === bm && d < bd)) {
    return -1
  } else if (y === by && m === bm && d === bd) {
    return 0
  } else {
    return 1
  }
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
}

export const getDays = (year, month) => {
  const day30 = [4, 6, 8, 9, 11];
  const day31 = [1, 3, 5, 7, 8, 10, 12];
  let days =
    day31.includes(month) ? 31 :
      day30.includes(month) ? 30 :
        isLeapYear(year) ? 29 : 28;

  return days
}

/**
 * @cur { year, month, date }
 * @param { selectData } { start: { cur }, end: { cur } }
 * @param { points } { pL: { year, month }, pR: { year, month }}
 * @return { object } { lcs, lce, rcs, rce },
 *    l => point left,
 *    r => point right,
 *    cs => current select start
 *    ce => current select end
 */
export function judgeCurPosition(selectData, points) {
  const { start: { cur: cs }, end: { cur: ce } } = selectData
  const { pL, pR } = points

  const l = { ...pL, date: 1 }
  const r = { ...pR, date: getDays(pR.year, pR.month) }

  const lcs = judgeDateStatus(l, cs)
  const lce = judgeDateStatus(l, ce)
  const rcs = judgeDateStatus(r, cs)
  const rce = judgeDateStatus(r, ce)

  return { lcs, lce, rcs, rce }
}

export function isDateMisplaced(start, end) {
  if (end !== null) {
    if (start === null) {
      return true
    } else {
      if (judgeDateStatus(start, end) === -1) {
        return true
      }
    }
  }
  return false
}
