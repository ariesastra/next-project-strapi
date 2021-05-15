// Dependecies
import {ToastContainer, toast} from 'react-toastify'
import {useRouter} from 'next/router'
import {API_URL} from '@/config/index'
import Link from 'next/link'
import Image from 'next/image'

// Components
import Layout from '@/components/Layout'

// Style
import styleSingleEvent from '@/styles/Event.module.scss'
import 'react-toastify/dist/ReactToastify.css';

// Icons
import {FaPencilAlt, FaTimes} from 'react-icons/fa'

function AddEvent({evt}) {
  const router = useRouter()

  return (
    <Layout>
      <div className={styleSingleEvent.event}>
        <span>
          {new Date(evt.date).toLocaleDateString('ID')} at {evt.time}
          <h1>{evt.name}</h1>
          {/* Toastify */}
          <ToastContainer />

          {
            evt.image && (
              <div className={styleSingleEvent.image}>
                <Image
                  src={evt.image.formats.large.url}
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
  const res = await fetch(`${API_URL}/events`)
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
  const res = await fetch(`${API_URL}/events?slug=${slug}`)
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