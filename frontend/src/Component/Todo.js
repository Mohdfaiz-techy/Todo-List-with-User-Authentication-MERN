import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllTodo } from "./ReduxToolKit/UserSlice";
import TodoItem from "./TodoItem";

const Todo = () => {
  const { isLoading, data, error } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const addTodo = useCallback(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchAllTodo());
    }
  }, [dispatch]);

  useEffect(() => {
    addTodo();
  }, [addTodo]);

  useEffect(() => {
    if (Array.isArray(data)) {
      console.log('Todo data:', data);
      data.forEach((todo, index) => {
        if (!todo._id) {
          console.error(`Todo at index ${index} is missing _id`, todo);
        }
      });
    } else {
      console.error('Data is not an array:', data);
    }
  }, [data]);

  // Reverse the data array to display todos in descending order
  const reversedData = [...data].reverse();

  return (
    <div className="container my-3">
      <div className="row d-flex mx-2">
        {isLoading && <h2>Loading...</h2>}
        {error && <h2>Error: {error.message}</h2>}
        {!isLoading && !error && Array.isArray(reversedData) && reversedData.length === 0 && (
          <p>No todo to display</p>
        )}
        {!isLoading && !error && Array.isArray(reversedData) && reversedData.map((mapTodo, index) => {
          if (mapTodo._id) {
            return <TodoItem mapTodo={mapTodo} key={mapTodo._id} />;
          } else {
            console.error('Missing _id for todo at index:', index, mapTodo);
            return <TodoItem mapTodo={mapTodo} key={index} />;
          }
        })}
      </div>
    </div>
  );
};

export default Todo;

