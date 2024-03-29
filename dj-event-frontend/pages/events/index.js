// Dependencies
import {API_URL, PER_PAGE} from '@/config/index'

// Components
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import Pagination from '@/components/Pagination'

// Style

export default function EventPage({events, page, total}) {
  
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
      
      {/* For Paginatin */}
      <Pagination page={page} total={total} />
    </Layout>
  )
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate Start Page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

  // Fetch events
  const eventRes = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`)
  const events = await eventRes.json()

  // Fetch Total Events
  const totalRes = await fetch(`${API_URL}/events/count`)
  const total = await totalRes.json()

  return {
    props : {
      events,
      page: +page,
      total
    }
  }
}