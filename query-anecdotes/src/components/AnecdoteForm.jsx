import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "./services/anecdotes";
import { useContext } from "react";
import notificationContext from "../NotificationContext";

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(notificationContext);
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

      event.target.anecdote.value = "";
      console.log("new anecdote");
      newAnecdoteMutation.mutate({ content: content, votes: 0 });
      notificationDispatch({
        type: "CREATE",
        message: content,
      });
    

    /*  console.log('lo-> :', notification)*/
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
