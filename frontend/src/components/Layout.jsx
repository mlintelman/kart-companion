import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-red-500">
      <Navbar />

      <main className="flex-1 max-w-sm mx-auto w-full p-4 bg-gray-50 shadow-lg rounded-lg">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
