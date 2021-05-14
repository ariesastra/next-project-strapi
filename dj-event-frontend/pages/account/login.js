// Dependencies
import { ToastContainer, toast } from 'react-toastify'
import {useState, useEffect, useContext} from 'react'
import Link from 'next/link'

// Components
import Layout from '@/components/Layout'

// Context
import AuthContext from '@/context/AuthContext'

// Styles
import {FaUser} from 'react-icons/fa'
import styled from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'

function LoginPage() {
  // Pull user data from authcontext
  const {login, error} = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Fireup Error message
  useEffect(() => error && toast.error(error))
  
  const handleSubmit = (e) => {
    e.preventDefault()
    login({email, password});
  }

  return (
    <Layout title='User Login'>
      <Auth>
        <h1>
          <FaUser /> Log In
        </h1>
        
        {/* Info */}
        <ToastContainer />
        
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <AuthDiv>
            <AuthLabel htmlFor='email'>Email Address</AuthLabel>
            <AuthInputEmail 
              type='email' 
              id='email' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </AuthDiv>
          <AuthDiv>
            <AuthLabel htmlFor='password'>Password</AuthLabel>
            <AuthInputPass 
              type='password' 
              id='password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
          </AuthDiv>
          
          <input type="submit" value='Login' className='btn' />
        </form>
        <p>
          Dont Have an Account ? 
          <Link href='/account/register'> Register</Link>
        </p>
      </Auth>
    </Layout>
  )
}

export default LoginPage

const Auth = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 30px;
  box-shadow: 0px 10px 20px 0px rgba(50, 50, 50, 0.52);
`;

const AuthLabel = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const AuthInputText = styled.input.attrs({
  type:'text'
})`
  display: block;
  width: 100%;
  height: 40px;
  padding: 5px;
  font-size: 18px;
`;

const AuthInputEmail = styled.input.attrs({
  type:'email'
})`
  display: block;
  width: 100%;
  height: 40px;
  padding: 5px;
  font-size: 18px;
`;

const AuthInputPass = styled.input.attrs({
  type:'password'
})`
  display: block;
  width: 100%;
  height: 40px;
  padding: 5px;
  font-size: 18px;
`;

const AuthSubmit = styled.input.attrs({
  type:'submit'
})`
  margin-top: 20px;
  width: 100%;
  font-size: 17px;
`;

const AuthDiv = styled.div`
  margin-bottom: 20px;
`;