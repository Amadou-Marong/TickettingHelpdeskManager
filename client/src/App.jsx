import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Card, CardTitle } from "./components/ui/Card"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Tickets from "./pages/Tickets"
import NavBar from "./components/Layout/NavBar"


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
      <div>
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
