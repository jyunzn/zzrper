import { judgeCurPosition, addClass, removeClass } from './utils'
import { getSelectedComponents } from './init/initSelected/getSelectComponents'
import { getDrawInfo } from './init/initSelected/getDrawInfo'

function getInRangeSE(ym, inRange) {
  const { year, month } = ym
  return (inRange[year] && inRange[year][month]) || null
}

function handleBeforeYMSide(beforeYM, side) {
  const { year: sideYear, month: sideMonth } = side
  const { year: beforeYear, month: beforeMonth } = beforeYM
  return (
    sideYear === beforeYear &&
    sideMonth === beforeMonth &&
    side
  ) || null
}

function getBeforeYMDrawInfo(beforeYM, draw) {
  const { start, end, inRange } = draw

  const drawInfo = {}
  drawInfo.start = start && handleBeforeYMSide(beforeYM, start)
  drawInfo.end = end && handleBeforeYMSide(beforeYM, end)
  drawInfo.inRange = inRange && getInRangeSE(beforeYM, inRange)
  return drawInfo
}

function addSideClass(doms, date, cls) {
  const dom = doms[date - 1]
  dom && addClass(dom, cls)
  return true
}

function removeSideClass(doms, date, cls) {
  const dom = doms[date - 1]
  dom && removeClass(dom, cls)
  return true
}

function handleSideClass(side, doms, cls, handleFn) {
  const { start, end } = side
  const { cls_selectStart, cls_selectEnd } = cls
  const startChange = (start && handleFn(doms, start.date, cls_selectStart)) || false
  const endChange = (end && handleFn(doms, end.date, cls_selectEnd)) || false
  return { startChange, endChange }
}

function diff(addInRange, rmInRange) {
  const { start: addStart, end: addEnd } = addInRange
  const { start: rmStart, end: rmEnd } = rmInRange
  let addArr = [];
  let rmArr = [];

  if (rmStart > addEnd || rmEnd < addStart) {
    addArr.push(addInRange)
    rmArr.push(rmInRange)
  } else {
    const compStart = rmStart - addStart
    const compEnd = rmEnd - addEnd

    if (compStart === 0) {
      if (compEnd < 0) {
        addArr.push({ start: rmEnd + 1, end: addEnd })
      } else if (compEnd > 0) {
        rmArr.push({ start: addEnd + 1, end: rmEnd })
      }
    } else if (compStart > 0) {
      addArr.push({ start: addStart, end: rmStart - 1 })
      if (compEnd < 0) {
        addArr.push({ start: rmEnd + 1, end: addEnd })
      } else if (compEnd > 0) {
        rmArr.push({ start: addEnd + 1, end: rmEnd })
      }
    } else if (compStart < 0) {
      rmArr.push({ start: rmStart, end: addStart - 1 })
      if (compEnd < 0) {
        addArr.push({ start: rmEnd + 1, end: addEnd })
      } else if (compEnd > 0) {
        rmArr.push({ start: addEnd + 1, end: rmEnd })
      }
    }
  }

  return { addArr, rmArr }
}

function handleInRangeClass(drawing, drawed, dDs, cls) {
  const { inRange: addInRange } = drawing
  const { inRange: rmInRange } = drawed
  const { cls_inRange } = cls

  if (addInRange === null && rmInRange !== null) {
    const { start, end } = rmInRange
    dDs.slice(start - 1, end).forEach(dom => removeClass(dom, cls_inRange))
    return 'rm'
  } else if (addInRange !== null && rmInRange === null) {
    const { start, end } = addInRange
    dDs.slice(start - 1,  end).forEach(dom => addClass(dom, cls_inRange))
    return 'add'
  } else if (addInRange !== null && rmInRange !== null) {
    // 1. diff
    const { addArr, rmArr } = diff(addInRange, rmInRange)

    // 2. update class
    addArr.forEach(add => {
      const { start, end } = add
      dDs.slice(start - 1,  end).forEach(dom => addClass(dom, cls_inRange))
    })

    rmArr.forEach(rm => {
      const { start, end } = rm
      dDs.slice(start - 1, end).forEach(dom => removeClass(dom, cls_inRange))
    })
    return 'both'
  } else {
    return false
  }
}

