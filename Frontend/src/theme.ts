import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  global: {
    html: {
      overflow: 'scroll',
      overflowX: 'hidden',
    },
    body: {
      position: 'relative',
      bg: 'white',
      overflowX: 'hidden',
      width: '100vw',
      WebkitFontSmoothing: 'auto',
    },
  },
  colors: {
    brand: {
      vividOrange: '#ff6900',
      vividRed: '#cf2e2e',
    },
  },
})

export default theme
