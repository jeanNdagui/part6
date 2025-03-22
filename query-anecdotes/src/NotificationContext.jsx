import { createContext, useReducer } from "react";

// On utilise le contexte et le reducer h
         
const notificationReducer = (state, action) => { 
  switch (action.type) {
    case "CREATE":{
      if(action.message.length >= 5) return `You created "${action.message}" .`;
     return `too short anecdote, must have length 5 or more.`;
    }   
    case "VOTE":
      return action.message;
    default:
      return state;
  }
};

const notificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    "init"
  );

  return (
    <notificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </notificationContext.Provider>
  );
};

export default notificationContext;
