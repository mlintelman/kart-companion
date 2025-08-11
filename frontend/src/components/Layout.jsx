import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full p-4 bg-white shadow-lg rounded-lg">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
