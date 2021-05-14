import {createContext, useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {WEB_URL} from '@/config/index'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const router = useRouter()

  // First bite of browser
  useEffect(() => checkUserLoggedIn(), [])

  // Register User
  const register = async (user) => {
    const res = await fetch(`${WEB_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(user)
    })

    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
      router.push('/account/dashboard')
    }
    else{
      setError(data.message)
      setError(null)
    }
  }

  // Login User
  const login = async ({email: identifier , password}) => {
    const res = await fetch(`${WEB_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify({
        identifier, 
        password
      })
    })

    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
      router.push('/account/dashboard')
    }
    else{
      setError(data.message)
      setError(null)
    }
  }

  // Logout User
  const logout = async () => {
    const res = await fetch(`${WEB_URL}/api/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      }
    })

    const data = await res.json()

    if (res.ok) {
      setUser(null)
      router.push('/')
    } else {
      setError(data.message)
      setError(null)
    }
  }

  // Check if user is logged in
  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`${WEB_URL}/api/user`)
    const data = await res.json()

    if(res.ok){
      setUser(data.user)
    }
    else{
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{user, error, register, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext