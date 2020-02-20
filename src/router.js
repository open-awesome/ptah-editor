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
      '/editor/demo/settings/integrations/mailchimp'
    ]

    if (!allowedPaths.includes(to.path) && (localStorage.getItem('token') === null)) {
      next('/login')
      return
    }

    next()
  }
)

router.afterEach((to) => {
  document.title = to.meta.title ? to.meta.title : 'Ptah'
  this.$metrika.hit(to.path)
})

export default router
