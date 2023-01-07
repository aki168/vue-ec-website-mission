import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import Admin from '../views/Admin.vue'

const base = '/vue-ec-website-mission'

let history = createWebHistory()
let routes = [
  {
    path: `${base}/`,
    name: 'Home',
    component: Home
  },
  {
    path: `${base}/products`,
    name: 'Products',
    component: Products
  },
  {
    path: `${base}/admin`,
    name: 'admin',
    component: Admin
  }
]


export default createRouter({ history, routes })
