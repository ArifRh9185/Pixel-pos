import { Link, useLocation } from 'react-router-dom'

const NavItem = ({ to, icon, label, showLabel }) => {
  const location = useLocation()
  const isActive = location.pathname.startsWith(to)

  return (
    <Link
      to={to}
      className={`flex items-center  gap-2 p-2 rounded transition-colors ${
        isActive
          ? 'border-r-4 border-green-600 bg-gradient-to-r from-white via-green-100/10 to-green-100/90 text-green-600 font-semibold'
          : 'hover:text-neutral-500 text-neutral-400'
      }`}
    >
      <span >{icon}</span>
      {showLabel && <span>{label}</span>}
    </Link>
  )
}

export default NavItem
