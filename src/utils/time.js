import moment from 'moment'

export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9
    ? '早上好'
    : hour <= 11
      ? '上午好'
      : hour <= 13
        ? '中午好'
        : hour < 20
          ? '下午好'
          : '晚上好'
}

export function getCurrent (key) {
  const current = moment()
  return [
    current[key](current[key]()).startOf(key),
    current[key](current[key]()).endOf(key)
  ]
}
