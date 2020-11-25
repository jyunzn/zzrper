import { onCreated } from './onCreated'
import { onBeforeDomBeAssyAtResetDom } from './onBeforeDomBeAssyAtResetDom'

const zzrper = {}

zzrper.install = (zz) => {
  zz.mixin({
    onCreated,
    onBeforeDomBeAssyAtResetDom
  })
}

export default zzrper
