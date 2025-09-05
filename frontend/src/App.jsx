import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import VS from "./pages/VS"
import Knockout from "./pages/Knockout"
import GrandPrix from "./pages/GrandPrix"
import Stats from "./pages/Stats"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import ConfirmEmail from "./pages/ConfirmEmail"
import CreateProfile from "./pages/CreateProfile"

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/confirm-email" element={<ConfirmEmail/>}/>
        <Route path="/create-profile" element={<CreateProfile/>}/>
        
        <Route path="/" element={<Layout/>}>
          <Route index element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path="/vs" element={<ProtectedRoute><VS/></ProtectedRoute>} />
          <Route path="/knockout" element={<ProtectedRoute><Knockout/></ProtectedRoute>} />
          <Route path="/grandprix" element={<ProtectedRoute><GrandPrix/></ProtectedRoute>} />
          <Route path="/stats" element={<ProtectedRoute><Stats/></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  )
}
