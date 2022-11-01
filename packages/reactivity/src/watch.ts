import { isFunction, isObject } from '@vue/shared'
import { ReactiveEffect } from './effect'
import { isReactive } from './reactive'
function traverse(source, s = new Set()) {
  if (!isObject(source)) {
    return source
  }
  if (s.has(source)) {
    return source
  }
  // set 解决循环引用
  s.add(source)
  for (let key in source) {
    traverse(source[key], s)
  }
  return source
}
export function watch(source, cb, { immediate } = {} as any) {
  let getter
  if (isReactive(source)) {
    // 都处理成函数
    getter = () => traverse(source)
  } else if (isFunction(source)) {
    getter = source
  }
  let oldVal
  const job = () => {
    let newVal = effect.run()
    cb(newVal, oldVal)
    oldVal = newVal
  }
  const effect = new ReactiveEffect(getter, job)
  if (immediate) {
    // 刚进来 oldVal 为 undefined
    return job()
  }
  oldVal = effect.run()
}
