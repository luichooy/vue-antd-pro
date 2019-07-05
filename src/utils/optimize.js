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

export function debounce (fn, delay) {
  delay = delay || 300
  let timer
  
  return function (args) {
    const context = this
    if (timer) clearTimeout(timer)
    
    timer = setTimeout(() => {
      fn.call(context, args)
    }, delay)
  }
}
