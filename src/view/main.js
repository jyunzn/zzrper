// import zz from '@jyunzn/zz'
import zz from '../../../zz/dist/zz'
import zzrper from '../zzrper'
import '@jyunzn/zz/examples/default.min.css'
import './style/style.scss'

zz.use(zzrper)

zz({
  zzrp: true,
  zzrp_onSelectStart(...args) {
    console.log('start: ', ...args)
  },
  zzrp_onSelectEnd(...args) {
    console.log('end:', ...args)
  }
}).mount('.container')

zz({
  cmz_quan: 5,
  cmz_swBtns: [
    ['i', { direct: 'prev', step: 3, class: "prev-btn p_btn3" }, '<<<'],
    ['i', { direct: 'prev', step: 1, class: "prev-btn p_btn1" }, '<'],
    ['i', { direct: 'next', step: 1, class: "next-btn n_btn1" }, '>'],
    ['i', { direct: 'next', step: 3, class: "next-btn n_btn3" }, '>>>']
  ],
  // eslint-disable-next-line
  cmz_mNames: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8:8, 9:9, 10:10, 11:11, 12:12 },
  zzrp: true,
  zzrp_cmz_initSelectStart: '2020-12-05',
  zzrp_cmz_initSelectEnd: '2011-02-04',
  zzrp_cls_selectStart: 's a b',
  zzrp_cls_selectEnd: 'e',
  zzrp_cls_inRange: 'i',
  zzrp_onSelectStart(...args) {
    console.log('start: ', ...args)
  },
  zzrp_onSelectEnd(...args) {
    console.log('end:', ...args)
  }
}).mount('.container2')
