import { extendTheme } from "@chakra-ui/react"


export const theme = extendTheme({
  colors: {
    brand: {
      100: "#6D10FC11",
      200: "#51457255",
      300: "#88a0ce",
      500: '#10409D',
      600: '#210372',
      800: "#514572",
      900: "#4C3387"
    },
  },
  breakpoints: {
    xs: '400px',
    sm: '610px',
    md: '768px',
    lg: '992px',
    xl: '1280px',
    '2xl': '96em',
  }
})
