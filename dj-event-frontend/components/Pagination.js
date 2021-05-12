// Dependencies
import Link from 'next/link'
import {PER_PAGE} from '@/config/index'

// Components

// Styles

function Pagination({page, total}) {
  const lastPage = Math.ceil(total/PER_PAGE)
  
  return (
    <>
      {/* Previus Page of Pagination */}
      {
        page > 1 
        && (
          <Link href={`/events?page=${page - 1}`}>
            <a className='btn-secondary'>Prev</a>
          </Link>
        )
      }
      {/* Next Page of Pagination */}
      {
        page < lastPage 
        && (
          <Link href={`/events?page=${page + 1}`}>
            <a className='btn-secondary'>Next</a>
          </Link>
        )
      }
    </>
  )
}

export default Pagination
