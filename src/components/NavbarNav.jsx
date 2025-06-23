import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { TbMenu4 } from "react-icons/tb"
import { LuNotepadText, LuHistory } from "react-icons/lu"
import { RiFileList3Line } from "react-icons/ri"
import { MdManageSearch } from "react-icons/md"
import { FiHelpCircle } from "react-icons/fi"
import SignOutButton from './SignOutButton'
import logo from '../assets/logo.jpg' 

const NavbarNav = ({ setPage, currentPage, receiptData }) => {
  const [open, setOpen] = useState(false)

  const mainMenu = [
    { key: 'products', icon: <TbMenu4 />, label: 'Product' },
    { key: 'OrderList', icon: <LuNotepadText />, label: 'Order List', badge: receiptData?.length || 0,
 },
    { key: 'history', icon: <LuHistory />, label: 'History' },
    { key: 'bills', icon: <RiFileList3Line />, label: 'Bills' },
  ]

  const settingMenu = [
    { key: 'settings', icon: <MdManageSearch />, label: 'Report' },
    { key: 'help', icon: <FiHelpCircle />, label: 'Help Center' },
  ]

  return (
    
    <div className={`sticky top-0 h-screen z-20 pointer-events-auto`}>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-6 left-4 z-50 bg-white p-2 rounded shadow transition-transform duration-300 ease-in-out"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen min-w-55 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}
      >
        <div className="flex flex-col h-full justify-between py-9 pl-5 font-monstserrat">
          <div>
            <div className="text-xl pb-6 pl-6 text-neutral-800 font-bold mb-6 flex gap-2">
              <img src={logo} alt="logo" width={24} height={24} className="rounded-full" />
              Pixel Pos
            </div>

            <nav className="flex flex-col gap-2 my-4 font-monstserrat">
              {mainMenu.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setPage(item.key)}
                  className={`flex items-center text-green-600 gap-3 px-4 py-2 rounded hover:bg-gray-100 text-left w-full ${
                    currentPage === item.key ? 'border-r-4 border-green-600 bg-gradient-to-r from-white via-green-100/10 to-green-100/90 text-green-600 font-semibold' : 'hover:text-neutral-500 text-neutral-500'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {item.icon}
                    {item.label}
                  </span>
                  {item.key === 'OrderList' && item.badge > 0 && (
                    <span className="absolute right-5 bg-red-400 text-white text-xs font-normal px-2 py-0.5 rounded-full">
                      {item.badge > 99 ? '99+' : item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            <hr className="text-neutral-100 mr-6" />

            <nav className="flex flex-col gap-2 my-4">
              {settingMenu.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setPage(item.key)}
                  className={`flex items-center text-green-600 gap-3 px-4 py-2 rounded hover:bg-gray-100 text-left w-full ${
                    currentPage === item.key ? 'border-r-4 border-green-600 bg-gradient-to-r from-white via-green-100/10 to-green-100/90 text-green-600 font-semibold' : 'hover:text-neutral-500 text-neutral-500'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="pr-4">
            <SignOutButton title={'Sign Out'} />
          </div>
        </div>
      </aside>
    </div>
  )
}

export default NavbarNav
