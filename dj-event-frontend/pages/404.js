// Dependencies
import Link from 'next/link'
import {FaExclamationTriangle} from 'react-icons/fa'

// Components
import Layout from '@/components/Layout'

// Style
import style404 from '@/styles/404.module.scss'

function NotFound() {
  return (
    <Layout title="Page Not Found !">
      <div className={style404.error}>
        <h1>
          404 <FaExclamationTriangle />
        </h1>
        <h4>Page Not Found !</h4>
        <Link href="/">
          Go Back Home
        </Link>
      </div>
    </Layout>
  )
}

export default NotFound
