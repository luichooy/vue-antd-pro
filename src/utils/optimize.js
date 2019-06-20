export function throttle (fn, delay) {
  delay = delay || 300
  let prev = 0

  return function (args) {
    const context = this
    let now = Date.now()
    if (now - prev > delay) {
      fn.call(context, args)
      prev = now
    }
  }
}
