import zz from '@jyunzn/zz'
import zzrper from '../zzrper'
import '@jyunzn/zz/examples/default.min.css'
import './style/style.scss'

zz.use(zzrper)

zz({
}).mount('.container')

zz({
  cmz_quan: 12,
  zzrp: true,
  zzrp_cmz_initSelectStart: '2020-11-1',
  zzrp_cmz_initSelectEnd: '2020-12-03'
}).mount('.container2')
