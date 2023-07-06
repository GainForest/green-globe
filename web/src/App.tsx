import { Provider } from 'react-redux'
import { ThemeProvider } from 'theme-ui'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import { AuthProvider, useAuth } from './auth'
import store from './store'
import { theme } from './theme'

import './index.css'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%AppTitle">
      <AuthProvider>
        <RedwoodApolloProvider useAuth={useAuth}>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <Routes />
            </ThemeProvider>
          </Provider>
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
