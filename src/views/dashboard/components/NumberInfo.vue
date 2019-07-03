<script>
export default {
  name: 'NumberInfo',
  props: {
    title: String,
    subTitle: String,
    gap: Number,
    total: String,
    subTotal: Number,
    theme: String,
    suffix: String,
    status: String
  },
  
  render () {
    const { title, subTitle, gap, total, suffix, subTotal, status } = this
    return (
      <div class="number-info">
        { title && <div class="number-info-title" title={ title }>{ title }</div> }
        { subTitle && <div class="number-info-subtitle" title={ subTitle }>{ subTitle }</div> }
        <div class="number-info-value" style={ gap ? { marginTop: gap + 'px' } : {} }>
          <span>
            { total }
            { suffix && <em class="number-info-value__suffix">{ suffix }</em> }
          </span>
          { (status || subTotal) && (
            <span class="number-info-value__subtotal">
              { subTotal }
              { status && <a-icon type={ `caret-${status}` } /> }
            </span>
          ) }
        </div>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
  .number-info {
    .number-info-title {
      margin-bottom: 16px;
      color: rgba(0, 0, 0, .65);
      font-size: 16px;
      transition: all .3s;
    }
    
    .number-info-subtitle {
      height: 22px;
      line-height: 22px;
      color: rgba(0, 0, 0, .45);
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
    }
    
    .number-info-value {
      margin-top: 4px;
      overflow: hidden;
      font-size: 0;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
      
      span {
        display: inline-block;
        height: 32px;
        line-height: 32px;
        margin-right: 32px;
        color: rgba(0, 0, 0, .65);
        font-size: 24px;
      }
      
      .number-info-value__suffix {
      }
      
      .number-info-value__subtotal {
      }
    }
  }
</style>
