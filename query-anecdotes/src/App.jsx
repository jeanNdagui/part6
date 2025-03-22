import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "./components/services/anecdotes";
import { NotificationContextProvider } from "./NotificationContext";
import { useContext } from "react";
import notificationContext from "./NotificationContext";

const AnecdoteList = ({anecdotes}) => {
  const [notification, notificationDispatch] = useContext(notificationContext);
  const queryClient = useQueryClient();
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    notificationDispatch({
      type: "VOTE",
      message: `anecdote '${anecdote.content}' voted.`,
    });
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });
  console.log(result.data);

  if (result.isError) {
    return <div>anecdote services not available due to problems in server</div>;
  }

  const queryClient = useQueryClient();



  const anecdotes = result.data ? result.data : [];

  return (
    <NotificationContextProvider>
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />

        <AnecdoteList anecdotes={anecdotes}/>
      </div>
    </NotificationContextProvider>
  );
};

export default App;
