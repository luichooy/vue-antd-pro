<script>
import { View } from '@antv/data-set'
import { debounce } from '@/utils/optimize'

export default {
  props: {
    height: {
      type: Number,
      default: 0
    },
    animate: {
      type: Boolean,
      default: true
    },
    forceFit: {
      type: Boolean,
      default: true
    },
    selected: {
      type: Boolean,
      default: true
    },
    tooltip: {
      type: Boolean,
      default: true
    },
    color: String,
    colors: Array,
    margin: {
      type: Array,
      default: () => ([])
    },
    padding: {
      type: [Array, String],
      default: 'auto'
    },
    hasLegend: {
      type: Boolean,
      default: false
    },
    inner: {
      type: Number,
      default: 0.75
    },
    lineWidth: {
      type: Number,
      default: 1
    },
    data: Array,
    percent: Number,
    title: String,
    subTitle: String,
    total: [Function, String],
    className: String,
    valueFormat: Function
  },
  data () {
    return {
      legendData: [],
      
      legendBlock: false
    }
  },
  
  methods: {
    getLegendData () {
      if (!this.chart) return
      const geom = this.chart.getAllGeoms()[0] // 获取所有的图形
      if (!geom) return
      
      const items = geom.get('dataArray') || []
      
      const legendData = items.map(item => {
        const origin = item[0]._origin
        origin.color = item[0].color
        origin.checked = true
        return origin
      })
      
      this.legendData = legendData
    },
    onLegendClick (item, i) {
      const newItem = item
      newItem.checked = !newItem.checked
      
      const { legendData } = this
      legendData[i] = newItem
      
      const filteredLegendData = legendData.filter(l => l.checked).map(l => l.x)
      
      if (this.chart) {
        this.chart.filter('x', val => {
          return filteredLegendData.indexOf(`${val}`) > -1
        })
      }
      
      this.legendData = [...legendData]
    },
    onResize: debounce(function () {
      const { hasLegend, legendBlock } = this
      if (!hasLegend || !this.root) {
        window.removeEventListener('resize', this.onResize, false)
        return
      }
      if (
        this.root &&
        this.root.parentNode &&
        this.root.parentNode.clientWidth <= 380
      ) {
        this.legendBlock = true
      } else if (legendBlock) {
        this.legendBlock = false
      }
    })
  },
  mounted () {
    if (this.hasLegend) {
      this.chart = this.$refs.chart.chart.chartInstance
      this.root = this.$refs.root
      this.getLegendData()
      window.addEventListener('resize', this.onResize, false)
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize, false)
  },
  render () {
    let {
      height,
      forceFit,
      selected,
      tooltip,
      animate,
      padding,
      inner,
      lineWidth,
      data,
      subTitle,
      total,
      percent,
      color,
      colors,
      hasLegend,
      legendData,
      legendBlock
    } = this
    
    const rootClass = ['pie-wrapper', hasLegend && 'has-legend', legendBlock && 'legend-block']
    
    let formatColor
    const defaultColor = colors
    if (percent || percent === 0) {
      tooltip = false
      selected = false
      
      formatColor = (value) => {
        if (value === '占比') {
          return color || 'rgba(24, 144, 255, 0.85)'
        }
        return '#F0F2F5'
      }
      
      data = [
        {
          x: '占比',
          y: parseFloat(`${percent}`)
        },
        {
          x: '反比',
          y: 100 - parseFloat(`${percent}`)
        }
      ]
    }
    
    const scale = [
      {
        dataKey: 'x',
        type: 'cat',
        range: [0, 1]
      },
      {
        dataKey: 'y',
        min: 0
      },
      {
        dataKey: 'percent',
        min: 0,
        formatter: '.2%'
      }
    ]
    
    const dv = new View()
    dv.source(data).transform({
      type: 'percent',
      field: 'y',
      dimension: 'x',
      as: 'percent'
    })
    
    return (
      <div ref="root" class={ rootClass }>
        <div class="pie-chart">
          <v-chart
            data={ dv }
            height={ height }
            scale={ scale }
            forceFit={ forceFit }
            animate={ animate }
            padding={ padding }
            ref="chart"
          >
            <v-tooltip show={ !!tooltip } showTitle={ false } />
            <v-axis />
            <v-pie
              position="percent"
              select={ selected }
              color="x"
              /* color={ ['x', percent || percent === 0 ? formatColor : defaultColor] } */
              style={ { lineWidth, stroke: '#fff' } }
            />
            <v-coord type="theta" innerRadius={ inner } />
          </v-chart>
          { (subTitle || total) && (
            <div class="pie-center-title">
              { subTitle && <h4 class="pie-sub-title">{ subTitle }</h4> }
              { total && <div class="pie-stat">{ typeof total === 'function' ? total() : total }</div> }
            </div>
          ) }
        </div>
        { hasLegend && (
          <ul class="pie-legend">
            {
              legendData.map((item, idx) => (
                <li key={ idx }
                  onClick={ $event => { this.onLegendClick(item, idx) } }
                  class="legend-item"
                >
                  <span style={ { backgroundColor: !item.checked ? '#aaa' : item.color } } class="legend-dot" />
                  <span>{ item.x }</span>
                  <a-divider type="vertical" />
                  <span class="legend-percent">{ (item.percent * 100).toFixed(2) + '%' }</span>
                  <span class="legend-count">{ '￥' + item.y }</span>
                </li>
              ))
            }
          </ul>
        ) }
      </div>
    )
  }
}
</script>
<style lang="scss" scoped>
  
  .pie-wrapper {
    position: relative;
    
    &.has-legend {
      .pie-chart {
        position: relative;
        width: calc(100% - 240px);
        font-size: 25px;
      }
      
      .pie-legend {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        margin: 0 20px;
        min-width: 200px;
        
        .legend-item {
          height: 22px;
          line-height: 22px;
          margin-bottom: 16px;
          cursor: pointer;
          
          .legend-dot {
            display: inline-block;
            position: relative;
            top: -1px;
            width: 8px;
            height: 8px;
            margin-right: 8px;
            border-radius: 100%;
          }
          
          .legend-percent {
            color: rgba(0, 0, 0, .45);
          }
          
          .legend-count {
            position: absolute;
            right: 0;
          }
        }
      }
    }
    
    &.legend-block {
      .pie-chart {
        width: 100%;
        margin: 0 0 32px;
      }
      
      .pie-legend {
        position: relative;
        transform: none;
      }
    }
  }
  
  .pie-center-title {
    position: absolute;
    top: 50%;
    left: 50%;
    max-height: 62px;
    text-align: center;
    transform: translate(-50%, -50%);
    
    .pie-sub-title {
      height: 22px;
      line-height: 22px;
      margin-bottom: 8px;
      color: rgba(0, 0, 0, .45);
      font-weight: 400;
      font-size: 14px;
    }
  }

</style>
