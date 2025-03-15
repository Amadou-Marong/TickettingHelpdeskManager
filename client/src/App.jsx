import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Card, CardTitle } from "./components/ui/Card"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Tickets from "./pages/Tickets"


const AppContent = () => {
    return (
      <div>
        <Routes>
          <Route 
            path="/"
            element={<Dashboard />}
          />
          <Route 
            path="/tickets"
            element={<Tickets />}
          />
          <Route 
            path="/login"
            element={<Login />}
          />
        </Routes>
      </div>
    )
}

function App() {

  return (
    <Router>
        <AppContent />
    </Router>
  )
}

export default App
