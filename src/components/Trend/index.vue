<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'up'
    },
    suffix: String
  },
  render () {
    const { label, value, type, suffix } = this
    const iconClass = ['trend-icon', `trend-icon-${type}`]
    const iconType = `caret-${type}`
    return (
      <div class="trend">
        { label && (<span class="trend-label">{ label }</span>) }
        <span class="trend-value">
          <span>{ value }</span>
          { suffix && <span>{ suffix }</span> }
          
        </span>
        <span class={ iconClass }>
          <a-icon type={ iconType } />
        </span>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
  .trend {
    display: inline-block;
    line-height: 22px;
    .trend-label {
      margin-right: 8px;
    }
    
    .trend-value {
      color: rgba(0, 0, 0, 0.85);
    }
    
    .trend-icon {
      margin-left: 4px;
      
      &.trend-icon-up {
        color: rgb(245, 34, 45);
      }
      
      &.trend-icon-down {
        color: rgb(82, 196, 26);
      }
      
      i {
        font-size: 12px;
        transform: scale(0.83);
      }
    }
  }
</style>
