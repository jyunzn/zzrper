import { dateStrToDateObj, getDateInfo, judgeDateStatus, deepcopy, isFunc } from '../../utils'
import { dClass, dCbs } from './default'

function getZZRPSetting(opts) {
  const set = {}
  for (let k in opts) {
    if (k.startsWith('zzrp_')) {
      set[k.slice(5)] = opts[k]
      delete opts[k]
    }
  }
  return set
}

function initSelectDate(options, key) {
  const cmz_initSelectDate = options[key]
  let dateObj
  if (cmz_initSelectDate) {
    dateObj = dateStrToDateObj(cmz_initSelectDate)
    delete options.cmz_initSelectDate
  }

  let init = null
  let cur = null
  if (dateObj) {
    const dateInfo = getDateInfo(dateObj)
    init = { ...dateInfo }
    cur = { ...dateInfo }
  }
  return { cur, init }
}

function initSelectDates(options) {
  let start = initSelectDate(options, 'cmz_initSelectStart');
  let end = initSelectDate(options, 'cmz_initSelectEnd');
  let { init: sInit } = start
  let { init: eInit } = end

  if (sInit === null && eInit !== null) {
    [start, end] = [end, start]
  } else if (sInit !== null && eInit !== null) {
    const status = judgeDateStatus(sInit, eInit)
    if (status === -1) {
      [start, end] = [end, start]
    }
  }

  return { start, end }
}

function initClass(options, dCls) {
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

function initCallback(cbObj, cbs, del) {
  for (let key in cbs) {
    const cbArr = cbs[key]
    const cb = cbObj[key]
    if (cb) {
      if (isFunc(cb)) {
        cbArr.push(cb)
      }
      if (del) {
        delete cbObj[key]
      }
    }
  }
}

function initCallbacks(options) {
  const cbs = deepcopy(dCbs)
  initCallback(options, cbs, true)
  return cbs
}

export function initOpts(opts) {
  opts.zzrp = {}
  const zzrpSetting = getZZRPSetting(opts)
  const selectDate = initSelectDates(zzrpSetting)
  const cls = initClass(zzrpSetting, dClass)
  const cbs = initCallbacks(zzrpSetting)
  opts.zzrp.selectDate = selectDate
  opts.zzrp.cls = cls
  return { selectDate, cls, cbs }
}
