import { useState } from 'react'
import NavItem from './NavItem'
import { Menu, X } from 'lucide-react'
import { TbMenu4 } from "react-icons/tb"
import { LuNotepadText, LuHistory } from "react-icons/lu"
import { RiFileList3Line } from "react-icons/ri"
import { MdManageSearch } from "react-icons/md"
import { FiHelpCircle } from "react-icons/fi"
import SignOutButton from './SignOutButton'
import logo from '../assets/logo.jpg' 
const NavbarNav = () => {
  const [open, setOpen] = useState(false)


  const mainMenu = [
    { to: '/products', icon: <TbMenu4 />, label: 'Product' },
    { to: '/checkout', icon: <LuNotepadText />, label: 'Order List' },
    { to: '/history', icon: <LuHistory />, label: 'History' },
    { to: '/bills', icon: <RiFileList3Line />, label: 'Bills' },
  ]

  const settingMenu = [
    { to: '/settings', icon: <MdManageSearch />, label: 'Report' },
    { to: '/help', icon: <FiHelpCircle />, label: 'Help Center' },
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
        {/* Hamburger Button */}
        <div className="flex flex-col h-full justify-between py-9 pl-5 font-monstserrat">
          <div>
            <div className="text-xl pb-6 pl-6 text-neutral-800 font-bold mb-6 flex gap-2">
              <img src={logo} alt="logo" width={24} height={24}className='rounded-full'/>
              Pixel Pos</div>

            <nav className="flex flex-col gap-2 my-4">
              {mainMenu.map((item) => (
                <NavItem key={item.to} {...item} showLabel={true}/>
              ))}
            </nav>

            <hr className="text-neutral-100 mr-6" />

            <nav className="flex flex-col gap-2 my-4">
              {settingMenu.map((item) => (
                <NavItem key={item.to} {...item} showLabel={true}/>
              ))}
            </nav>
          </div>
          <div className='pr-4'>
            <SignOutButton title={'Sign Out'}/>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default NavbarNav
