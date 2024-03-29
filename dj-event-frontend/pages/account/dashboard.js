// Dependencies
import {parseCookie} from '@/helpers/index'
import { API_URL } from '@/config/index'
import {useRouter} from 'next/router'

// Components
import Layout from "@/components/Layout"
import DashboardEvent from '@/components/DashboardEvent'

// Style
import styled from 'styled-components'

const DashboardPage = ({events, token}) => {
  const router = useRouter()

  const deleteEvent = async (id) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.message)
      } else {
        router.reload()
      }
    }
  }
  // console.log(events);
  
  return (
    <Layout title='User Dashboard'>
      <Dash>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {/* Display each events */}
        {
          events.map((evt) => (
              <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent}/>
          ))
        }
      </Dash>
    </Layout>
  )
}

export default DashboardPage

export async function getServerSideProps({req}){
  const {token} = parseCookie(req)
  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    },
  })

  const events = await res.json()

  return {
    props: {
      events,
      token
    }
  }
}

const Dash = styled.div`
  h1{
    span{
      font-size: 20px;
      color: #777;
      margin-left: 10px;
    }
  }

  h3{
    font-size: 25px;
    color: red;
  }
`;