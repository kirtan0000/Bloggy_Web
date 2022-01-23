/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { Post } from '../fetchWrapper'

export default function Home () {
  useEffect(() => {
    async function UserVerifyChecks () {
      // All of the checks to verify the user
      // Send user to login screen if not logged in
      let jwt_token = localStorage.getItem('jwt_token')
      let refresh_token = localStorage.getItem('refresh_token')

      if (jwt_token == undefined || refresh_token == undefined) {
        Router.push('./create-account')
        return
      }

      // Get user info (and if user has invalid tokens, send them to login and remove their tokens from localStorage)
      const UserData = await Post(
        'get-my-info',
        new URLSearchParams({ jwt_token, refresh_token })
      )

      if (UserData.success == false) {
        if (UserData.message == 'User Not Found!') {
          alert("User Doesn't Exist...")
        }
        localStorage.removeItem('jwt_token')
        localStorage.removeItem('refresh_token')
        Router.push('./create-account')
        return
      }
    }
    UserVerifyChecks()
  }, [])

  return (
    <>
      <div>
        <Head>
          <title>Bloggy - A futuristic blog system!</title>
          <meta
            name='description'
            content='Bloggy is an amazing blog system!'
          />
          <link rel='icon' href='/favicon.ico' />
          <link
            rel='stylesheet'
            type='text/css'
            href='/static/css/fireui.min.css'
          />
          <script src='https://cdn.jsdelivr.net/npm/@fire-ui/fire-ui@0.2.7/FireUI.min.js' />
        </Head>
        <h1>Horay!</h1>
      </div>
    </>
  )
}
