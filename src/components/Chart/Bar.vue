<script>
const data = []
for (let i = 1; i <= 12; i++) {
  data.push({
    month: i + '月',
    count: Math.round(Math.random() * 1200)
  })
}
export default {
  name: 'Bar',
  props: {
    title: {
      type: String,
      default: 'Title'
    }
  },
  data () {
    return {
      data
    }
  },
  render () {
    const { data, title } = this

    return (
      <div>
        <h4 style="margin-bottom: 20px;">{ title }</h4>
        <v-chart data={ data } forceFit={ true } height={ 251 } padding={ [6, 0, 20, 35] }>
          <v-tooltip />
          <v-axis />
          <v-bar position="month*count" />
        </v-chart>
      </div>
    )
  }
}
</script>
