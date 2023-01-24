import { createRouter, createWebHistory } from "vue-router";
import Home from '@/views/Home.vue'
import Products from '@/views/Products.vue'
import Admin from '@/views/Admin.vue'
import Layout from "@/views/Layout.vue";

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
  },
  {
    path: `${base}/layout`,
    name: 'layout',
    component: Layout
  }
]


export default createRouter({ history, routes })
