import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const host = "http://localhost:5000";

export const fetchAllTodo = createAsyncThunk("fetchAllTodo", async () => {
  const response = await fetch(
    `${host}/todoList/fetchAllTodo/`,
    // const options = {
    //   method: "POST",
    // // body data type must match "Content-Type" header
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: credentials.email,
    //     password: credentials.password,
    //   }),
    // };
    // we can write code by both methods
    {
      method: "GET",
      // body data type must match "Content-Type" header
      headers: {
        "content-type": "application/json",
        token: localStorage.getItem("token"),
      },
    }
  );
  console.log(response);
  const res = await response.json();
  console.log(res);
  return res;
});
export const createTodo = createAsyncThunk("createTodo", async (todo) => {
  const response = await fetch(
    `${host}/todoList/createTodo/`,
    // const options = {
    //   method: "POST",
    // // body data type must match "Content-Type" header
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: credentials.email,
    //     password: credentials.password,
    //   }),
    // };
    // we can write code by both methods
    {
      method: "POST",
      // body data type must match "Content-Type" header
      headers: {
        "content-type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: todo.title,
        description: todo.description,
      }),
    }
  );
  console.log(response);
  const res = await response.json();
  console.log(res);
  return res;
});
export const editTodo = createAsyncThunk("editTodo", async (todo) => {
  const response = await fetch(
    `${host}/todoList/updateTodo/${todo._id}`,
    // const options = {
    //   method: "POST",
    // // body data type must match "Content-Type" header
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: credentials.email,
    //     password: credentials.password,
    //   }),
    // };
    // we can write code by both methods
    {
      method: "PUT",
      // body data type must match "Content-Type" header
      headers: {
        "content-type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: todo.editTitle,
        description: todo.editDescription,
      }),
    }
  );
  console.log(response);
  const res = await response.json();
  console.log(res);
  return res;
});

export const deleteTodo = createAsyncThunk("deleteTodo", async (todoId) => {
  const response = await fetch(`${host}/todoList/deleteTodo/${todoId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const res = await response.json();
  return res;
});

const initialState = {
  isLoading: false,
  data: [],
  isError: false,
};

export const userSlice = createSlice({
  name: "todo",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllTodo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchAllTodo.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error", action.payload);
      state.isError = true;
    });
    builder.addCase(createTodo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
      // state.todo = action.payload.todo;
      state.isError = false;
    });
    builder.addCase(createTodo.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error", action.error);
      state.isError = true;
    });
    builder.addCase(editTodo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(editTodo.fulfilled, (state, action) => {
      state.isLoading = false;

      // Find the todo item to edit
      const editTodo = state.data.find(
        (todo) => todo._id === action.payload._id
      );
      console.log(editTodo);

      // Update the todo item if it exists
      if (editTodo) {
        if (action.payload.title) {
          editTodo.title = action.payload.title;
        }
        if (action.payload.description) {
          editTodo.description = action.payload.description;
        }
      }

      state.isError = false;
    });
    builder.addCase(editTodo.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error", action.error);
      state.isError = true;
    });
    builder.addCase(deleteTodo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter((todo) => todo._id !== action.payload._id);
      state.isError = false;
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error ", action.error);
      state.isError = true;
    });
  },
 
});

// Action creators are generated for each case reducer function

export default userSlice.reducer;
