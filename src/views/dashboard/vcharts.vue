<template>
	<div class="vcharts">
		<a-card title="折线图" :bordered="false">
			<ve-line :data="chartData" :extend="lineExtend" :log="true"></ve-line>
		</a-card>

		<a-card class="mt-3" title="散点图" :bordered="false">
			<ve-scatter :data="scatterData" :settings="scatterSetting" :tooltip="tooltip" :log="true"></ve-scatter>
			<a-button @click="change">Change symbolSize</a-button>
		</a-card>
	</div>
</template>

<script>
function getRandom (n) {
  return Math.floor(Math.random() * n)
}

const scatterCoords = []
// for (let i of 50) {
// 	scatterCoords.push({ x: getRandom(1000), y: getRandom(1000) })
// }

for (let i = 0; i < 50; i++) {
  scatterCoords.push({ x: getRandom(1000), y: getRandom(1000) })
  // scatterCoords.push([getRandom(1000), getRandom(1000)])
}

export default {
  data () {
    this.lineExtend = {
      xAxis: {
        axisTick: {
          show: true,
          // alignWithLabel: true
          length: 100,
          lineStyle: {
            type: 'dashed'
          }
        },
        splitArea: {
          show: true
        },
        axisLabel: {
          interval: 0,
          margin: 20,
          align: 'center',
          formatter (date, index) {
            console.log(date, index)
            let weather = {
              '2019-10-01': {
                maxTemperature: 32,
                minTemperature: 23,
                weatherText: '晴转多云'
              },
              '2019-10-02': {
                maxTemperature: 32,
                minTemperature: 23,
                weatherText: '晴转多云'
              },
              '2019-10-03': {
                maxTemperature: 32,
                minTemperature: 23,
                weatherText: '晴转多云'
              },
              '2019-10-04': {
                maxTemperature: 32,
                minTemperature: 23,
                weatherText: '晴转多云'
              },
              '2019-10-05': {
                maxTemperature: 32,
                minTemperature: 23,
                weatherText: '晴转多云'
              },
              '2019-10-06': {
                maxTemperature: 32,
                minTemperature: 23,
                weatherText: '晴转多云'
              },
              '2019-10-07': {
                maxTemperature: 32,
                minTemperature: 23,
                weatherText: '晴转多云'
              }
            }
            return [
              `{date|${date}}\n`,
              `{weather|${weather[date].weatherText}}\n`,
              `{temperature|${weather[date].maxTemperature}℃/${weather[date].minTemperature}℃}\n`,
              `{date|${date}}\n`
            ].join('\n')
          },
          rich: {
            date: {
              color: 'red'
            },
            max: {
              fontSize: 30
            }
          }
        }
      }
    }

    this.tooltip = {
      formatter (v) {
        return [v.marker + v.seriesName, `(${v.value[0]}, ${v.value[1]})`].join(
          '<br>'
        )
      }
    }

    this.scatterSetting = {
      xAxisType: 'value',
      symbolSize: 15
    }
    return {
      chartData: {
        columns: ['日期', '访问用户', '下单用户'],
        rows: [
          { 日期: '2019-10-01', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: '2019-10-02', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: '2019-10-03', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: '2019-10-04', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: '2019-10-05', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: '2019-10-06', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
          { 日期: '2019-10-07', 访问用户: 2345, 下单用户: 2234, 下单率: 0.79 }
        ]
      },
      // scatterSetting: {
      // 	xAxisType: 'value',
      // 	symbolSize: 15
      // },
      scatterData: {
        columns: ['x', 'y'],
        rows: {
          Point: scatterCoords
        }
      }
    }
  },
  methods: {
    change () {
      this.scatterSetting.symbolSize =
				this.scatterSetting.symbolSize === 15 ? 5 : 15
      console.log(this.scatterSetting)
    }
  }
}
</script>
