function handleSomeInRange({ startComponent, endComponent }, { cs, ce }, ymDs, justSingleMonth) {
  const { year: sy, month: sm, date: sd } = cs
  const { year: ey, month: em, date: ed } = ce

  let InRangeInfos = {
    unCurYears: null,
    startCurYearUnCurMonths: null,
    endCurYearUnCurMonths: null,
    startCurMonthInRange: null,
    endCurMonthInRange: null
  }

  if (startComponent === null) {
    if (!justSingleMonth) {
      InRangeInfos.unCurYears = Object.keys(ymDs).filter(year => year < ey)
      InRangeInfos.endCurYearUnCurMonths = Object.keys(ymDs[ey]).filter(month => month < em)
    }
    InRangeInfos.endCurMonthInRange = ymDs[ey][em].dDs.slice(0, ed - 1)
  } else if (endComponent === null) {
    InRangeInfos.unCurYears = Object.keys(ymDs).filter(year => year > sy)
    InRangeInfos.startCurYearUnCurMonths = Object.keys(ymDs[sy]).filter(month => month > sm)
    InRangeInfos.startCurMonthInRange = ymDs[sy][sm].dDs.slice(sd)
  } else if (sy === ey) {
    const yearInfo = ymDs[sy]
    if (sm === em) {
      const monthInfo = yearInfo[sm]
      InRangeInfos.startCurMonthInRange = monthInfo.dDs.slice(sd, ed - 1)
    } else {
      InRangeInfos.startCurYearUnCurMonths = Object.keys(yearInfo).filter(month => month > sm && month < em)
      InRangeInfos.startCurMonthInRange = ymDs[sy][sm].dDs.slice(sd)
      InRangeInfos.endCurMonthInRange = ymDs[ey][em].dDs.slice(0, ed - 1)
    }
  } else {
    InRangeInfos.unCurYears = Object.keys(ymDs).filter(year => year > sy && year < ey)
    InRangeInfos.startCurYearUnCurMonths = Object.keys(ymDs[sy]).filter(month => month > sm)
    InRangeInfos.endCurYearUnCurMonths = Object.keys(ymDs[ey]).filter(month => month < em)
    InRangeInfos.startCurMonthInRange = ymDs[sy][sm].dDs.slice(sd)
    InRangeInfos.endCurMonthInRange = ymDs[ey][em].dDs.slice(0, ed - 1)
  }

  // Convert all empty array values ​​back to null
  Object.keys(InRangeInfos).forEach(key => {
    const val = InRangeInfos[key]
    val !== null && !val.length && (InRangeInfos[key] = null)
  })

  return InRangeInfos
}

function getInRangeComponent({ startComponent, endComponent }, pos, curSelectDate, ymDs, isSwitch) {
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
  return handleSomeInRange({ startComponent, endComponent }, curSelectDate, ymDs, isSwitch)
}

function getStartEndComponent(ymDs, point, relative) {
  return (relative.l === -1) || (relative.r === 1) ? null : (
    ymDs[point.year] &&
    ymDs[point.year][point.month] &&
    ymDs[point.year][point.month].dDs[point.date - 1]
  ) || null
}

export function getSelectedComponents(ymDs, selectDate, pos, isSwitch) {
  const { start: { cur: cs }, end: { cur: ce } } = selectDate
  const startComponent = getStartEndComponent(ymDs, cs, { l: pos.lcs, r: pos.rcs })
  const endComponent = getStartEndComponent(ymDs, ce, { l: pos.lce, r: pos.rce })
  const rangeComponents = getInRangeComponent({ startComponent, endComponent }, pos, { cs, ce }, ymDs, isSwitch)
  return { startComponent, endComponent, rangeComponents }
}
