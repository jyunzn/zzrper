import zz from '@jyunzn/zz'
import zzrper from '../zzrper'
import '@jyunzn/zz/examples/default.min.css'
import './style/style.scss'

zz.use(zzrper)

zz({
}).mount('.container')

zz({
  cmz_quan: 100,
  // eslint-disable-next-line
  cmz_mNames: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8:8, 9:9, 10:10, 11:11, 12:12 },
  zzrp: true,
  zzrp_cmz_initSelectStart: '2020-11-11',
  zzrp_cmz_initSelectEnd: '2010-03-14'
}).mount('.container2')
