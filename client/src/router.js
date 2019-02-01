import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./components/Content')
    },
    {
      path: '/users',
      component: Home,
      children: [
        {
          path: '',
          name: 'users',
          component: () => import('./components/Content')
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('./views/Login'),
          meta: {
            alreadyLogin: true
          }
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('./views/Register'),
          meta: {
            alreadyLogin: true
          }
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About')
    },
    {
      path: '/questions',
      component: () => import('./views/Home'),
      children: [
        {
          path: '',
          name: 'questions',
          component: () => import('./components/Content')
        },
        {
          path: 'add',
          name: 'addQuestion',
          component: () => import('./components/AddQuestion'),
          meta: {
            isLogin: true
          }
        },
        {
          path: 'update/:id',
          name: 'updateQuestion',
          component: () => import('./components/UpdateQuestion'),
          meta: {
            isLogin: true
          }
        },
        {
          path: ':id',
          name: 'question-detail',
          component: () => import('./components/QuestionDetail')
        },
        {
          path: 'tagged/:tagId',
          name: 'question-tag',
          component: () => import('./components/Content')
        }
      ]
    },
    {
      path: '/tags',
      component: () => import('./views/Home'),
      children: [
        {
          path: '',
          name: 'tags',
          component: () => import('./components/TagsList')
        }
      ]
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isLogin) && !localStorage.token) {
    next('/users/login')
  } else if (to.matched.some(record => record.meta.alreadyLogin) && localStorage.token) {
    next('/questions')
  } else {
    next()
  }
})

export default router
