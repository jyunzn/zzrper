import { removeClass, judgeDateStatus } from './utils'
import { handleInitSeleted } from './init/initSelected'

function getDate(target, mCD) {
  const ym = mCD.$_ym
  return { ...ym, date: target.textContent * 1 }
}

function handleResetSE(date, ymDs, cls) {
  const monthInfo = ymDs[date.year]
  const monthDoms = monthInfo && monthInfo[date.month]
  const dom = monthDoms && monthDoms.dDs[date.date - 1]
  dom && removeClass(dom, cls)
}

function handleResetInRange(inRange, ymDs, cls) {
  Object.keys(inRange).forEach(year => {
    const monthInfo = inRange[year]
    Object.keys(monthInfo).forEach(month => {
      const doms = ymDs[year][month]
      const mse = inRange[year][month]
      doms.dDs.slice(mse.start - 1, mse.end).forEach(dom => removeClass(dom, cls))
    })
  })
}

function resetSelect(zzDates) {
  const { opts: { zzrp }, doms: { ymDs } } = zzDates
  const {
    draw,
    selectDate,
    cls: { cls_inRange, cls_selectEnd, cls_selectStart }
  } = zzrp
  const { start, end, inRange } = draw

  start && handleResetSE(start, ymDs, cls_selectStart)
  end && handleResetSE(end, ymDs, cls_selectEnd)
  inRange && handleResetInRange(inRange, ymDs, cls_inRange)

  draw.start = null
  draw.end = null
  draw.inRange = null

  selectDate.start.cur = null
  selectDate.end.cur = null
}

function handleOnSelect(selectingDate, zzDates, zzrpOpts) {
  const { selectDate: { start, end }, cls: { cls_selectStart }, cbs } = zzrpOpts

  if (start.cur === null) {
    // never select
    start.cur = selectingDate
    cbs.onSelectStart.forEach(cb => cb.call(null, { start: selectingDate, end: null }))
  } else {
    if (end.cur === null) {
      // only select start
      if (judgeDateStatus(start.cur, selectingDate) === -1) {
        handleResetSE(start.cur, zzDates.doms.ymDs, cls_selectStart)
        end.cur = start.cur
        start.cur = selectingDate
      } else {
        end.cur = selectingDate
      }
      cbs.onSelectEnd.forEach(cb => cb.call(null, { start: { ...start.cur }, end: { ...end.cur } }))
    } else {
      // select both
      resetSelect(zzDates)
      start.cur = selectingDate
      cbs.onSelectStart.forEach(cb => cb.call(null, { start: selectingDate, end: null }))
    }
  }

  handleInitSeleted(zzDates, zzrpOpts)
}

export function onSelect(zzDates, zzrpOpts) {
  const { cls_date } = zzDates.opts
  const { ymDs } = zzDates.doms

  Object.keys(ymDs).forEach(year => {
    const yearInfo = ymDs[year]
    Object.keys(yearInfo).forEach(month => {
      const { mCD } = yearInfo[month]
      mCD.addEventListener('click', function (ev) {
        const { target } = ev
        if ([...target.classList].includes(cls_date[0])) {
          const selectingDate = getDate(target, mCD)
          handleOnSelect(selectingDate, zzDates, zzrpOpts)
        }
      })
    })
  })
}
