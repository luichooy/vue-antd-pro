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
  name: 'MiniBar',
  data () {
    return {
      data
    }
  },
  render () {
    const { data } = this
    
    return (
      <v-chart data={ data } forceFit={ true } height={ 46 } padding={ [10, 5, 0, 5] }>
        <v-tooltip />
        <v-bar position="day*count" />
      </v-chart>
    )
  }
}
</script>
