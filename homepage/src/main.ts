import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

// Import AdorableCSS v2 CDN
import AdorableCSSV2 from 'adorable-css-cdn'
import { injectTokens } from 'adorable-css'

// Initialize AdorableCSS v2
AdorableCSSV2.init({ 
  debug: true,
  watch: true 
})

// Inject design tokens
injectTokens()

console.log('AdorableCSS v2 version:', AdorableCSSV2.version)

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app