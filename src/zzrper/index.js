import { initOpts } from './init'
import { judgeCurPosition, addClass } from './utils'

const zzrper = {}

function getStartEndComponent(ymDs, point, relative) {
  return (relative.l === -1) || (relative.r === 1) ? null : (
    ymDs[point.year] &&
    ymDs[point.year][point.month] &&
    ymDs[point.year][point.month].dDs[point.date - 1]
  ) || null
}

function handleSomeInRange({ startComponent, endComponent }, { cs, ce }, ymDs) {
  const { year: sy, month: sm, date: sd } = cs
  const { year: ey, month: em, date: ed } = ce

  let unCurYears = null
  let startCurYearUnCurMonths = null
  let endCurYearUnCurMonths = null
  let startCurMonthInRange = null
  let endCurMonthInRange = null

  if (startComponent === null) {
    console.log('起始超出，結束未超出')
    unCurYears = Object.keys(ymDs).filter(year => year < ey)
    endCurYearUnCurMonths = Object.keys(ymDs[ey]).filter(month => month < em)
    endCurMonthInRange = ymDs[ey][em].dDs.slice(0, ed - 1)
    return { unCurYears, startCurYearUnCurMonths, endCurYearUnCurMonths, startCurMonthInRange, endCurMonthInRange }
  }

  if (endComponent === null) {
    console.log('起始未超出，結束超出')
    unCurYears = Object.keys(ymDs).filter(year => year > sy)
    startCurYearUnCurMonths = Object.keys(ymDs[sy]).filter(month => month > sm)
    startCurMonthInRange = ymDs[sy][sm].dDs.slice(sd)
    return { unCurYears, startCurYearUnCurMonths, endCurYearUnCurMonths, startCurMonthInRange, endCurMonthInRange }
  }

  if (sy === ey) {
    const yearInfo = ymDs[sy]
    if (sm === em) {
      console.log('同年同月')
      const monthInfo = yearInfo[sm]
      startCurMonthInRange = monthInfo.dDs.slice(sd, ed - 1)
    } else {
      console.log('同年不同月')
      startCurYearUnCurMonths = Object.keys(yearInfo).filter(month => month > sm && month < em)
      startCurMonthInRange = ymDs[sy][sm].dDs.slice(sd)
      endCurMonthInRange = ymDs[ey][em].dDs.slice(0, ed - 1)
    }
  } else {
    console.log('不同年')
    unCurYears = Object.keys(ymDs).filter(year => year > sy && year < ey)
    startCurYearUnCurMonths = Object.keys(ymDs[sy]).filter(month => month > sm)
    endCurYearUnCurMonths = Object.keys(ymDs[ey]).filter(month => month < em)
    startCurMonthInRange = ymDs[sy][sm].dDs.slice(sd)
    endCurMonthInRange = ymDs[ey][em].dDs.slice(0, ed - 1)
  }

  return { unCurYears, startCurYearUnCurMonths, endCurYearUnCurMonths, startCurMonthInRange, endCurMonthInRange }
}

function getInRangeComponent({ startComponent, endComponent }, pos, curSelectDate, ymDs) {
  const { lcs, rce } = pos
  const allInRange = lcs === -1 && rce === 1

  // all in range
  if (allInRange) {
    return true
  }

  // Not in range
  if (startComponent === null && endComponent === null) {
    return false
  }

  // some in range
  return handleSomeInRange({ startComponent, endComponent }, curSelectDate, ymDs)
}

function getSelectedComponents(ymDs, selectDate, pos) {
  const { start: { cur: cs }, end: { cur: ce } } = selectDate
  const startComponent = getStartEndComponent(ymDs, cs, { l: pos.lcs, r: pos.rcs })
  const endComponent = getStartEndComponent(ymDs, ce, { l: pos.lce, r: pos.rce })
  const rangeComponents = getInRangeComponent({ startComponent, endComponent }, pos, { cs, ce }, ymDs)
  return { startComponent, endComponent, rangeComponents }
}

function handleSEClass(doms, cls) {
  const { startComponent, endComponent } = doms
  const { cls_selectStart, cls_selectEnd } = cls

  startComponent && addClass(startComponent, cls_selectStart)
  endComponent && addClass(endComponent, cls_selectEnd)
}

function handleInRangeCurMonthCls(curMonthInRange, cls_inRange) {
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

function setClasses(doms, cls, ymDs, selectDate) {
  const { startComponent, endComponent, rangeComponents } = doms
  handleSEClass({ startComponent, endComponent }, cls)
  handleInRangeClass(rangeComponents, ymDs, cls, selectDate)
}

function handleInitSeleted(datas, opts) {
  const { pointers, doms: { ymDs } } = datas
  const { selectDate, cls } = opts
  const pos = judgeCurPosition(selectDate, pointers)
  const doms = getSelectedComponents(ymDs, selectDate, pos)
  setClasses(doms, cls, ymDs, selectDate)
}

zzrper.install = (zz) => {
  zz.mixin({
    onCreated(datas) {
      if (datas.opts.zzrp === true) {
        const opts = initOpts(datas.opts)
        handleInitSeleted(datas, opts)
      } else if (datas.opts.zzsp !== undefined) {
        delete datas.opts.zzsp
      }
    },
    onBeforeDomBeAssyAtResetDom(datas) {
      console.log(datas)
    }
  })
}

export default zzrper
