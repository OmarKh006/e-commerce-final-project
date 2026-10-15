import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import './lib/i18n'
import App from './App.jsx'
import AppProviders from './context/AppProviders.jsx'

// Support hash-style URLs (e.g. /#/cart) by rewriting them to the real path
// before the router starts. Standard paths keep working unchanged.
if (window.location.hash.startsWith('#/')) {
  window.history.replaceState(null, '', window.location.hash.slice(1))
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProviders>
        <App />
      </AppProviders>
    </QueryClientProvider>
  </StrictMode>,
)
