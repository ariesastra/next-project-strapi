// Dependencies
import {useState} from 'react'
import {useRouter} from 'next/router'

// Components

// Style
import styleSearch from '@/styles/Search.module.scss'

function Search() {
  const [term, setTerm] = useState('')
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/events/search?term=${term}`)
    setTerm('')
  }

  return (
    <div className={styleSearch.search}>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search Event"
        />
      </form>
    </div>
  )
}

export default Search