function updateDrawBefore(beforeChange, draw) {
  const { startChange, endChange } = beforeChange
  startChange && (draw.start = null)
  endChange && (draw.end = null)
}

function updateDrawFuture(futureChange, draw, selectDate) {
  const { start: { cur: s }, end: { cur: e } } = selectDate
  const { startChange, endChange } = futureChange
  startChange && (draw.start = s)
  endChange && (draw.end = e)
}

function updateDrawInRange(inRangeChange, draw, diffM, drawing) {
  const {
    beforeYM: { year: by, month: bm },
    nextYM: { year: ny, month: nm }
  } = diffM

  // if inRange === null => {}
  !draw.inRange && (draw.inRange = {})
  const { inRange } = draw

  switch (inRangeChange) {
    case 'rm':
      delete inRange[by][bm]
      break
    case 'add':
      inRange[ny] || (inRange[ny] = {})
      inRange[ny][nm] = drawing.inRange
      break
    case 'both':
      delete inRange[by][bm]
      inRange[ny] || (inRange[ny] = {})
      inRange[ny][nm] = drawing.inRange
      break
    default:
      break
  }

  // if {} => null
  if (inRange[by] && !Object.keys(inRange[by]).length) {
    delete inRange[by]
  }

  // if {} => null
  if (!Object.keys(inRange).length) {
    draw.inRange = null
  }
}

function handleClasses(drawing, drawed, zzOpt, zzrpOpt) {
  const { cls, draw, selectDate } = zzrpOpt
  const { contentDs: { dDs }, diffM } = zzOpt

  const beforeChange = handleSideClass(drawed, dDs, cls, removeSideClass)
  const futureChange = handleSideClass(drawing, dDs, cls, addSideClass)
  const inRangeChange = handleInRangeClass(drawing, drawed, dDs, cls)

  updateDrawBefore(beforeChange, draw)
  updateDrawFuture(futureChange, draw, selectDate)
  updateDrawInRange(inRangeChange, draw, diffM, drawing)
}

function handleSwitchClick(zzOpt, zzrpOpt) {
  const { diffM: { beforeYM, nextYM }, ymDs } = zzOpt
  const { selectDate, draw, cls } = zzrpOpt
  const { start: { cur: cs }, end: { cur: ce } } = selectDate

  // judge has select date
  if (cs && ce) {
    // - setting both

    // Get the data of the newly generated month
    const nextPoint = { pL: nextYM, pR: nextYM }
    const nextPos = judgeCurPosition(selectDate, nextPoint)
    const doms = getSelectedComponents(ymDs, selectDate, nextPos, true)
    const drawing = getDrawInfo(ymDs, selectDate, doms, nextYM)

    // Get data for the removed month
    const drawed = getBeforeYMDrawInfo(beforeYM, draw)

    // Take out the start and end of ing
    const addInRange = drawing.inRange
    addInRange && (drawing.inRange = getInRangeSE(nextYM, addInRange))

    // Classes for handling removed months and added months
    handleClasses(drawing, drawed, zzOpt, zzrpOpt)
  } else if (cs) {
    // - just setting start

    const { year, month, date } = cs
    const { year: by, month: bm } = beforeYM
    const { year: ny, month: nm } = nextYM
    const { cls_selectStart } = cls

    if (year === by && month === bm) {
      const dom = ymDs[ny] && ymDs[ny][nm] && ymDs[ny][nm].dDs[date - 1]
      dom && removeClass(dom, cls_selectStart)
    } else if (year === ny && month === nm) {
      const dom = ymDs[ny] && ymDs[ny][nm] && ymDs[ny][nm].dDs[date - 1]
      addClass(dom, cls_selectStart)
    }
  }
}

export function onBeforeDomBeAssyAtResetDom(datas) {
  const { zzrp } = datas.opts
  if (zzrp) {
    handleSwitchClick(datas, zzrp)
  }
}
