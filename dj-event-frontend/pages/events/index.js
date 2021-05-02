// Dependencies
import Link from 'next/link'
import {API_URL} from '@/config/index'

// Components
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'

// Style

export default function EventPage({events}) {
  
  return (
    <Layout>
      <h1>Events List</h1>
      {
        events.length === 0 && <h3>No Event to Show !</h3>
      }
      {
        events.map(evt => (
          <EventItem key={evt.id} evt={evt} />
        ))
      }
    </Layout>
  )
}

export async function getStaticProps({}) {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC`)
  const events = await res.json()

  return {
    props : {
      events
    },
    revalidate: 1,
  }
}