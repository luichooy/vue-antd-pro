<template>
  <div class="track">
    <svg width="800px" height="800px">
      <circle r="8" cx="11" cy="11" fill="#fff" stroke="#2492fc">123
        <animate attributeName="r" from="8" to="10" dur=".3s" begin="mouseover" fill="freeze" />
        <animate attributeName="r" from="10" to="8" dur=".3s" begin="mouseout" fill="freeze" />
      </circle>
    </svg>
    <a-card title="轨迹图" :bordered="false">
      <canvas id="track" width="800" height="400"></canvas>
    </a-card>
  </div>
</template>

<script>
import parkImg from './park.png'

export default {
  mounted () {
    const data = [
      {
        time: '',
        coords: [
          [75, 70], [100, 75], [150, 35], [150, 35]
        ]
      },
      {
        time: '',
        coords: [
          [70, 75], [110, 70], [10, 125], [140, 95]
        ]
      }
    ]
    const canvas = document.getElementById('track')
    const ctx = this.ctx = canvas.getContext('2d')
    const img = new Image()
    img.onload = function () {
      ctx.drawImage(img, 0, 0, 800, 400)
      ctx.beginPath()
      data.forEach(item => {
        item.coords.forEach((coord, index) => {
          ctx.arc(75, 70, 5, 0, Math.PI * 2, true)
          let x = coord[0]
          let y = coord[1]
          ctx.moveTo(75, 70)
          setTimeout(() => {
            ctx.lineTo(x, y)
            ctx.stroke()
          }, 1000)
        })
      })
      // ctx.arc(75, 70, 5, 0, Math.PI * 2, true)
      // ctx.moveTo(75, 70)
      // ctx.lineTo(100, 75)
      // ctx.lineTo(150, 35)
      // ctx.lineTo(300, 220)
      // ctx.lineTo(590, 75)
      // ctx.stroke()
    }
    img.src = parkImg
  }
}
</script>

<style lang="scss" scoped>

</style>
