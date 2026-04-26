import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './features/storefront/context/AppContext'
import AppRoutes from './app/routes/AppRoutes'

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
