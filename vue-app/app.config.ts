export default defineAppConfig({
  ui: {
    strategy: 'override',
    container: {
      constrained: 'max-w-xl',
    },
    checkbox: {
      base: 'disabled:pointer',
      ring: 'ring-1 ring-gray-300',
    },
    card: {
      ring: 'ring-1 ring-gray-300 dark:ring-gray-800',
    },
    primary: 'cyan',
    gray: 'cool',
  },
})
