import {useState,  React} from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "./ReduxToolKit/UserSlice";
import { showAlertWithTimeout } from "./ReduxToolKit/AlertSlice";

const AddTodo = () => {
  const dispatch = useDispatch()
  const [todo, setTodo] = useState({ title: "", description: "" });
  const onChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };
  const onclick =(e)=>{
    e.preventDefault();
    if(todo.description.length>=5 && todo.title.length>=3 ){
      dispatch(
        createTodo(todo)
      )
      dispatch(showAlertWithTimeout({ message: 'Add Todo Successfully!', alertType: 'success' }));
      
      setTodo({ title: "", description: "" })
    }
    else if (todo.description.length>=5 && todo.title.length<3){
      dispatch(showAlertWithTimeout({ message: 'Title Atleast 3 char', alertType: 'danger' }));
    }
    else if (todo.description.length<5 && todo.title.length>=3){
      dispatch(showAlertWithTimeout({ message: 'Description Atleast 5 char', alertType: 'danger' }));
    }
    else {
      dispatch(showAlertWithTimeout({ message: 'Title Atleast 3 char and Description Atleast 5 char', alertType: 'danger' }));
    }
   
  }
  return (
  <>
 
    <div className="container my-3">
      
      <h3>Add a Todo</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
         
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onChange}
            value={todo.title}
            minLength={3}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={todo.description}
            minLength={5}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-sm" onClick={onclick}>
          Add Todo
        </button>
      </form>
    </div>
    </>
  );
};

export default AddTodo;
