import { initOpts, handleInitSeleted } from './init'

export function onCreated(datas) {
  if (datas.opts.zzrp === true) {
    const opts = initOpts(datas.opts)
    console.log(datas, opts)
    if (opts.selectDate.start.cur !== null) {
      handleInitSeleted(datas, opts)
    }
  } else if (datas.opts.zzsp !== undefined) {
    delete datas.opts.zzsp
  }
}
