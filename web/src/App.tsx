import { ThemeProvider } from 'theme-ui'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import { theme } from './theme'

import { AuthProvider, useAuth } from './auth'

import './index.css'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%AppTitle">
      <AuthProvider>
        <RedwoodApolloProvider useAuth={useAuth}>
          <ThemeProvider theme={theme}>
            <Routes />
          </ThemeProvider>
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
