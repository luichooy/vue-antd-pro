<script>
import moment from 'moment'

const data = []
for (let i = 9; i >= 0; i--) {
  data.push({
    day: moment().subtract(i, 'days').format('YYYY/MM/DD'),
    count: Math.round(Math.random() * 100)
  })
}
export default {
  name: 'MiniArea',
  props: {
    line: Boolean,
    color: {
      type: String,
      default: 'rgba(24, 144, 255, 0.2)'
    },
    borderColor: {
      type: String,
      default: '#1089ff'
    },
    borderWidth: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      data
    }
  },
  render () {
    const { data, line, color, borderColor, borderWidth } = this
    
    return (
      <v-chart data={ data } forceFit={ true } height={ 46 } padding={ [10, 5, 0, 5] }>
        <v-tooltip />
        <v-smooth-area position="day*count" color={ color } />
        { line && <v-smooth-line position="day*count" color={ borderColor } size={ borderWidth } /> }
      </v-chart>
    )
  }
}
</script>
