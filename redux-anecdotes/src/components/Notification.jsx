import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state.notification)
  console.log(notification.show)
  const show = { display: notification.show ? '' : 'none' }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification.show ? 'block' : 'none'
  }
  return (
    <div  className='jjjh'> 
       <div style={style} >
      {notification.message}
    </div>
    </div>
   
  )
}

export default Notification