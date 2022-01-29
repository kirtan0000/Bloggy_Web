import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { Post } from '../fetchWrapper'
import UserVerifyChecks from '../util/UserVerifyChecks'

export default function Home () {
  useEffect(() => {
    async function getUserData () {
      const data = await UserVerifyChecks()
    }
    getUserData()
  })

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
            href='https://cdn.jsdelivr.net/npm/@fire-ui/fire-ui@0.2.7/FireUI.min.css'
          />
          <script src='https://cdn.jsdelivr.net/npm/@fire-ui/fire-ui@0.2.7/FireUI.min.js' />
        </Head>
        <div className='topnav-body'>
          <div className='topnav'>
            <span className='topnav-brand'>Bloggy</span>
            <span className='topnav-hamburger-menu' data-target='bloggy-main'>
              &#x2630;
            </span>
            <div className='topnav-right' id='bloggy-main'>
              <a className='topnav-item' href='/settings'>
                Settings
              </a>
            </div>
          </div>
          <hr className='topnav-hr' />
        </div>
      </div>
    </>
  )
}
