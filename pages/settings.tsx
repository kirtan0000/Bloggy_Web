/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { Post, FormPost } from '../fetchWrapper'
import UserVerifyChecks from '../util/UserVerifyChecks'

export default function Settings () {
  const [username, setUsername] = useState('')
  const [password1, setPassword1] = useState('')
  const [pfpUrl, setPfpUrl] = useState('')

  useEffect(() => {
    async function getUserData () {
      const data = await UserVerifyChecks()
      setPfpUrl(data.user_pfp)
    }
    getUserData()
  }, [])

  const doPromptChange = () => {
    const email = prompt('Please enter your email')
    const password = prompt('Please enter your PASSWORD')
    if (email && password) {
      return [email, password]
    } else {
      return [null, null]
    }
  }

  // Change the user's name
  const changeUsername = async () => {
    if (!username) {
      alert('Please enter a new username.')
      return
    }

    const promptInfo = doPromptChange() // Make the prompt

    // If the user didn't input any data, run this function over and over until they do
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

  // Change the user's password
  const changePassword = async () => {
    if (!password1) {
      alert('Please enter a new password.')
      return
    }
    const promptInfo = doPromptChange() // Make the prompt

    // If the user didn't input any data, run this function over and over until they do
    if (promptInfo[0] === null || promptInfo[1] === null) {
      alert('Please enter an email and password.')
      changePassword()
      return
    }

    const email = promptInfo[0]
    const password = promptInfo[1]

    const change_password = await Post(
      'change-user-password',
      new URLSearchParams({ email, password, new_password: password1 })
    )

    if (!change_password.success) {
      alert(change_password.message)
      setPassword1('')
      return
    }
    setPassword1('')
    alert(
      `Successfully changed password!`
    )
  }

  const clickPfpInput = () => {
    const realPfpUpload = document.querySelector<HTMLElement>('#upload_new_pfp')
    if (realPfpUpload !== null) realPfpUpload?.click()
  }

  // Make a request to change the users profile picture
  const uploadNewPfp = async (event: any) => {
    const jwt_token = localStorage.getItem('jwt_token')
    const refresh_token = localStorage.getItem('refresh_token')

    const file = event?.target?.files[0]

    const fileName = file?.name
    const fileExtension = fileName
      ?.split('.')
      ?.pop()
      ?.toLowerCase()
    if (
      fileExtension !== 'png' &&
      fileExtension !== 'jpg' &&
      fileExtension !== 'jpeg'
    ) {
      alert('Please select a valid image file (png, jpg, and jpeg only).')
      event.target.value = null
      return
    }
    const post_form = await FormPost('upload-pfp', 'pfp', file)
    if (!post_form.success) {
      alert(post_form.message)
      event.target.value = null
      return
    }

    const image_id = post_form.id
    const change_data = await Post(
      'change-pfp',
      new URLSearchParams({ image_id, jwt_token, refresh_token })
    )

    if (change_data.needs_new_jwt === true)
      localStorage.setItem('jwt_token', change_data.jwt_token)

    setPfpUrl(change_data.url)

    event.target.value = null
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
      <div className='topnav-body topnav-shadow'>
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
        <div className='pfp-div'>
          <h2>Change Profile Picture</h2>
          <img
            src={pfpUrl}
            alt='Your Profile Picture'
            id='change-pfp-img'
            width={100}
            height={100}
          />
          <input
            style={{ display: 'none' }}
            type='file'
            name='pfp'
            id='upload_new_pfp'
            accept='.png,.jpeg,.jpg'
            onChange={uploadNewPfp}
          ></input>
          <button
            onClick={clickPfpInput}
            className='btn hover-button-pink'
            id='submit-photo-change'
          >
            Change Photo
          </button>
        </div>
        <div className='change-username-div'>
          <h2>Change User Name</h2>
          <input
            type='text'
            id='input-settings'
            onChange={e => setUsername(e.target.value)}
            value={username}
            placeholder='username123'
          />
          <button
            onClick={changeUsername}
            id='change-username-btn'
            className='btn hover-button-pink'
          >
            Change
          </button>
        </div>
        <div className='change-password-div'>
          <h2>Change Password</h2>
          <input
            type='password'
            id='input-settings'
            onChange={e => setPassword1(e.target.value)}
            value={password1}
            placeholder='SecurePassword123'
          />
          <button
            onClick={changePassword}
            id='change-password-btn'
            className='btn hover-button-pink'
          >
            Change
          </button>
        </div>
      </div>
    </>
  )
}
