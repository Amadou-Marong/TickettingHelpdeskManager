import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Card, CardTitle } from "./components/ui/Card"
import Dashboard from "./pages/Dashboard"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Login from "./pages/Login"
import Tickets from "./pages/Tickets"
import NavBar from "./components/Layout/NavBar"
import { AuthProvider } from "./contexts/AuthContext"
import { Toaster } from "./components/ui/Toaster"

const queryClient = new QueryClient();

const Layout = ({ children }) => {
  return (
    <>
    <NavBar />
      {/* <div className="flex min-h-screen"> */}
          <main>
              {children}
          </main>
      {/* </div> */}
    </>
  )
}

const AppContent = () => {
    return (
      <Router>
        <Routes>
          <Route 
            path="/"
            element={<Layout> <Dashboard /> </Layout>}
          />
          <Route 
            path="/tickets"
            element={<Layout> <Tickets /> </Layout>}
          />
          <Route 
            path="/login"
            element={<Login />}
          />
        </Routes>
      </Router>
    )
}

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
