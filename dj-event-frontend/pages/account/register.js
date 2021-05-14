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

function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  // pull data from authcontext
  const {register, error} = useContext(AuthContext)

  useEffect(() => error && toast.error(error))
  
  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== passwordConfirm) {
      toast.error('Password did not match !')
      return
    }

    register({username, email, password});
  }

  return (
    <Layout title='User Registration'>
      <Auth>
        <h1>
          <FaUser /> Register
        </h1>
        
        {/* Info */}
        <ToastContainer />
        
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <AuthDiv>
            <AuthLabel htmlFor='username'>Username</AuthLabel>
            <AuthInputText 
              type='text' 
              id='username' 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
            />
          </AuthDiv>
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
          <AuthDiv>
            <AuthLabel htmlFor='passwordConfrim'>Confirm Password</AuthLabel>
            <AuthInputPass 
              type='password' 
              id='passwordConfirm' 
              value={passwordConfirm} 
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </AuthDiv>
          
          <input type="submit" value='Register' className='btn' />
        </form>
        <p>
          Already Have an Account ? 
          <Link href='/account/login'> Log In Page</Link>
        </p>
      </Auth>
    </Layout>
  )
}

export default RegisterPage

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