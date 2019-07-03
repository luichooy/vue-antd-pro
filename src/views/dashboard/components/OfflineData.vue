<script>
import CustomTab from './CustomTab'

export default {
  name: 'OfflineData',
  components: { CustomTab },
  props: {
    loading: Boolean,
    offlineData: {
      type: Array,
      required: true
    }
  },
  render () {
    const {
      loading,
      offlineData
    } = this
    
    return (
      <a-card loading={ loading } bordered={ false } class="offline-data">
        <a-tabs tabBarStyle={ { borderBottom: 'none' } }>
          { offlineData.map(shop => (
            <a-tab-pane key={ shop.name }>
              <template slot="tab">
                <custom-tab data={ shop } />
              </template>
              <div style={ { padding: '0 24px' } }>
                123
              </div>
            </a-tab-pane>
          )) }
        </a-tabs>
      </a-card>
    )
  }
}
</script>
<style lang="scss" scoped>
  .offline-data ::v-deep {
    margin-top: 16px;
    
    .ant-tabs-ink-bar {
      bottom: auto;
    }
  }
</style>
