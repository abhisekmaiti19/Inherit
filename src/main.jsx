import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme.js'
import { GlobalContextProvider } from './Store/GlobalContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Router>
    <GlobalContextProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
    </GlobalContextProvider>
      </Router>
  </React.StrictMode>,
)
