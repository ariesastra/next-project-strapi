// Dependencies
import cookie from 'cookie'
import {API_URL} from '@/config/index'

export default async (req, res) => {
  if (req.method === 'POST') {
    // Destroy a cookie
    res.setHeader('Set-Cookie', cookie.serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      expires: new Date(0), //set expires
      sameSite: 'strict',
      path: '/'
    }))

    res.status(200).json({message: 'Sucess Logout !'})
  }
  else{
    res.setHeader('Allow', ['POST'])
    res.status(405).json({
      message: `Method ${req.method} Not Allowed !`
    })
  }
}
