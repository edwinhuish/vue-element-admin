import Mock from 'mockjs'

const List = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    partnerships: [1],
    code: '@first',
    name: '@title(5, 10)',
    website: image_uri,
    add1: baseContent,
    'country|1': ['CN', 'US', 'JP', 'EU'],
    contacts: [{
      code: 'P@increment',
      name: '@first',
      'department|1': ['Market', 'Source', 'Test', 'Service'],
      email: 'test@email.com',
      'tel1|1': ['13531544954', '13632250649', '15820292420', '15999905612']
    }, {
      code: 'P@increment',
      name: '@first',
      'department|1': ['Market', 'Source', 'Test', 'Service'],
      email: 'test@email.com',
      'tel1|1': ['13531544954', '13632250649', '15820292420', '15999905612']
    }, {
      code: 'P@increment',
      name: '@first',
      'department|1': ['Market', 'Source', 'Test', 'Service'],
      email: 'test@email.com',
      'tel1|1': ['13531544954', '13632250649', '15820292420', '15999905612']
    }, {
      code: 'P@increment',
      name: '@first',
      'department|1': ['Market', 'Source', 'Test', 'Service'],
      email: 'test@email.com',
      'tel1|1': ['13531544954', '13632250649', '15820292420', '15999905612']
    }, {
      code: 'P@increment',
      name: '@first',
      'department|1': ['Market', 'Source', 'Test', 'Service'],
      email: 'test@email.com',
      'tel1|1': ['13531544954', '13632250649', '15820292420', '15999905612']
    }],
    records: [{
      user: '@first',
      timestamp: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
      description: '@title(3, 8)'
    }, {
      user: '@first',
      timestamp: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
      description: '@title(3, 8)'
    }, {
      user: '@first',
      timestamp: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
      description: '@title(3, 8)'
    }, {
      user: '@first',
      timestamp: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
      description: '@title(3, 8)'
    }, {
      user: '@first',
      timestamp: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
      description: '@title(3, 8)'
    }, {
      user: '@first',
      timestamp: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
      description: '@title(3, 8)'
    }, {
      user: '@first',
      timestamp: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
      description: '@title(3, 8)'
    }],
    created_at: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
    updated_at: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")')
  }))
}

export default [
  {
    url: '/clients/list',
    type: 'get',
    response: config => {
      const { country, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (country && item.country !== country) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/clients/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const client of List) {
        if (client.id === +id) {
          return {
            code: 20000,
            data: client
          }
        }
      }
    }
  },

  // {
  //   url: '/article/pv',
  //   type: 'get',
  //   response: _ => {
  //     return {
  //       code: 20000,
  //       data: {
  //         pvData: [
  //           { key: 'PC', pv: 1024 },
  //           { key: 'mobile', pv: 1024 },
  //           { key: 'ios', pv: 1024 },
  //           { key: 'android', pv: 1024 }
  //         ]
  //       }
  //     }
  //   }
  // },

  {
    url: '/clients/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/clients/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

