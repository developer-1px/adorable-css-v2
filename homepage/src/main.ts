import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

// Test AdorableCSS v2 library import
import AdorableCSSV2 from 'adorable-css-cdn'

// Initialize AdorableCSS v2
AdorableCSSV2.init({ 
  debug: true,
  watch: true 
})

console.log('AdorableCSS v2 version:', AdorableCSSV2.version)

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app