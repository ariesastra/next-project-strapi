// Dependencies
import Link from 'next/link'
import {useContext} from 'react'

// Components
import Search from '@/components/Search'

// Context
import AuthContext from '@/context/AuthContext'

// Styles
import styleHeader from '@/styles/Header.module.scss'
import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'

function Header() {
  // for pull out data from Auth Context
  const {user, logout} = useContext(AuthContext)

  return (
    <header className={styleHeader.header}>
      <div className={styleHeader.logo}>
        <Link href="/">
          <a>DJ Events</a>
        </Link>
      </div>

      {/* Search Input */}
      <Search />
      
      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a>
                Events
              </a>
            </Link>
          </li>
          {
            user ? 
            // if logged in
            <>
              <li>
                <Link href='/events/add'>
                  <a>Add Event</a>
                </Link>
              </li>
              <li>
                <Link href='/account/dashboard'>
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <a onClick={() => logout()} className='btn-secondary btn-icon'>
                  <FaSignOutAlt /> Logout
                </a>
              </li>
            </> : 
            // if not logged in
            <>
              <li>
                <Link href='/account/login'>
                  <a className='btn-secondary btn-icon'>
                    <FaSignInAlt /> Login
                  </a>
                </Link>
              </li> 
            </>
          }
        </ul>
      </nav>
    </header>
  )
}

export default Header
