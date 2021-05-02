// Dependencies
import Link from 'next/link'

// Components
import Search from '@/components/Search'

// Styles
import styleHeader from '@/styles/Header.module.scss'

function Header() {
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
          <li>
            <Link href='/events/add'>
              <a>Add Event</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
