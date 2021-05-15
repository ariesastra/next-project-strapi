// Dependencies
import {ToastContainer, toast} from 'react-toastify'
import {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {API_URL} from '@/config/index'
import {parseCookie} from '@/helpers/index'

//Components
import Layout from '@/components/Layout'

// Styles
import styleForm from '@/styles/Form.module.scss'
import 'react-toastify/dist/ReactToastify.css';

function Add({token}) {
  const [values, setValues] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
  })

  const router = useRouter()

  const handleSubmit = async(e) => {
    e.preventDefault()

    const hasEmptyField = Object.values(values).some(
      (element) => element === ''
    )

    if (hasEmptyField) {
      toast.error('Please Fill All Fields')
    }

    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/JSON',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(values)
    })

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.warning('No Token Included !')
        return
      }
      toast.error('Somthing Went Wrong !')
    }
    else{
      const evt = await res.json()
      router.push(`/events/${evt.slug}`)
    }
  }
  
  const handleInputChange = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]: value})
  }

  return (
    <Layout title='Add New Event'>
      {/* back to events */}
      <Link href='/events'>
        <a>
          Go Back
        </a>
      </Link>

      <h1>Add Event</h1>

      {/* Error Message with Toastify */}
      <ToastContainer />

      <form onSubmit={handleSubmit} className={styleForm.form}>
        <div className={styleForm.grid}>
          <div>
            <label htmlFor='name'>Event Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='performers'>Performers</label>
            <input
              type='text'
              name='performers'
              id='performers'
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='venue'>Venue</label>
            <input
              type='text'
              name='venue'
              id='venue'
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              name='address'
              id='address'
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='date'>Date</label>
            <input
              type='date'
              name='date'
              id='date'
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='time'>Time</label>
            <input
              type='text'
              name='time'
              id='time'
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor='description'>Event Description</label>
          <textarea
            type='text'
            name='description'
            id='description'
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type='submit' value='Add Event' className='btn' />
      </form>
    </Layout>
  )
}

export default Add

export async function getServerSideProps({req}){
  const {token} = parseCookie(req)

  return{
    props: {
      token
    }
  }
}