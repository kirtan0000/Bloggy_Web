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
  const [pfpUrl, setPfpUrl] = useState('')

  useEffect(() => {
    async function getUserData () {
      const data = await UserVerifyChecks()
      setPfpUrl(data.user_pfp)
    }
    getUserData()
  })

  const doPromptUsernameChange = () => {
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

    const promptInfo = doPromptUsernameChange() // Make the prompt

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

  const clickPfpInput = () => {
    const realPfpUpload = document.querySelector<HTMLElement>('#upload_new_pfp')
    if (realPfpUpload !== null) realPfpUpload?.click()
  }

  // Make a request to change the users profile picture
  const uploadNewPfp = async (event: any) => {
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
      return
    }
    const post_form = await FormPost('upload-pfp', 'pfp', file)
    if (!post_form.success) {
      alert(post_form.message)
      return
    }
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
      </div>
    </>
  )
}
