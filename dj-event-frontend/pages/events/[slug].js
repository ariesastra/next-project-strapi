// Dependecies
import {useRouter} from 'next/router'
// Components
import Layout from '@/components/Layout'
// Style

function AddEvent() {
  const router = useRouter()

  return (
    <Layout>
      <h1>Add Event</h1>
      <button onClick={() => {
        router.push('/')
      }}>
        Redirect to Homepage
      </button>
    </Layout>
  )
}

export default AddEvent
