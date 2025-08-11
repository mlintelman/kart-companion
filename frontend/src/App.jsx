import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import VS from "./pages/VS";
import Knockout from "./pages/Knockout";
import GrandPrix from "./pages/GrandPrix";
import Stats from "./pages/Stats";
import TestApi from "./pages/TestApi";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/vs" element={<VS />} />
          <Route path="/knockout" element={<Knockout />} />
          <Route path="/grandprix" element={<GrandPrix />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/testapi" element={<TestApi/>} />
        </Route>
      </Routes>
    </Router>
  );
}
