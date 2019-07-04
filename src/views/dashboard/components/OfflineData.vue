<script>
import CustomTab from './CustomTab'
import TimelineChart from '@/components/Chart/TimelineChart'

export default {
  name: 'OfflineData',
  components: { CustomTab, TimelineChart },
  props: {
    loading: Boolean,
    offlineData: {
      type: Array,
      required: true
    },
    offlineChartData: {
      type: Array,
      required: true
    }
  },
  render () {
    const {
      loading,
      offlineData,
      offlineChartData
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
                <timeline-chart
                  height={ 400 }
                  data={ offlineChartData }
                  titleMap={ {
                    y1: '客流量',
                    y2: '支付笔数'
                  } }
                />
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
