import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Login from './pages/auth/Login'
import Dashboard from './pages/dashboard'
import DailySnapshot from './pages/dashboard/snapshot'
import ClientsPage from './pages/dashboard/clients/index' // 1. Point to your new list page
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
          
          {/* Main Dashboard (The Command Center with Heatmap/Metrics) */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* 2. Dedicated Client List View (Search/Table only) */}
          <Route 
            path="/dashboard/clients" 
            element={
              <ProtectedRoute>
                <ClientsPage /> 
              </ProtectedRoute>
            } 
          />

          {/* Dynamic Client Profile (Deep Dive) */}
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
          
          {/* Global Redirect for undefined routes */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App