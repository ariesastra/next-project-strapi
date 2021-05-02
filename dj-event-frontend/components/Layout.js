// Dependencies
import Head from 'next/head'
import {useRouter} from 'next/router'

// Components
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Showcase from '@/components/Showcase'

// Style
import layoutStyle from "styles/Layout.module.scss"

function Layout({title, keywords, description, children}) {
  
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description}/>
        <meta name='keywords' content={keywords}/>
      </Head>
      {/* Header Components */}
      <Header />
      {/* Showcase */}
      {
        router.pathname === '/' && <Showcase />
      }
      {/* Children Components */}
      <div className={layoutStyle.container}>
        {children}    
      </div>
      {/* Footer Components */}
      <Footer />
    </div>
  )
}

// CREATE DEFAULT PROPS FOR EVERY PAGE
Layout.defaultProps = {
  title: 'DJ Events | Find the hottest parties',
  description: 'Find the latest DJ and Others',
  keywords: 'music, dj, edm, events'
}

export default Layout
