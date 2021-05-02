// Dependecies
import {useRouter} from 'next/router'
import {API_URL} from '@/config/index'
import Link from 'next/link'
import Image from 'next/image'

// Components
import Layout from '@/components/Layout'

// Style
import styleSingleEvent from '@/styles/Event.module.scss'

// Icons
import {FaPencilAlt, FaTimes} from 'react-icons/fa'

function AddEvent({evt}) {
  const router = useRouter()

  const deleteEvent = (e) => {
    console.log('delete');
  }

  return (
    <Layout>
      <div className={styleSingleEvent.event}>
        <div className={styleSingleEvent.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" 
            className={styleSingleEvent.delete}
            onClick={deleteEvent}
          >
            <FaTimes /> Delete Event
          </a>
        </div>
        <span>
          {evt.date} at {evt.time}
          <h1>{evt.name}</h1>
          {
            evt.image && (
              <div className={styleSingleEvent.image}>
                <Image
                  src={evt.image}
                  width={960}
                  height={600}
                />
              </div>
            )
          }
          <h3>Perfromers :</h3>
          <p>{evt.performers}</p>
          <h3>Description :</h3>
          <p>{evt.description}</p>
          <h3>Venue :</h3>
          <p>{evt.address}</p>

          <Link href='/events'>
            <a className={styleSingleEvent.back}>
              {'<'} Go Back
            </a>
          </Link>
        </span>
      </div>
    </Layout>
  )
}

export default AddEvent

export async function getStaticPaths(){
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()
  
  const paths = events.map(evt => ({
    params: {slug: evt.slug}
  }))

  return{
    paths,
    fallback: true, 
  }
}

export async function getStaticProps({params: {slug}}){
  const res = await fetch(`${API_URL}/api/events/${slug}`)
  const evetns = await res.json()

  return{
    props: {
      evt: evetns[0]
    },
    revalidate: 1,
  }
}

// GET SERVERSIDE PROPS
// export async function getServerSideProps({query: {slug}}){
//   const res = await fetch(`${API_URL}/api/events/${slug}`)
//   const evetns = await res.json()

//   return{
//     props: {
//       evt: evetns[0]
//     },
//   }
// }