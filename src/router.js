import VueRouter from 'vue-router'
import routes from './routes'
import qs from 'qs'

let router = new VueRouter(
  {
    routes: routes,
    mode: 'history',
    linkActiveClass: 'active',
    parseQuery: function (query) {
      return qs.parse(query)
    },
    stringifyQuery: function (query) {
      let result = qs.stringify(query)

      return result ? ('?' + result) : ''
    }
  }
)

router.beforeEach(
  (to, from, next) => {
    const allowedPaths = [
      '/',
      '/login',
      '/404',
      '/editor/demo',
      '/editor/demo/settings',
      '/editor/demo/settings/visualSettings',
      '/editor/demo/settings/seoSettings',
      '/editor/demo/settings/cookiesSettings',
      '/editor/demo/settings/addJsScrips',
      '/editor/demo/settings/addCss',
      '/editor/demo/settings/openGraph',
      '/editor/demo/settings/integrations',
      '/editor/demo/settings/integrations/googleTag',
      '/editor/demo/settings/integrations/googleAnalitycs',
      '/editor/demo/settings/integrations/mailchimp',
      '/editor/demo/settings/fonts'
    ]

    if (!allowedPaths.includes(to.path) && (localStorage.getItem('token') === null)) {
      next('/login')
      return
    } else if ( // you can go to the direct link to the demo
      allowedPaths.includes(to.path)
      && localStorage.getItem('token') === null
      && localStorage.getItem('guest') === null
    ) {
      localStorage.setItem('guest', true)
    }

    next()
  }
)

router.afterEach((to) => {
  document.title = to.meta.title ? to.meta.title : 'Ptah'
})

export default router
