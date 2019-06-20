// 业务类型
const businessStrategy = {
  1210: '保税进口',
  9610: '直邮进口'
};
export const businessTypeFilter = type => businessStrategy[type] || '未知业务';

// 币制
export const currencyFilter = currency => {
  switch (currency) {
    case '142':
      return '人民币';
    default:
      return '人民币';
  }
};

// 申报类型
export const applyTypeFilter = type => {
  switch (type) {
    case 1:
      return '新增';
    case 2:
      return '修改';
    case 3:
      return '删除';
    default:
      return '新增';
  }
};

// 上传状态
export const uploadStatusFilter = status => {
  switch (status) {
    case 0:
      return '失败';
    case 1:
      return '成功';
    default:
      return '未知状态';
  }
};

// 推送状态
export const pushStatusFilter = status => {
  switch (status) {
    case 0:
      return '未推送';
    case 1:
      return '已推送';
    default:
      return '未知状态';
  }
};
