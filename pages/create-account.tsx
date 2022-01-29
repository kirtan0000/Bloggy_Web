import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import { Post } from '../fetchWrapper'
import Router from 'next/router'

export default function CreateAccount () {
  const [error, setError] = useState('')
  const [errorColor, setErrorColor] = useState('red')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (
      localStorage.getItem('jwt_token') &&
      localStorage.getItem('refresh_token')
    )
      Router.push('..')
  })

  const clearInputs = () => {
    setUsername('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  const doSignUp = async () => {
    if (!email || !password || !confirmPassword || !username) {
      setError('Please enter an email, password, and username.')
      setErrorColor('red')
      setSuccess(false)
      return
    }
    if (password !== confirmPassword) {
      setError(
        'Your password and confirm password are not matching. Please double check spelling and capitalization.'
      )
      setErrorColor('red')
      setSuccess(false)
      return
    }
    const create_user = await Post(
      'create-user',
      new URLSearchParams({ email, password, username })
    )
    if (!create_user.success) {
      setError(create_user.message)
      setErrorColor('red')
      setSuccess(false)
      return
    }

    setErrorColor('green')
    setError(
      `Thank you for creating an account. Please check your email to verify it. Once you're done, login `
    )
    setSuccess(true)
    clearInputs()
  }

  return (
    <div>
      <Head>
        <title>Bloggy - Create Account</title>
        <meta name='description' content='Create an Account on Bloggy.' />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdn.jsdelivr.net/npm/@fire-ui/fire-ui@0.2.7/FireUI.min.css'
        />
        <script src='https://cdn.jsdelivr.net/npm/@fire-ui/fire-ui@0.2.7/FireUI.min.js'></script>
      </Head>

      <div className='box'>
        <h1 className='top-text-auth'>Create Account</h1>
        <h3 className='desc-text-auth'>on Bloggy</h3>

        <div className='form-group'>
          <p className='form-label'>Username</p>
          <input
            placeholder='Your Username Goes Here...'
            className='user-input form-control'
            onChange={e => setUsername(e.target.value)}
            value={username}
          />
        </div>

        <div className='form-group'>
          <p className='form-label'>Email</p>
          <input
            type='email'
            placeholder='Your Email Goes Here...'
            className='user-input form-control'
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className='form-group'>
          <p> Password </p>
          <input
            placeholder='Your Password Goes Here...'
            className='user-input form-control'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <p> Confirm Password </p>
          <input
            placeholder='Confirm Your Password Here...'
            className='user-input form-control'
            type='password'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>

        <p style={{ color: errorColor, marginLeft: 15 }}>
          {error}
          <a href='/login'>{success ? 'here.' : ''}</a>
        </p>

        <p style={{ marginLeft: 15 }}>
          Already have an account?{' '}
          <a style={{ color: 'blue' }} href='/login'>
            Login here
          </a>
        </p>

        <div className='form-group'>
          <input
            type='submit'
            onClick={doSignUp}
            className='btn form-control theme-adjust/= btn-green-outline'
            value='Create Account!'
          />
        </div>
      </div>
    </div>
  )
}
