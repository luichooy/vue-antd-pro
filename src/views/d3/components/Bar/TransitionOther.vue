<template>
  <a-card title="Transition Other" :bordered="false">
    <div class="container-other">
      <svg class="chart-other"></svg>
    </div>
  </a-card>
</template>

<script>
export default {
  mounted () {
    const data = [
      { name: '广东', gdp: 97300 },
      { name: '江苏', gdp: 92595 },
      { name: '山东', gdp: 76469 },
      { name: '浙江', gdp: 56197 },
      { name: '河南', gdp: 48055 },
      { name: '四川', gdp: 40678 },
      { name: '湖北', gdp: 39366 },
      { name: '湖南', gdp: 36425 },
      { name: '河北', gdp: 36010 },
      { name: '福建', gdp: 35804 },
      { name: '上海', gdp: 32679 },
      { name: '北京', gdp: 30320 },
      { name: '安徽', gdp: 30006 },
      { name: '辽宁', gdp: 25300 },
      { name: '陕西', gdp: 24438 },
      { name: '江西', gdp: 21984 },
      { name: '重庆', gdp: 20362 },
      { name: '广西', gdp: 20352 },
      { name: '天津', gdp: 18809 },
      { name: '云南', gdp: 17881 },
      { name: '内蒙古', gdp: 17289 },
      { name: '山西', gdp: 16818 },
      { name: '贵州', gdp: 14806 },
      { name: '甘肃', gdp: 8246 },
      { name: '海南', gdp: 4832 },
      { name: '宁夏', gdp: 3705 },
      { name: '青海', gdp: 2865 },
      { name: '西藏', gdp: 1400 }
    ]

    const margin = { top: 50, right: 30, bottom: 10, left: 50 }
    const containerWidth = document.querySelector('.container-other').clientWidth
    console.log(containerWidth)
    const width = containerWidth - margin.left - margin.right
    const height = 800 - margin.top - margin.bottom

    const x = this.$d3.scaleBand(
      data.map(d => d.name),
      [0, height]
    ).paddingInner(0.1).paddingOuter(0.3)

    const y = this.$d3.scaleLinear(
      [0, this.$d3.max(data, d => d.gdp)],
      [0, width]
    )

    const xAxis = this.$d3.axisLeft(x)
    const yAxis = this.$d3.axisTop(y)

    const svg = this.$d3.select('.chart-other')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 0)
      .attr('dy', 16)
      .style('text-anchor', 'middle')
      .text('2018年中国各省（直辖市）GDP总量')

    const chart = svg.append('g')
      .attr('transform', `translate(${ margin.left },${ margin.top })`)

    chart.append('g').attr('class', 'x axis').call(xAxis)
    chart.append('g').attr('class', 'y axis').call(yAxis)

    const bar = chart.selectAll('.bar')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'bar')
      .attr('transform', d => `translate(0, ${ x(d.name) })`)

    bar.append('rect')
      .attr('height', x.bandwidth())
      .transition()
      .delay((d, i) => i * 50)
      .duration(500)
      .ease(this.$d3.easeCubicOut)
      .attr('width', d => y(d.gdp))

    bar.append('text')
      .style('fill', '#fff')
      .attr('y', x.bandwidth() / 2)
      .attr('dy', 3)
      .text(d => d.gdp)
      .transition()
      .delay((d, i) => i * 50)
      .duration(500)
      .ease(this.$d3.easeCubicOut)
      .attr('x', d => y(d.gdp) - 5)
  }
}
</script>

<style lang="scss" scoped>
  .container-other {
    width: 100%;
  }
  
  .chart-other::v-deep {
    .bar {
      fill: steelblue;
      font-size: 10px;
      text-anchor: end;
    }
    
    .axis text {
      font: 10px sans-serif;
    }
    
    .axis path,
    .axis line {
      fill: none;
      stroke: #000;
      shape-rendering: crispEdges;
    }
  }

</style>
