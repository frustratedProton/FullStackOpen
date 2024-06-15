/* eslint-disable react/prop-types */
const Notification = ({ message }) => {
  if (!message.trim()) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

export default Notification;