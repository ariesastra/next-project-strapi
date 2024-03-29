// Dependencies
import {ToastContainer, toast} from 'react-toastify'
import {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {API_URL} from '@/config/index'
import moment from 'moment'
import Image from 'next/image'
import {parseCookie} from '@/helpers/index'

//Components
import Layout from '@/components/Layout'
import MyModal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'

// Styles
import styleForm from '@/styles/Form.module.scss'
import 'react-toastify/dist/ReactToastify.css';

// Icons
import {FaImage} from 'react-icons/fa'

function EditEventsPage({evt, token}) {
  const [values, setValues] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  })

  const [imagePreview, setImagePreview] = useState(evt.image ? evt.image.formats.large.url : null)

  const [showModal, setShowModal] = useState(false)

  const router = useRouter()

  const handleSubmit = async(e) => {
    e.preventDefault()

    const hasEmptyField = Object.values(values).some(
      (element) => element === ''
    )

    if (hasEmptyField) {
      toast.error('Please Fill All Fields')
    }

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/JSON',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(values)
    })

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        toast.warning('No Authentication !')
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

  /*
    GET THE LATES IMAGE, 
    SET THE PREVIEW TO NEW UPLOADED IMAGE THUMBNAIL
    AND MAKE ANOTHER REQUEST.
  */
  const imageUploaded = async (e) => {
    // Get new data from events
    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/JSON',
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await res.json()
    
    // set new image url to image preview
    setImagePreview(data.image.formats.large.url)
    
    // close modal
    setShowModal(false)
  }

  return (
    <Layout title='Add New Event'>
      {/* back to events */}
      <Link href='/events'>
        <a>
          Go Back
        </a>
      </Link>

      <h1>Edit Event</h1>

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
              value={moment(values.date).format('yyyy-MM-DD')}
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

        <input type='submit' value='Update Event' className='btn' />
      </form>

      <h2>Event Image</h2>
      {
        imagePreview ? (
          <Image 
            src={imagePreview}
            width={960}
            height={600}
          />
        ) : (
          <div>
            <p>No Image Uploaded !</p>
          </div>
        )

      }

      <div>
        <button 
          className="btn-secondary"
          onClick={() => setShowModal(true)}
        >
          <FaImage /> Set Image
        </button>
      </div>

      <MyModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title='Image Upload'
      >
        <ImageUpload 
          evtId={evt.id}
          imageUploaded={imageUploaded}
          token={token}
        />
      </MyModal>
    </Layout>
  )
}

export default EditEventsPage

export async function getServerSideProps({
  params: {
    id
  }, 
  req
}) {
  const res = await fetch(`${API_URL}/events/${id}`)
  const evt = await res.json()
  const {token} = parseCookie(req)
  
  return {
    props: {
      evt,
      token
    }
  }
}