import axios from "axios";

const baseUrl = `http://localhost:3002/anecdotes`;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (anecdote) => {
  const newObject = { content: anecdote, votes: 0 };
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

const update = async (id, object) => {
  const updatedObject = {...object, votes:object.votes+1}
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject);
  return response.data;
}

export default { getAll, create, update };
