let casual = require('casual')

const roleMap = [
  {
    label: '超级管理员',
    value: 1
  },
  {
    label: '管理员',
    value: 2
  },
  {
    label: '操作员A',
    value: 3
  },
  {
    label: '操作员B',
    value: 4
  }
]

casual.define('user', function (role) {
  return {
    id: casual.card_number(),
    username: casual.username,
    contactsFirstName: casual.first_name,
    contactsLastName: casual.last_name,
    contactsEmail: casual.email,
    provinceName: casual.state,
    cityName: casual.city,
    areaName: casual.word,
    address: casual.address,
    roleId: role.value,
    roleName: role.label,
    status: casual.integer(0, 1),
    createTime: casual.unix_time,
    updateTime: casual.unix_time
  }
})

module.exports = () => {
  const data = {
    users: []
  }
  
  for (let i = 0; i < 54; i++) {
    data.users.push(casual.user(casual.random_element(roleMap)))
  }
  
  return data
}
