import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Login from './pages/auth/Login'
import Dashboard from './pages/dashboard'
import DailySnapshot from './pages/dashboard/snapshot'
import ClientProfile from './pages/dashboard/clients/[id]' 
import { ProtectedRoute } from './components/custom/ProtectedRoute'
import Settings from './pages/dashboard/settings'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard Home */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* FIX: Added a route for the general clients list.
            If you don't have a separate list component yet, 
            you can temporarily point this to <Dashboard /> 
          */}
          <Route 
            path="/dashboard/clients" 
            element={
              <ProtectedRoute>
                <Dashboard /> 
              </ProtectedRoute>
            } 
          />

          {/* Dynamic Client Profile Route */}
          <Route 
            path="/dashboard/clients/:id" 
            element={
              <ProtectedRoute>
                <ClientProfile />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/daily-snapshot" 
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

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Catch-all to prevent white screens on broken links */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App