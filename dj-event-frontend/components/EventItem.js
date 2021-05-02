// Dependencies
import Link from 'next/link'
import Image from 'next/image'

// Components

// Style
import styleEventItem from '@/styles/EventItem.module.scss'

function EventItem({evt}) {
  return (
    <div className={styleEventItem.event}>
      <div className={styleEventItem.img}>
        <Image 
          src={evt.image ? evt.image.formats.thumbnail.url : '/images/event-default.png'}
          width={170}
          height={100}
        />
      </div>
      <div className={styleEventItem.info}>
        <span>
          {new Date(evt.date).toLocaleDateString('id')} at {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>
      <div className={styleEventItem.link}>
        <Link href={`/events/${evt.slug}`}>
          <a className='btn'>Details</a>
        </Link>
      </div>
    </div>
  )
}

export default EventItem
