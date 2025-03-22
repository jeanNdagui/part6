import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteR: (state, action) => {
      const anecdoteToVote = action.payload;
      return state
        .map((a) => (a.id !== anecdoteToVote.id ? a : anecdoteToVote))
        .sort((a, b) => b.votes - a.votes);
    },
    appendAnecdote(state, action) {
     return state.concat(action.payload).sort((a, b) => b.votes - a.votes);
    },
    setAnecdotes: (state, action) => {
      return action.payload.sort((a, b) => b.votes - a.votes)
    },
  },
});

export const { voteR, setAnecdotes, appendAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const response = await anecdoteService.getAll();
    dispatch(setAnecdotes(response));
  };
};

// createur de fonction thunk
export const createAnecdote = (anecdote) => {
  // fonction thunk
  return async (dispatch) => {
    const response = await anecdoteService.create(anecdote);
    dispatch(appendAnecdote(response));
  };
};

export const vote = (id, object) => {
  return async (dispatch) => {
    const response = await anecdoteService.update(id, object);
    dispatch(voteR(response));
  };
};

export default anecdoteSlice.reducer;
