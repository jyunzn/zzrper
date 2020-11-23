import { initOpts, handleInitSeleted } from './init'
// import { onSelect } from './onSelect'

export function onCreated(datas) {
  if (datas.opts.zzrp === true) {
    const opts = initOpts(datas.opts)
    if (opts.selectDate.start.cur !== null) {
      datas.opts.zzrp.draw = handleInitSeleted(datas, opts)
    } else {
      datas.opts.zzrp.draw = { start: null, end: null, inRange: null }
    }

    // onSelect(datas, opts)
  } else if (datas.opts.zzrp !== undefined) {
    delete datas.opts.zzrp
  }
}
