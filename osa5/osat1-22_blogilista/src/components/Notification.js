import React from 'react'

const errorStyle = {
  color: 'red',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const messageStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const Notification = props => {
  if (props.notification === null) {
    return null
  }

  if (props.error) {
    return (
      <div style={errorStyle}>
        {props.notification}
      </div>
    )
  }
  return (
    <div style={messageStyle}>
      {props.notification}
    </div>
  )
}

export default Notification
