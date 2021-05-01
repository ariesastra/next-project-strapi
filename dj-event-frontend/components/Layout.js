// Dependencies
import Head from 'next/head'

// Components
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Style
import layoutStyle from "styles/Layout.module.scss"

function Layout({title, keywords, description, children}) {
  
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description}/>
        <meta name='keywords' content={keywords}/>
      </Head>
      {/* Header Components */}
      <Header />
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
