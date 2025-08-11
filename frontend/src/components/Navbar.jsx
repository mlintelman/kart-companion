import { useState } from "react"
import { NavLink } from "react-router-dom"

const navItems = [
  { to: "/", label: "Home", img: "/images/home.png" },
  { to: "/grandprix", label: "Grand Prix", img: "/images/grandprix.png" },
  { to: "/knockout", label: "Knockout Tour", img: "/images/knockout.png" },
  { to: "/vs", label: "VS Race", img: "/images/vs.png" },
  { to: "/stats", label: "Stats", img: "/images/stats.png" },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="p-4">
      {/* Mobile header with hamburger */}
      <div className="flex justify-between items-center md:hidden">
        <div className="text-4xl font-bold text-gray-700">Kart Companion</div>
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
        {navItems.map(({ to, label, img }) => (
          <li key={to} className="mb-4 md:mb-0">
            <NavLink
              to={to}
              className="group flex flex-row md:flex-col items-center hover:bg-gray-200 focus:outline-none"
              onClick={() => setMenuOpen(false)} // close menu on mobile link click
            >
              <img src={img} alt={label} className="w-10 h-10 object-contain" />
              <span className="m-1 font-semibold text-l md:text-xs text-gray-700 opacity-100 transition-opacity">
                {label}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
