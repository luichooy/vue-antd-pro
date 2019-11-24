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

    bar.append('rect').attr('width', x).attr('height', this.barSize.height - 1)

    bar.append('text')
      .attr('x', d => x(d) - 3)
      .attr('y', this.barSize.height / 2)
      .attr('dy', '.35em')
      .text(d => d)
    
    /* part3 */
    const data = [
      { name: 'Locke', value: 4 },
      { name: 'Reyes', value: 8 },
      { name: 'Ford', value: 15 },
      { name: 'Jarrah', value: 16 },
      { name: 'Shephard', value: 23 },
      { name: 'Kwon', value: 42 }
    ]

    const width = 960
    const height = 500

    const chart3 = this.$d3.select('.part3')
      .attr('width', width)
      .attr('height', height)

    const y = this.$d3.scaleLinear(
      [this.$d3.max(data, d => d.value), 0],
      [0, height]
    )

    const barWidth = width / data.length

    {
      const bar = chart3.selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr(
          'transform',
          (d, i) => `translate(${ barWidth * i }, 0)`
        )

      bar.append('rect')
        .attr('y', d => y(d.value))
        .attr('width', barWidth - 1)
        .attr('height', d => height - y(d.value))

      bar.append('text')
        .attr('x', barWidth / 2)
        .attr('y', d => y(d.value) + 3)
        .attr('dy', '0.75em')
        .text(d => d.value)
    }
  }
}
</script>

<style lang="scss">
  .part1 div {
    margin-bottom: 1px;
    padding-right: 3px;
    text-align: right;
    color: #fff;
    font-size: 10px;
    background: steelblue;
  }
  
  .part2 {
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
  
  .part3 {
    display: block;
    
    rect {
      fill: steelblue;
    }
    
    text {
      fill: white;
      font: 10px sans-serif;
      text-anchor: middle;
    }
  }
</style>
