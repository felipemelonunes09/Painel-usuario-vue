import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Users from '../views/Users.vue'
import Edit from '../views/Edit.vue'

import axios from 'axios'

function admin_auth(to, from, next){
  if (localStorage.getItem('PAINEL_TOKEN') != undefined) {

    let req = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('PAINEL_TOKEN')}`
      }
    }

    axios.post('http://localhost:8081/validate', {},req).then(() => {
      req = undefined
      next();
    }).catch((e) => {
      console.log(e)
      next('/login')
    })
  }
  else {
    next('/login')
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: Users,
    beforeEnter : admin_auth
  },
  {
    path: '/admin/users/edit/:id',
    name: 'Edit',
    component: Edit,
    beforeEnter : admin_auth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
