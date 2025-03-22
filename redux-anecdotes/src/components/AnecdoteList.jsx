import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ handleClick, anecdote }) => {
  return (
    <li>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </li>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter !== "") {
      return state.anecdotes.filter((a) =>
        a.content.toLowerCase().includes(state.filter.toLowerCase())
      );
    }
    return state.anecdotes;
  });

  console.log(useSelector(s => s.notification));
  const dispatch = useDispatch();

  return (
    <ul>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(vote(anecdote.id,anecdote));
            dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
          }}
        />
      ))}
    </ul>
  );
};

export default AnecdoteList;
