import { createRouter, createWebHashHistory } from 'vue-router'
import CountriesView from '@/views/CountriesView.vue'
import HomeView from '@/views/HomeView.vue'
import AnimalsView from '@/views/AnimalsView.vue'
import CelestialView from '@/views/CelestialView.vue'
import EventsView from '@/views/EventsView.vue'
import FootballView from '@/views/FootballView.vue'
import RiversView from '@/views/RiversView.vue'
import StagesView from '@/views/StagesView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/animals',
    name: 'animals',
    component: AnimalsView
  },
  {
    path: '/celestial',
    name: 'celestial',
    component: CelestialView
  },
  {
    path: '/countries',
    name: 'countries',
    component: CountriesView
  },
  {
    path: '/events',
    name: 'events',
    component: EventsView
  },
  {
    path: '/football',
    name: 'football',
    component: FootballView
  },
  {
    path: '/rivers',
    name: 'rivers',
    component: RiversView
  },
  {
    path: '/stages',
    name: 'stages',
    component: StagesView
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
