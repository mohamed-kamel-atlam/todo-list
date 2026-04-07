// Icons
import CheckIcon from "@mui/icons-material/Check";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { Typography } from "@mui/material";

// Hooks
import { useContext, useState } from "react";
import { TodosContext } from "../Contexts/TodosContext";
import { ModalContext, UpdateModalContex } from "../Contexts/ModalContext";
import { useSnackBar } from "../Contexts/SnackBarContext";

// Components
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModel";

export default function Todo({ complated }) {
  // Todos Context
  const myTodos = useContext(TodosContext);
  const todos = myTodos.todos;
  const setTodos = myTodos.setTodos;

  // Modal Context
  const delModal = useContext(ModalContext);
  const open = delModal.open;
  const setOpen = delModal.setOpen;

  const updateModal = useContext(UpdateModalContex);
  const openUpdate = updateModal.open;
  const setOpenUpdate = updateModal.setOpen;

  // SnackBar Context
  const { showHideSnackBar } = useSnackBar();

  // Selected Id
  const [selectId, setSelectId] = useState(null);

  // Handle open Modals
  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };

  // Filter Todos To (Compeleted , Non-Complated , All)
  let filteredTodos = todos;

  if (complated === "true") {
    filteredTodos = todos.filter((todo) => todo.isComplate === true);
  } else if (complated === "false") {
    filteredTodos = todos.filter((todo) => todo.isComplate === false);
  }

  const todosJsx = filteredTodos.map((todo) => {
    return (
      <div
        key={todo.id}
        className="todo-cart"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#0707cdff",
          color: "#e9e9e9",
          padding: "10px",
          margin: "10px 0",
        }}>
        {/* Right Side */}
        <div>
          {/* Title */}
          <Typography
            style={{
              margin: "0",
              fontWeight: "normal",
              fontSize: "large",
              textDecoration: todo.isComplate ? "line-through" : "none",
            }}>
            {todo.title}
          </Typography>

          {/* Details */}
          <Typography style={{ fontWeight: "normal", fontSize: "small" }}>
            {todo.details}
          </Typography>
        </div>

        {/* Left Side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "25%",
          }}>
          {/* Check isCompleted Todo */}
          <div
            className="icon"
            style={{
              borderColor: "green",
              backgroundColor: todo.isComplate ? "green" : "white",
            }}
            onClick={() => {
              const updatedTodos = todos.map((newTodo) => {
                if (newTodo.id === todo.id) {
                  return { ...newTodo, isComplate: !newTodo.isComplate };
                } else {
                  return newTodo;
                }
              });

              // Show SnackBar
              todo.isComplate
                ? showHideSnackBar("تم حذف المهمة من المنجزة")
                : showHideSnackBar("تم اكمال المهمة");

              setTodos(updatedTodos);
              localStorage.setItem("todos", JSON.stringify(updatedTodos));
            }}>
            <CheckIcon style={{ color: todo.isComplate ? "white" : "green" }} />
          </div>

          {/* To Edit Todo */}
          <div
            className="icon"
            style={{ borderColor: "blue" }}
            onClick={() => {
              handleOpenUpdate();
              setSelectId(todo.id);
            }}>
            <EditRoundedIcon style={{ color: "blue" }} />
          </div>

          {/* To Delete Todo */}
          <div
            className="icon"
            style={{ borderColor: "red" }}
            onClick={() => {
              handleOpen();
              setSelectId(todo.id);
            }}>
            <DeleteOutlineRoundedIcon style={{ color: "red" }} />
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      {/* Todos */}
      {todosJsx}

      {/* Delete Modal */}
      {open === true ? <DeleteModal id={selectId} /> : ""}

      {/* Update Modal */}
      {openUpdate === true ? <UpdateModal id={selectId} /> : ""}
    </>
  );
}
