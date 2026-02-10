import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Public Pages
import Landing from './pages/Landing'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup' // Ensure you create this file

// App Pages
import Onboarding from './pages/onboarding' // The 3-question flow
import Dashboard from './pages/dashboard'
import ClientsPage from './pages/dashboard/clients/index'
import ClientProfile from './pages/dashboard/clients/[id]' 
import DailySnapshot from './pages/dashboard/snapshot'
import Settings from './pages/dashboard/settings'
import Billing from './pages/dashboard/billing' // New Billing page

// Components
import { ProtectedRoute } from './components/custom/ProtectedRoute'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* --- PROTECTED ONBOARDING --- */}
          {/* Users go here first after signing up */}
          <Route 
            path="/onboarding" 
            element={
              <ProtectedRoute>
                <Onboarding />
              </ProtectedRoute>
            } 
          />

          {/* --- CORE APP ROUTES --- */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/dashboard/clients" 
            element={
              <ProtectedRoute>
                <ClientsPage /> 
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/dashboard/clients/:id" 
            element={
              <ProtectedRoute>
                <ClientProfile />
              </ProtectedRoute>
            } 
          />

          {/* Updated to /snapshot to match Bible */}
          <Route 
            path="/snapshot" 
            element={
              <ProtectedRoute>
                <DailySnapshot />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/billing" 
            element={
              <ProtectedRoute>
                <Billing />
              </ProtectedRoute>
            } 
          />

          {/* --- REDIRECTS & CATCH-ALL --- */}
          {/* If a user is logged in and hits a dead link, take them home */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App