import router from './index'
const modles = import.meta.glob('/src/views/**/**.vue')

function dynamic(menu) {
  console.log(menu)
  console.log(modles)
  if (!menu || !menu.length) {
    console.log('---------------')
    return '无效数据'
  }
  menu.forEach(async item => {
    const filePath = `/src/views/${item.component}.vue`
    try {
      const modulePath = modles[filePath]()
      const { default: component } = await modulePath
      const route = {
        name: item.name,
        path: item.path,
        component,
        meta: {
          titel: item.name
        }
      }
      router.addRoute(route)
    } catch (error) {
      console.log('页面导入时错误：', error)
    }
  })
}

export default dynamic
