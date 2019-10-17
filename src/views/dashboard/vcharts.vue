<template>
	<div class="vcharts">
		<a-card title="折线图" :bordered="false">
			<ve-line :data="chartData"></ve-line>
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
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
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
