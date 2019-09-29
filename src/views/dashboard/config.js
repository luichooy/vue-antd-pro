export const pieOptions = {
  color: ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'],
  tooltip: {
    trigger: 'item',
    formatter (params) {
      return `${params.seriesName}</br>${params.marker}${params.name}：${
        params.data.value
      } (${params.percent}%)`
    },
    confine: true,
    padding: [10, 10, 6, 10],
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    extraCssText: 'box-shadow: rgb(174, 174, 174) 0px 0px 10px;',
    textStyle: {
      color: 'rgb(87, 87, 87)'
    }
  },
  dataset: {
    source: []
  },
  series: [
    {
      name: '单量',
      type: 'pie',
      radius: ['45%', '60%'],
      label: {
        formatter: params => {
          const name = params.name
          return name.length > 5 ? name.substring(0, 5) + '...' : name
        }
      }
    }
  ]
}

// 单量分布
export const countColumn = [
  {
    title: '口岸',
    dataIndex: 'customsName',
    align: 'center',
    width: 200
  },
  {
    title: '单量',
    dataIndex: 'totalDeclareCount',
    align: 'center',
    width: 100
  },
  {
    title: '占比',
    dataIndex: 'rate',
    scopedSlots: { customRender: 'percent' },
    align: 'center',
    width: 150
  }
]

// 申报成功率
export const rateColumn = [
  {
    title: '口岸',
    dataIndex: 'customsName',
    align: 'center',
    width: 200
  },
  {
    title: '回执单量',
    dataIndex: 'receiptDeclareCount',
    align: 'center',
    width: 100
  },
  {
    title: '成功',
    dataIndex: 'succDeclareCount',
    align: 'center',
    width: 100
  },
  {
    title: '成功率',
    dataIndex: 'successRate',
    scopedSlots: { customRender: 'percent' },
    align: 'center',
    width: 200
  }
]
