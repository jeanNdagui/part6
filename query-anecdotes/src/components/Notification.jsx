import { useContext } from "react";
import notificationContext from "../NotificationContext";

const Notification = () => {
  const [notification, notificationDispatch] = useContext(notificationContext);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };
console.log('msg',notification)
  if (!notification) return null;

  return <div style={style}>{notification}</div>;
};

export default Notification;
