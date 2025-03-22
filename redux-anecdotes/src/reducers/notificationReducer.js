import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "", show: false };
const notificattionSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createAnecdoteNotification: (state, action) => {
      state = { message: action.payload, show: true };
      return state;
    },
    voteAnecdoteNotification: (state, action) => {
      state = { message: action.payload, show: true };
      return state;
    },
    deleteAnecdoteNotification: (state, action) => {
      state = { message: "", show: false };
      return state;
    },
  },
});

export const {
  deleteAnecdoteNotification,
  createAnecdoteNotification,
  voteAnecdoteNotification,
} = notificattionSlice.actions;

export const setNotification = (msg,time) => {
  return async (dispatch) => {
    dispatch(createAnecdoteNotification(msg, time*1000));
   await  setTimeout(() => {
      dispatch(deleteAnecdoteNotification());
    }, 5000);
  };
};
export default notificattionSlice.reducer;
