export function onBeforeDomBeAssyAtResetDom(datas) {
  console.log(datas)
  const { zzrp } = datas.opts
  if (zzrp) {
    // 處理移出的月份跟移入月份是否在範圍內，有的話就要著色
  }
}
