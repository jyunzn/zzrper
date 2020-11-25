import { dateStrToDateObj, getDateInfo, deepcopy, isFunc, isDateMisplaced } from '../../utils'
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

function getSelectDate(options, key) {
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

function getSelectDates(options) {
  let start = getSelectDate(options, 'cmz_initSelectStart');
  let end = getSelectDate(options, 'cmz_initSelectEnd');

  let { cur: sInit } = start
  let { cur: eInit } = end

  if (isDateMisplaced(sInit, eInit)) {
    [start, end] = [end, start]
  }

  return { start, end }
}

function getClass(options, dCls) {
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

function getCallback(cbObj, cbs, del) {
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

function getCallbacks(options) {
  const cbs = deepcopy(dCbs)
  getCallback(options, cbs, true)
  return cbs
}

export function initOpts(opts) {
  opts.zzrp = {}
  const zzrpSetting = getZZRPSetting(opts)
  const selectDate = getSelectDates(zzrpSetting)
  const cls = getClass(zzrpSetting, dClass)
  const cbs = getCallbacks(zzrpSetting)
  opts.zzrp.selectDate = selectDate
  opts.zzrp.cls = cls
  return { selectDate, cls, cbs }
}
