<template>
  <div class="bar">
    <a-card :bordered="false" title="基本示例">
      <div id="basic-bar"></div>
    </a-card>
  </div>
</template>

<script>
import G2 from '@antv/g2'

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 }
]

export default {
  mounted () {
    const chart = new G2.Chart({
      container: 'basic-bar',
      forceFit: true,
      height: 500
    })

    chart.source(data)
    chart.interval().position('genre*sold').color('genre')
    chart.render()
  }
}
</script>
