import { initOpts } from './init'

const zzrper = {}

zzrper.install = (zz) => {
  zz.mixin({
    onCreated(datas) {
      if (datas.opts.zzrp === true) {
        const opts = initOpts(datas.opts)
        console.log(opts)
      } else if (datas.opts.zzsp !== undefined) {
        delete datas.opts.zzsp
      }
    },
    onBeforeDomBeAssyAtResetDom(datas) {
      console.log(datas)
    }
  })
}

export default zzrper
