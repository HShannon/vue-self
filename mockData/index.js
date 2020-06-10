import Mock from 'mockjs'
Mock.mock('/api/products' , {
  data: {
    'products|10-20': [{
      name: '手机',
      'price|+1': 1000,
      //生成一个英文名字
      'nikename': Mock.Random.name(),
      //生成一个中文名字
      chineseName: Mock.Random.cname(),
      imgURL: Mock.Random.image(),
      date: Mock.Random.date('yyyy-MM-dd'),
      url: Mock.Random.url('http')
    }]
  }
})