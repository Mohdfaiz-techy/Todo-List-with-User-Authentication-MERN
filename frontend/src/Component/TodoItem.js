import { useState, React } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo } from "./ReduxToolKit/UserSlice";
import { editTodo } from "./ReduxToolKit/UserSlice";
import { showAlertWithTimeout } from "./ReduxToolKit/AlertSlice";

const TodoItem = ({ mapTodo }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
    dispatch(showAlertWithTimeout({ message: 'Delete Todo Successfully!', alertType: 'danger' }));
  };
  const [edittodo, seteditTodo] = useState({
    editTitle: mapTodo.title || "",
    editDescription: mapTodo.description || "",
    _id: mapTodo._id,
  });


  const onChange = (e) => {
    seteditTodo({ ...edittodo, [e.target.name]: e.target.value });
  };

  const onClick = (e) => {
    e.preventDefault();
    console.log(edittodo);
    dispatch(editTodo(edittodo));
    dispatch(showAlertWithTimeout({ message: 'Edit Todo Successfully!', alertType: 'success' }));
  }
 
  return (
    <>
      {/* <!-- Modal for EditTodo--> */}
      <div className="modal fade"  id={`editTodo-${mapTodo._id}`}
          tabIndex="-1"
          aria-labelledby={`editTodoLabel-${mapTodo._id}`}
          aria-hidden="true">
        <div
          className="  modal-dialog modal-dialog-centered"
         
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id={`editTodoLabel-${mapTodo._id}`}>
                  Edit Todo
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor={`editTitle-${mapTodo._id}`} className="form-label">
                    Title
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id={`editTitle-${mapTodo._id}`}
                    name="editTitle"
                    onChange={onChange}
                    value={edittodo.editTitle}
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor={`editDescription-${mapTodo._id}`} className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`editDescription-${mapTodo._id}`}
                    name="editDescription"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={edittodo.editDescription}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                  onClick={onClick}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
   

      {/* todoItem start  */}

      <div className="col-lg-3 my-3">
        <div className="card  mx-2" style={{ width: "18rem" }}>
          <div className="card-body text-center">
            <h5 className="card-title text-center">{mapTodo.title}</h5>
            <p className="card-text text-center">{mapTodo.description}</p>
            <button
              className="btn btn-danger text-center btn-sm mx-2"
              onClick={() => handleDelete(mapTodo._id)}
            >
              Delete
            </button>
            <button
              className="btn btn-success btn-sm"
              type="button"
              data-bs-toggle="modal"
              data-bs-target={`#editTodo-${mapTodo._id}`}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
