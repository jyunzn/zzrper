import { isArr } from './common'

export const addClass = (dom, cls) => {
  if (!isArr(cls)) return false
  for (let i = 0; i < cls.length; i++) {
    const clsname = cls[i]
    dom.classList.add(clsname)
  }
}

export const removeClass = (dom, cls) => {
  if (!isArr(cls)) return false
  for (let i = 0; i < cls.length; i++) {
    const clsname = cls[i]
    dom.classList.remove(clsname)
  }
}

export function findParentNodeByClassList(dom, classList) {
  const p = dom.parentElement || dom.parentNode

  if ([...p.classList].includes(classList[0])) {
    return p
  } else if (p === null) {
    return false
  } else {
    return findParentNodeByClassList(p, classList)
  }
}
