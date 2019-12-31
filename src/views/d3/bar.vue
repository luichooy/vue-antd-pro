<template>
  <div class="bar">
    <bar-chart />
    
    <transition style="margin: 16px 0;" />
    
    <transition-other style="margin: 16px 0;" />
  </div>
</template>

<script>
import BarChart from './components/Bar/BarChart'
import Transition from './components/Bar/Transition'
import TransitionOther from './components/Bar/TransitionOther'

export default {
  components: {
    BarChart,
    Transition,
    TransitionOther
  }
}
</script>
