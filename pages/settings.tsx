import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { Post } from '../fetchWrapper'
import UserVerifyChecks from '../util/UserVerifyChecks'

export default function Settings () {
  const [username, setUsername] = useState('')

  useEffect(() => {
    UserVerifyChecks()
  }, [])

  const doPromptUsernameChange = () => {
    const email = prompt('Please enter your email')
    const password = prompt('Please enter your PASSWORD')
    if (email && password) {
      return [email, password]
    } else {
      return [null, null]
    }
  }

  const changeUsername = async () => {
    if (!username) {
      alert('Please enter a new username.')
      return
    }

    const promptInfo = doPromptUsernameChange()

    if (promptInfo[0] === null || promptInfo[1] === null) {
      alert('Please enter an email and password.')
      changeUsername()
      return
    }

    const email = promptInfo[0]
    const password = promptInfo[1]

    const change_name = await Post(
      'change-username',
      new URLSearchParams({ email, password, new_username: username })
    )

    if (!change_name.success) {
      alert(change_name.message)
      setUsername('')
      return
    }

    setUsername('')
    alert(
      `Successfully changed username to '${username}'. (You must now wait 1 week to change it again)`
    )
  }

  return (
    <>
      <Head>
        <title>Bloggy - Settings Page</title>
        <meta name='description' content='Configure your Bloggy account.' />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdn.jsdelivr.net/npm/@fire-ui/fire-ui@0.2.7/FireUI.min.css'
        />
        <script src='https://cdn.jsdelivr.net/npm/@fire-ui/fire-ui@0.2.7/FireUI.min.js' />
      </Head>
      <div className='topnav-body'>
        <div className='topnav'>
          <span className='topnav-brand'>Settings</span>
          <span className='topnav-hamburger-menu' data-target='bloggy-settings'>
            &#x2630;
          </span>
          <div className='topnav-right' id='bloggy-settings'></div>
        </div>
        <hr className='topnav-hr' />
      </div>
      <div className='center' style={{ marginTop: 50, fontSize: 20 }}>
        <h2>Change User Name</h2>
        <input
          type='text'
          className='input-settings'
          onChange={e => setUsername(e.target.value)}
          value={username}
          placeholder='username123'
        />
        <button onClick={changeUsername} className='btn submit-btn'>
          Change
        </button>
      </div>
    </>
  )
}