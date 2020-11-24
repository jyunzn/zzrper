import { addClass, judgeCurPosition } from '../../utils'
import { getSelectedComponents } from './getSelectComponents'
import { setClasses } from './setClasses'
import { getDrawInfo } from './getDrawInfo'

export function handleInitSeleted(datas, opts) {
  const { pointers, doms: { ymDs } } = datas
  const { selectDate, cls } = opts
  const { start: { cur: curStart }, end: { cur: cueEnd } } = selectDate

  let drawInfo = null
  if (cueEnd === null) {
    const { year, month, date } = curStart
    const startYearDoms = ymDs[year]
    const startMonthDoms = startYearDoms && startYearDoms[month]
    const startDateDom = startMonthDoms && startMonthDoms.dDs[date - 1]
    startDateDom && addClass(startDateDom, cls.cls_selectStart)

    drawInfo = { start: curStart, end: null, inRange: null }
  } else {
    const pos = judgeCurPosition(selectDate, pointers)
    const doms = getSelectedComponents(ymDs, selectDate, pos)
    setClasses(doms, cls, ymDs, selectDate)
    drawInfo = getDrawInfo(ymDs, selectDate, doms)
  }
  datas.opts.zzrp.draw = drawInfo
}
