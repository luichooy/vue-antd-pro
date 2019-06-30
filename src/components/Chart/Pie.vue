<script>
export default {
  props: {
    animate: Boolean,
    color: String,
    colors: Array,
    selected: Boolean,
    height: Number,
    margin: Array,
    padding: Array,
    hasLegend: Boolean,
    percent: Number,
    data: Array,
    inner: Number,
    innerWidth: Number,
    forceFit: Boolean,
    style: Object,
    className: String,
    total: Number,
    title: String,
    tooltip: Boolean,
    valueFormat: Function,
    subTitle: String
  },
  data(){
    return {
      legendData: [],

      legendBlock: false,

      requestRef: '',

      root: null,

      chart: null
    }
  },

  methods: {
    getG2Instance(chart) {
      this.chart = chart
      this.getLegendData()
    },
    getLegendData(){
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

      this.legendData = origin
    },
    handleLegendClick (item, i) {
      const newItem = item;
      newItem.checked = !newItem.checked

      const { legendData } = this
      legendData[i] = newItem

      const filteredLegendData = legendData.filter(l => l.checked).map(l => l.x)

      if (this.chart) {
        this.chart.filter('x', val => filteredLegendData.indexOf(`${val}`) > -1)
      }

      this.legendData = legendData
    }
  },
  render(){
    const {
      valueFormat,
      subTitle,
      total,
      hasLegend = false,
      className,
      style,
      height = 0,
      forceFit = true,
      percent,
      color,
      inner = 0.75,
      animate = true,
      colors,
      lineWidth = 1,
      legendData,
      legendBlock,
      data,
      tooltip,
      selected
    } = this

    const {
      data: propsData,
      selected: propsSelected = true,
      tooltip: propsTooltip = true,
    } = this

    let data = propsData || [];
    let selected = propsSelected;
    let tooltip = propsTooltip;

    const defaultColors = colors
    data = data || []
    selected = selected || true
    tooltip = tooltip || true
    let formatColor

    const scale = {
      x: {
        type: 'cat',
        range: [0, 1],
      },
      y: {
        min: 0,
      },
    }

    if (percent || percent === 0) {
      selected = false
      tooltip = false
      formatColor = (value) => {
        if (value === '占比') {
          return color || 'rgba(24, 144, 255, 0.85)'
        }
        return '#F0F2F5'
      };

      data = [
        {
          x: '占比',
          y: parseFloat(`${percent}`),
        },
        {
          x: '反比',
          y: 100 - parseFloat(`${percent}`),
        },
      ];
    }

    const dv = new DataView()
    dv.source(data).transform({
      type: 'percent',
      field: 'y',
      dimension: 'x',
      as: 'percent',
    })

    return (
      <div>
        <div>
          <v-chart
            scale={scale}
            height={height}
            forceFit={forceFit}
            data={dv}
            padding={padding}
            animate={animate}
            onGetG2Instance={this.getG2Instance}
          >
            { !!tooltip && <v-tooltip showTitle="false" dataKey="x*percent"/> }
            <v-coord type="theta" innerRadius={inner}/>
            <v-pie position="percent" color="x" vStyle={{ lineWidth, stroke: '#fff' }}/>
          </v-chart>
        </div>
      </div>
    )
  }
}
</script>
<style lang="scss" scoped>

</style>
