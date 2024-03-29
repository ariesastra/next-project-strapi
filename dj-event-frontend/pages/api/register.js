// Dependencies
import cookie from 'cookie'
import {
  API_URL
} from '@/config/index'

export default async (req, res) => {
  if (req.method === 'POST') {
    const {
      username,
      password,
      email 
    } = req.body

    // Authentication from Strapi
    const strapiRes = await fetch(`${API_URL}/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
        email
      })
    })

    const data = await strapiRes.json()

    if (strapiRes.ok) {
      // @todo - Set Cookie
      // Set a new cookie with the name
      res.setHeader('Set-Cookie', cookie.serialize('token', data.jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 7, //A week age of cookie
        sameSite: 'strict',
        path: '/'
      }))

      res.status(200).json({
        user: data.user
      })
    } else {
      res.status(data.statusCode).json({
        message: data.message[0].messages[0].message
      })
    }

  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({
      message: `Method ${req.method} not Allowed !`
    })
  }
}