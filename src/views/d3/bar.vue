<template>
  <div class="bar">
    <bar-chart />
    
    <transition style="margin: 16px 0;" />
    
    <transition-other style="margin: 16px 0;" />
  </div>
</template>

<script>
import BarChart from './components/Tutorials/BarChart'
import Transition from './components/Tutorials/Transition'
import TransitionOther from './components/Tutorials/TransitionOther'

export default {
  components: {
    BarChart,
    Transition,
    TransitionOther
  }
}
</script>
