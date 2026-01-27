import { ViteSSG } from 'vite-ssg'
import { addCollection } from '@iconify/vue'
import { icons as heroIcons } from '@iconify-json/heroicons'
import { icons as simpleIcons } from '@iconify-json/simple-icons'
import './styles.css'
import App from './App.vue'
import Home from './pages/Home.vue'

// Register icons globally
addCollection(heroIcons)
addCollection(simpleIcons)

const routes = [
  { path: '/', component: Home }
]

export const createApp = ViteSSG(
  App,
  { routes },
)
