import {
  defineConfig,
  presetUno,
  presetWind,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetWind(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    colors: {
      // You can add custom colors here if needed
    },
  },
  shortcuts: {
    // Define shortcuts for common patterns
    // 'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
  },
  rules: [
    // Custom rules can be added here
  ],
})