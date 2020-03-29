import BuilderModalContent from '@editor/components/BuilderModalContent'
import BuilderSiteSettingsSeo from '@editor/components/BuilderSiteSettingsSeo'
import BuilderSiteSettingsVisual from '@editor/components/BuilderSiteSettingsVisual'
import BuilderSiteSettingsAddJsScripts from '@editor/components/BuilderSiteSettingsAddJsScripts'
import BuilderSiteSettingsIntegrations from '@editor/components/BuilderSiteSettingsIntegrations'
import BuilderSiteSettingsIntegrationsGoogleTag from '@editor/components/BuilderSiteSettingsIntegrationsGoogleTag'
import BuilderSiteSettingsIntegrationsGoogleAnalitycs from '@editor/components/BuilderSiteSettingsIntegrationsGoogleAnalitycs'
import BuilderSiteSettingsIntegrationsMailchimp from '@editor/components/BuilderSiteSettingsIntegrationsMailchimp'
import BuilderSiteSettingsFonts from '@editor/components/BuilderSiteSettingsFonts'

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "Intro" */'@components/Intro'),
    meta: {
      title: 'Ptah — landing page builder for games'
    }
  },
  {
    path: '/dashboard/',
    component: () => import(/* webpackChunkName: "Layout" */'@components/Layout'),
    children: [
      {
        path: '',
        meta: {
          title: 'Dashboard - Ptah'
        },
        component: () => lazyLoadView(import(/* webpackChunkName: "Dashboard" */ '@components/pages/Dashboard')),
        name: 'Dashboard'
      }
    ]
  },
  {
    path: '/editor/:slug',
    component: () => import(/* webpackChunkName: "VuseEditor" */ '@components/pages/VuseEditor'),
    name: 'VuseEditor',
    meta: {
      title: 'Ptah'
    },
    alias: '',
    children: [
      {
        path: 'settings',
        component: BuilderModalContent,
        redirect: { name: BuilderSiteSettingsVisual },
        children: [
          {
            path: 'visualSettings',
            component: BuilderSiteSettingsVisual
          },
          {
            path: 'seoSettings',
            component: BuilderSiteSettingsSeo
          },
          {
            path: 'addJsScrips',
            component: BuilderSiteSettingsAddJsScripts
          },
          {
            path: 'integrations',
            component: BuilderSiteSettingsIntegrations,
            children: [
              {
                path: 'googleTag',
                component: BuilderSiteSettingsIntegrationsGoogleTag
              },
              {
                path: 'googleAnalitycs',
                component: BuilderSiteSettingsIntegrationsGoogleAnalitycs
              },
              {
                path: 'mailchimp',
                component: BuilderSiteSettingsIntegrationsMailchimp
              }
            ]
          },
          {
            path: 'fonts',
            component: BuilderSiteSettingsFonts,
            meta: {
              wide: true
            }
          }
        ]
      }
    ]
  },
  {
    path: '/login/',
    component: () => import('@components/pages/Login'),
    name: 'Login',
    meta: {
      title: 'Login - Ptah'
    },
    alias: ''
  },
  {
    path: '/_sandbox/',
    component: () => import('@components/pages/Sandbox'),
    name: 'Sandbox',
    alias: ''
  },
  {
    path: '/oauth_complete/',
    component: () => import('@components/pages/OauthComplete'),
    name: 'OauthComplete',
    alias: ''
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@components/NotFound'),
    meta: {
      title: '404 - Ptah'
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
]

// Lazy-loads view components, but with better UX. A loading view
// will be used if the component takes a while to load, falling
// back to a timeout view in case the page fails to load. You can
// use this component to lazy-load a route with:
//
// component: () => lazyLoadView(import('@views/my-view'))
//
// NOTE: Components loaded with this strategy DO NOT have access
// to in-component guards, such as beforeRouteEnter,
// beforeRouteUpdate, and beforeRouteLeave. You must either use
// route-level guards instead or lazy-load the component directly:
//
// component: () => import('@views/my-view')
//
function lazyLoadView (AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    loading: import('@components/base/BaseLoading'),
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    error: import('@components/base/BaseTimeout'),
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 70,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 15000
  })

  return Promise.resolve({
    functional: true,
    render (h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children)
    }
  })
}

export default routes
