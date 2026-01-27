import { createApp } from 'vue'
import { addCollection } from '@iconify/vue'
import { icons as heroIcons } from '@iconify-json/heroicons'
import { icons as simpleIcons } from '@iconify-json/simple-icons'
import './styles.css'
import App from './App.vue'

// Register icons globally for offline support
addCollection(heroIcons)
addCollection(simpleIcons)

createApp(App).mount('#app')
