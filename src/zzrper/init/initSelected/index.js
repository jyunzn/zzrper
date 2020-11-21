import { addClass, judgeCurPosition } from '../../utils'
import { getSelectedComponents } from './getSelectComponents'
import { setClasses } from './setClasses'

export function handleInitSeleted(datas, opts) {
  const { pointers, doms: { ymDs } } = datas
  const { selectDate, cls } = opts
  if (selectDate.end.cur === null) {
    const { year, month, date } = selectDate.start.cur
    const startYearDoms = ymDs[year]
    const startMonthDoms = startYearDoms && startYearDoms[month]
    const startDateDom = startMonthDoms && startMonthDoms.dDs[date - 1]
    startDateDom && addClass(startDateDom, cls.cls_selectStart)
  } else {
    const pos = judgeCurPosition(selectDate, pointers)
    const doms = getSelectedComponents(ymDs, selectDate, pos)
    setClasses(doms, cls, ymDs, selectDate)
  }
}
