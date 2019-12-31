<template>
  <a-card title="Let’s Make a Bar Chart" :bordered="false">
    <a-row :gutter="8">
      <a-col :span="12">
        Part Ⅰ
        <div class="part1"></div>
      </a-col>
      <a-col :span="12">
        Part Ⅱ
        <svg class="part2"></svg>
      </a-col>
      <a-col :span="24">
        Part Ⅲ
        <svg class="part3"></svg>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
export default {
  data () {
    return {
      data: [4, 8, 15, 16, 23, 42],
      barSize: {
        width: 420,
        height: 20
      }
    }
  },
  mounted () {
    /* part1 html */
    this.$d3.select('.part1')
      .selectAll('div')
      .data(this.data)
      .enter()
      .append('div')
      .text(d => d)
      .style('width', d => (d * 10 + 'px'))
      .style('height', this.barSize.height - 1 + 'px')
    
    /* part2 svg */
    {
      const x = this.$d3.scaleLinear(
        [0, this.$d3.max(this.data)],
        [0, this.barSize.width]
      )

      const chart2 = this.$d3.select('.part2')
        .attr('width', this.barSize.width)
        .attr('height', this.barSize.height * this.data.length)

      const bar = chart2.selectAll('g')
        .data(this.data)
        .enter()
        .append('g')
        .attr(
          'transform',
          (d, i) => `translate(0, ${ this.barSize.height * i })`
        )

      bar.append('rect')
        .attr('width', x)
        .attr('height', this.barSize.height - 1)

      bar.append('text')
        .attr('x', d => x(d) - 3)
        .attr('y', this.barSize.height / 2)
        .attr('dy', '.35em')
        .text(d => d)
    }
    
    /* part3 */
    {
      const data = [
        { name: 'Locke', value: 4 },
        { name: 'Reyes', value: 8 },
        { name: 'Ford', value: 15 },
        { name: 'Jarrah', value: 16 },
        { name: 'Shephard', value: 23 },
        { name: 'Kwon', value: 42 }
      ]

      const margin = { top: 20, right: 30, bottom: 30, left: 40 }

      const width = 960 - margin.left - margin.right
      const height = 500 - margin.top - margin.bottom

      const x = this.$d3.scaleBand(
        data.map(d => d.name),
        [0, width]
      ).paddingInner(0.3).paddingOuter(0.1)

      const y = this.$d3.scaleLinear(
        [0, this.$d3.max(data, d => d.value)],
        [height, 0]
      )

      const xAxis = this.$d3.axisBottom(x)
      const yAxis = this.$d3.axisLeft(y)

      const chart3 = this.$d3.select('.part3')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${ margin.left },${ margin.top })`)

      chart3.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${ height })`)
        .call(xAxis)

      chart3.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('class', 'label')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('transform', 'rotate(-90)')
        .style('text-anchor', 'end')
        .text('Number')

      chart3.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.value))
        .attr('height', d => height - y(d.value))
        .attr('width', x.bandwidth())
    }
  }
}
</script>

<style lang="scss" scoped>
  .part1::v-deep div {
    margin-bottom: 1px;
    padding-right: 3px;
    text-align: right;
    color: #fff;
    font-size: 10px;
    background: steelblue;
  }
  
  .part2::v-deep {
    display: block;
    
    rect {
      fill: steelblue;
    }
    
    text {
      fill: white;
      font: 10px sans-serif;
      text-anchor: end;
    }
  }
  
  .part3::v-deep {
    display: block;
    
    .bar {
      fill: steelblue;
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
    
    .y.axis .label {
      fill: red;
    }
    
    /* .x.axis path {
      display: none;
    } */
  }
</style>
