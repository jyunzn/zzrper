import { getDays } from '../../utils'

function handleCurMonth(curMonthInRange, selectStart, side, inRange) {
  const { year, month, date } = selectStart
  inRange[year] || (inRange[year] = {})

  if (side === 'start') {
    inRange[year][month] = {
      start: date + 1,
      end: date + curMonthInRange.length
    }
  } else if (side === 'end') {
    inRange[year][month] = {
      start: date - curMonthInRange.length,
      end: date - 1
    }
  }
}

function handleCurYearUnCurMonths(curYearUnCurMonths, year, inRange) {
  inRange[year] || (inRange[year] = {})
  curYearUnCurMonths.forEach(month => {
    inRange[year][month] = {
      start: 1,
      end: getDays(year * 1, month * 1)
    }
  })
}

function handleUnCurYears(ymDs, unCurYears, inRange) {
  unCurYears.forEach(year => {
    inRange[year] || (inRange[year] = {})
    const months = Object.keys(ymDs[year])
    months.forEach(month => {
      inRange[year][month] = {
        start: 1,
        end: getDays(year * 1, month * 1)
      }
    })
  })
}

function handleInRange(ymDs, rangeComponents, select, singleMonth) {
  const { selectStart, selectEnd } = select

  const inRange = {}
  if (rangeComponents === true) {
    if (!singleMonth) {
      handleUnCurYears(ymDs, Object.keys(ymDs), inRange)
    } else {
      const { year, month } = singleMonth
      handleCurYearUnCurMonths([month], year, inRange)
    }
  } else if (rangeComponents !== false) {
    const {
      unCurYears,
      startCurYearUnCurMonths,
      endCurYearUnCurMonths,
      startCurMonthInRange,
      endCurMonthInRange
    } = rangeComponents

    const { year: selectStartYear } = selectStart
    const { year: selectEndYear } = selectEnd

    unCurYears && handleUnCurYears(ymDs, unCurYears, inRange)
    startCurYearUnCurMonths && handleCurYearUnCurMonths(startCurYearUnCurMonths, selectStartYear, inRange)
    endCurYearUnCurMonths && handleCurYearUnCurMonths(endCurYearUnCurMonths, selectEndYear, inRange)
    startCurMonthInRange && handleCurMonth(startCurMonthInRange, selectStart, 'start', inRange)
    endCurMonthInRange && handleCurMonth(endCurMonthInRange, selectEnd, 'end', inRange)
  }

  return !Object.keys(inRange).length ? null : inRange
}

export function getDrawInfo(ymDs, selectDate, doms, singleMonth) {
  const { startComponent, rangeComponents, endComponent } = doms
  const {
    start: { cur: selectStart },
    end: { cur: selectEnd }
  } = selectDate
  const drawInfo = {}

  drawInfo.start = (startComponent && selectStart) || null
  drawInfo.end = (endComponent && selectEnd) || null
  drawInfo.inRange = handleInRange(ymDs, rangeComponents, { selectStart, selectEnd }, singleMonth)
  return drawInfo
}
