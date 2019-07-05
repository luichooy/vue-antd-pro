<script>
import DataSet from '@antv/data-set'

export default {
  name: 'TimelineChart',
  props: {
    height: {
      type: Number,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    titleMap: {
      type: Object,
      required: true
    },
    forceFit: {
      type: Boolean,
      default: true
    },
    padding: {
      type: [Array, String],
      default: () => [60, 20, 40, 40]
    },
    borderWidth: {
      type: Number,
      default: 2
    },
    title: String
  },
  methods: {
    slider () {
      console.log(1)
    }
  },
  render () {
    const {
      height,
      data,
      titleMap,
      forceFit,
      padding,
      borderWidth,
      title
    } = this
    
    const dataSource = [...data]
    
    dataSource.sort((a, b) => a.x - b.x)
    
    let max
    if (dataSource[0] && dataSource[0].y1 && dataSource[0].y2) {
      max = Math.max(
        [...dataSource].sort((a, b) => b.y1 - a.y1)[0].y1,
        [...dataSource].sort((a, b) => b.y2 - a.y2)[0].y2
      )
    }
    
    const ds = new DataSet({
      state: {
        start: dataSource[0].x,
        end: dataSource[dataSource.length - 1].x
      }
    })
    
    const dv = ds.createView()
    
    dv.source(dataSource).transform({
      type: 'filter',
      callback: (obj) => {
        const date = obj.x
        return date <= ds.state.end && date >= ds.state.start
      }
    }).transform({
      type: 'map',
      callback (row) {
        const newRow = { ...row }
        newRow[titleMap.y1] = row.y1
        newRow[titleMap.y2] = row.y2
        return newRow
      }
    }).transform({
      type: 'fold',
      fields: [titleMap.y1, titleMap.y2], // 展开字段集
      key: 'key', // key字段
      value: 'value' // value字段
    })
    
    const scale = [
      {
        dataKey: 'x',
        type: 'time',
        tickInterval: 30 * 60 * 1000,
        mask: 'HH:mm'
      },
      {
        dataKey: 'value',
        min: 0,
        max
      }
    ]
    
    const timeScale = {
      type: 'time',
      tickInterval: 60 * 60 * 1000,
      mask: 'HH:mm',
      range: [0, 1]
    }
    
    console.log(dv)
    
    const sliderChange = ({ startValue, endValue }) => {
      console.log(1)
      ds.setState('start', startValue)
      ds.setState('end', endValue)
    }
    
    return (
      <div style={ { height: height + 30 } }>
        { title && <h4>{ title }</h4> }
        <v-chart data={ dv } height={ height } forceFit={ forceFit } scale={ scale } padding={ padding }>
          <v-tooltip />
          <v-axis />
          <v-legend position="top" />
          <v-line position="x*value" color="key" size={ borderWidth } />
        </v-chart>
        <div style={ { marginRight: '-20px' } }>
          <v-plugin>
            <v-slider
              data={ dataSource }
              start={ ds.state.start }
              end={ ds.state.end }
              scales={ { x: timeScale } }
              backgroundChart={ { type: 'line' } }
              xAxis="x"
              yAxis="y1"
              width="auto"
              height={ 26 }
              padding={ [0, padding[1] + 20, 0, padding[3]] }
              onChange={ ({ startValue, endValue }) => {
                console.log(1)
                ds.setState('start', startValue)
                ds.setState('end', endValue)
              } }
            />
          </v-plugin>
        </div>
      </div>
    )
  }
}
</script>
