import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { Post } from '../fetchWrapper'

// The checks to verify that a user exists and has valid tokens

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

export default UserVerifyChecks
