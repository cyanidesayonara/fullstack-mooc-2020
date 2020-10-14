import React from 'react'

const LoginInfo = ({ user, logout }) => {
  return (
    <div>
      <p>{user.name} logged in
        <button onClick={logout}>
          logout
        </button>
      </p>
    </div>
  )
}

export default LoginInfo
