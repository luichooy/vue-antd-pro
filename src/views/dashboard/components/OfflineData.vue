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
      <a-card loading={ loading } bordered={ false } style="margin-top: 16px;">
        <a-tabs>
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
