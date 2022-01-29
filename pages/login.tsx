import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import { Post } from '../fetchWrapper'
import Router from 'next/router'

export default function Login () {
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (
      localStorage.getItem('jwt_token') &&
      localStorage.getItem('refresh_token')
    )
      Router.push('..')
  })

  const doLogin = async () => {
    if (!email || !password) {
      setError('Please enter an email and password.')
      return
    }

    const login_user = await Post(
      'login',
      new URLSearchParams({ email, password })
    )

    if (!login_user.success) {
      setError(login_user.message)
      return
    }
    localStorage.setItem('jwt_token', login_user.data.jwt_token)
    localStorage.setItem('refresh_token', login_user.data.refresh_token)
    Router.push('..')
  }

  return (
    <div>
      <Head>
        <title>Bloggy - Login</title>
        <meta name='description' content='Login to Bloggy.' />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdn.jsdelivr.net/npm/@fire-ui/fire-ui@0.2.7/FireUI.min.css'
        />
        <script src='https://cdn.jsdelivr.net/npm/@fire-ui/fire-ui@0.2.7/FireUI.min.js'></script>
      </Head>

      <div className='box'>
        <h1 className='top-text-auth'>Login</h1>
        <h3 className='desc-text-auth'>to Bloggy</h3>
        <div className='form-group'>
          <p className='form-label'>Email address:</p>
          <input
            type='email'
            placeholder='Your Email Goes Here...'
            className='user-input form-control'
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className='form-group'>
          <p className='form-label'>Password:</p>
          <input
            type='password'
            placeholder='Your Password Goes Here...'
            className='user-input form-control'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <p style={{ marginLeft: 15 }} className='error-auth-text'>
          {error}
        </p>
        <p style={{ marginLeft: 15 }}>
          Don&#39;t have an account?{' '}
          <a style={{ color: 'blue' }} href='/create-account'>
            Make one here
          </a>
        </p>
        <div className='form-group'>
          <input
            type='submit'
            onClick={doLogin}
            className='btn form-control theme-adjust/= btn-green-outline'
            value='Login!'
          />
        </div>
      </div>
    </div>
  )
}
