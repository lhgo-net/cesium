import router from './router'

import { menu } from './menu'
import dynamic from './dynamic'

// let routesLoaded = false

router.beforeEach(async (to, from, next) => {
  document.title = ` ${to.meta.title} | LH`
  console.log(to)
  // eslint-disable-next-line no-undef
  const token = localStorage.getItem('token')
  if (!token) {
    console.log(token)
    await dynamic(menu)
    // routesLoaded = true
    next(to)
  }
  // console.log(router.getRoutes())
  next()
})

export default router
