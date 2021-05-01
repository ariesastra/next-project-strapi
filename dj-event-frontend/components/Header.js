// Dependencies
import Link from 'next/link'

// Components

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

      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a>
                Events
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
