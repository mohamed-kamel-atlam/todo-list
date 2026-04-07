// Modal
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

// useContext Hook
import { useContext } from "react";
import { UpdateModalContex } from "../Contexts/ModalContext";
import { TodosContext } from "../Contexts/TodosContext";
import { useSnackBar } from "../Contexts/SnackBarContext";

// Style For Modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UpdateModal({ id }) {
  // Todos Context
  const myTodos = useContext(TodosContext);
  const todos = myTodos.todos;
  const setTodos = myTodos.setTodos;

  // Update Context
  const updateModal = useContext(UpdateModalContex);
  const openUpdate = updateModal.open;
  const setOpenUpdate = updateModal.setOpen;
  const handleClose = () => setOpenUpdate(false);

  // SnackBar Context
  const { showHideSnackBar } = useSnackBar();

  // find Todo
  const myTodo = todos.find((todo) => todo.id === id);

  // To Take Title && Details
  const [title, setTitle] = React.useState(myTodo.title);
  const [details, setDetails] = React.useState(myTodo.details);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openUpdate}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
        <Fade in={openUpdate}>
          <Box sx={{ ...style, textAlign: "right" }}>
            {/* Title */}
            <Typography id="transition-modal-title" variant="h6" component="h2">
              تعديل المهمة
            </Typography>

            {/* For Action */}
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
              component="div">
              {/* Edite Title's Todo */}
              <TextField
                id="outlined-basic"
                label="عنوان المهمة"
                variant="outlined"
                sx={{ mb: 2, width: "100%" }}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />

              {/* Edit Details' Todo */}
              <TextField
                id="outlined-basic"
                label="تفاصيل المهمة"
                variant="outlined"
                sx={{ mb: 2, width: "100%" }}
                value={details}
                onChange={(e) => {
                  setDetails(e.target.value);
                }}
              />

              {/* Click For Edit */}
              <Button
                variant="contained"
                onClick={() => {
                  const updatedTodos = todos.map((newTodo) => {
                    if (newTodo.id === id) {
                      return { ...newTodo, title: title, details: details };
                    } else {
                      return newTodo;
                    }
                  });

                  // Show SnackBar
                  showHideSnackBar("تم تعديل المهمة بنجاح");

                  setTodos(updatedTodos);
                  localStorage.setItem("todos", JSON.stringify(updatedTodos));
                  handleClose();
                }}>
                تعديل المهمة
              </Button>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
