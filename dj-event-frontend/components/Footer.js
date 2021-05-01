// Dependencies
import Link from 'next/link'

// Styles
import styleFooter from 'styles/Footer.module.scss'

function Footer() {
  return (
    <footer className={styleFooter.footer}>
      <p>
        Copyright &copy; DJ Events 2021
      </p>
      <p>
        <Link href='/about'>
          <a>About Page</a>
        </Link>
      </p>
    </footer>
  )
}

export default Footer
