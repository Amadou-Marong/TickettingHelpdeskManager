import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Card, CardTitle } from "./components/ui/Card"
import Dashboard from "./pages/Dashboard"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Login from "./pages/Login"
import Tickets from "./pages/Tickets"
import NavBar from "./components/Layout/Navbar"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import { Toaster } from "./components/ui/Toaster"
import Sidebar from "./components/Layout/Sidebar"
import { Heading1 } from "lucide-react"
import { useState } from "react"
import TicketDetail from "./pages/TicketDetail"
import Unauthorized from "./pages/Unauthorized"
import NotFound from "./pages/NotFound"
import Index from "./pages/Index"
import CreateTicket from "./pages/CreateTicket"
import Reports from "./pages/Reports"
import KnowledgeBase from "./pages/KnowledgeBase"
import KnowledgeArticleDetail from "./pages/KnowledgeArticleDetail"
import KnowledgeCategoryDetail from "./pages/KnowledgeCategoryDetail"
import CreateArticle from "./pages/CreateArticle"
import ProtectedRoute from "./components/auth/ProtectedRoute"

const queryClient = new QueryClient();

const Layout = ({ children }) => {
  const { user } = useAuth();
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [collapsed, setCollapsed] = useState(false);
  

  return (
    <>
      <NavBar onToggle={setSidebarExpanded} collapsed={collapsed} setCollapsed={setCollapsed}/>
      <div className="flex min-h-screen">
          <Sidebar onToggle={setSidebarExpanded} collapsed={collapsed}/>
          <main className={`transition-all duration-300 flex-1 ${
          sidebarExpanded ? 'ml-20' : 'ml-50'}`}>
              {children}
          </main>
      </div>
    </>
  )
}

const AppContent = () => {
    return (
      <Router>
        <Routes>
          {/* Public routes */}
          {/* <Route path="/" element={<Index />} /> */}
          <Route path="/" element={<Index />}/>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/unauthorized" element={<Layout><Unauthorized /></Layout>} />


          {/* Protected Routes */}
          <Route 
            path="/dashboard"
            element={<Layout> <Dashboard /> </Layout>}
          />
          <Route 
            path="/tickets"
            element={<Layout> <Tickets /> </Layout>}
          />
          <Route 
            path="/tickets/:id"
            element={<Layout> <TicketDetail /> </Layout>}
          />
          <Route 
            path="/create-ticket"
            element={<Layout> <CreateTicket /> </Layout>}
          />
          <Route 
            path="/login"
            element={<Login />}
          />

          {/* Reports route */}
          <Route
            path="/reports"
            element={<Layout> <Reports /> </Layout>}
          />

          {/* Knowledge Base Routes */}
          <Route
            path="/knowledge"
            element={<Layout> <KnowledgeBase /> </Layout>}
          />

          <Route
            path="/knowledge/:id"
            element={<Layout> <KnowledgeArticleDetail /> </Layout>}
          />

          <Route
            path="/knowledge/category/:categoryId"
            element={<Layout> <KnowledgeCategoryDetail /> </Layout>}
          />

          <Route 
            path="/create-article" 
            element={
              <ProtectedRoute requiredPermission="create:knowledge">
                <Layout><CreateArticle /></Layout>
              </ProtectedRoute>
            } 
          />

          {/* Catch-all route */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
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
