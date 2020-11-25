import { addClass } from '../../utils'

export function handleInRangeCurMonthCls(curMonthInRange, cls_inRange) {
  curMonthInRange && curMonthInRange.forEach(dom => addClass(dom, cls_inRange))
}

function handleInRangeMonthCls(curYearUnCurMonth, selectDate, ymDs, cls_inRange) {
  const { year } = selectDate
  curYearUnCurMonth && curYearUnCurMonth.forEach(m => {
    ymDs[year][m].dDs.forEach(dom => addClass(dom, cls_inRange))
  })
}

function handleInRangeYearCls(unCurYears, ymDs, cls_inRange) {
  unCurYears && unCurYears.forEach(y => {
    const yearInfo = ymDs[y]
    Object.keys(yearInfo).forEach(m => {
      const monthDoms = yearInfo[m].dDs
      monthDoms.forEach(dom => addClass(dom, cls_inRange))
    })
  })
}

function handleInRangeClass(rangeComponents, ymDs, cls, selectDate) {
  const { cls_inRange } = cls
  if (rangeComponents === true) {
    const unCurYears = Object.keys(ymDs)
    handleInRangeYearCls(unCurYears, ymDs, cls_inRange)
  } else {
    if (rangeComponents !== false) {
      const {
        unCurYears,
        startCurYearUnCurMonths,
        endCurYearUnCurMonths,
        startCurMonthInRange,
        endCurMonthInRange
      } = rangeComponents
      const { start: { cur: selectStart }, end: { cur: selectEnd } } = selectDate

      handleInRangeYearCls(unCurYears, ymDs, cls_inRange)
      handleInRangeMonthCls(startCurYearUnCurMonths, selectStart, ymDs, cls_inRange)
      handleInRangeMonthCls(endCurYearUnCurMonths, selectEnd, ymDs, cls_inRange)
      handleInRangeCurMonthCls(startCurMonthInRange, cls_inRange)
      handleInRangeCurMonthCls(endCurMonthInRange, cls_inRange)
    }
  }
}

function handleSEClass(doms, cls) {
  const { startComponent, endComponent } = doms
  const { cls_selectStart, cls_selectEnd } = cls

  startComponent && addClass(startComponent, cls_selectStart)
  endComponent && addClass(endComponent, cls_selectEnd)
}

export function setClasses(doms, cls, ymDs, selectDate) {
  const { startComponent, endComponent, rangeComponents } = doms
  handleSEClass({ startComponent, endComponent }, cls)
  handleInRangeClass(rangeComponents, ymDs, cls, selectDate)
}
