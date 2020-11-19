import zz from '@jyunzn/zz'
import zzrper from '../zzrper'
import '@jyunzn/zz/examples/default.min.css'
import './style/style.scss'

zz.use(zzrper)

zz({
}).mount('.container')

zz({
  cmz_quan: 12
}).mount('.container2')
