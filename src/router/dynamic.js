<<<<<<< HEAD
// import { toRaw } from 'vue'
import router from './router'
// import { useMenuStore } from '@/store/index'
const modles = import.meta.glob('/src/views/**/**.vue')

function dynamic(menu) {
  if (!menu || !menu.length) {
    return '无效数据'
  }
  // const store = toRaw(useMenuStore())
  menu.forEach(item => {
    const filePath = `/src/views/${item.component}.vue`
    try {
      const modulePath = modles[filePath]
      const component = modulePath
      if (item.children && item.children.length) {
        dynamic(item.children)
      }
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
=======
import router from './router';
const modles = import.meta.glob('/src/views/**/**.vue');

function dynamic(menu) {
	if (!menu || !menu.length) {
		return '无效数据';
	}
	menu.forEach((item) => {
		const filePath = `/src/views/${item.component}.vue`;
		try {
			const modulePath = modles[filePath];
			const component = modulePath;
			if (item.children && item.children.length) {
				dynamic(item.children);
			}
			const route = {
				name: item.name,
				path: item.path,
				component,
				meta: {
					titel: item.name,
				},
			};
			router.addRoute(route);
		} catch (error) {
			console.log('页面导入时错误：', error);
		}
	});
>>>>>>> dev
}

export default dynamic;
