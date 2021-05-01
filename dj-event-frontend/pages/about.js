// Dependencies
import Head from 'next/head'
import Link from 'next/link'

// Components
import Layout from '@/components/Layout'

// Style

function About() {
  return (
    <Layout title='About DJ Events'>
      <h1>About</h1>
      <p>This is an app to find the latest DJ and other music events.</p>
      <p>Version: 1.0</p>
    </Layout>
  )
}

export default About
