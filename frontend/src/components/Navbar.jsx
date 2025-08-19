import { useState } from "react"
import { NavLink } from "react-router-dom"

const navItems = [
  { to: "/", label: "Home" },
  { to: "/grandprix", label: "Grand Prix" },
  { to: "/knockout", label: "Knockout Tour" },
  { to: "/vs", label: "VS Race" },
  { to: "/stats", label: "Stats" },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="p-4 space-y-2">
      {/* Mobile header with hamburger */}
      <div className="flex justify-between items-center md:hidden">
        <div className="text-4xl font-bold text-gray-50">Kart Companion</div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="focus:outline-none"
        >
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-gray-800"></span>
            <span className="block w-6 h-0.5 bg-gray-800"></span>
            <span className="block w-6 h-0.5 bg-gray-800"></span>
          </div>
        </button>
      </div>

      {/* Nav links container */}
      <ul
        className={`md:flex md:space-x-6 md:justify-center ${
          menuOpen ? "block" : "hidden"
        } md:block`}
      >
        {navItems.map(({ to, label }) => (
          <li key={to} className="mb-4 md:mb-0">
            <NavLink
              to={to}
              className="group flex flex-row md:flex-col items-center hover:bg-red-600 md:p-4 rounded-2xl focus:outline-none"
              onClick={() => setMenuOpen(false)} // close menu on mobile link click
            >
              <span className="font-semibold text-gray-50 text-xl opacity-100 transition-opacity">
                {label}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
