// Hooks
import React, { useState , useContext } from "react";
import { TodosContext } from "../Contexts/TodosContext";

// Context Modal
import { ModalContext, UpdateModalContex } from "../Contexts/ModalContext";

// SnackBar Context
import { useSnackBar } from "../Contexts/SnackBarContext";

// Card
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";

// Toggle Button
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

// Theme
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { pink } from "@mui/material/colors";

// Todo Component
import Todo from "./Todo";

// UUID Library
import { v4 as uuidv4 } from "uuid";

// Color Thame
const theme = createTheme({
  palette: {
    primary: {
      main: pink[800],
    },
  },
});

export default function TodoList() {
  // Toggle Buttons
  const [alignment, setAlignment] = React.useState("الكل");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  // Todos
  const myTodos = useContext(TodosContext);
  const todos = myTodos.todos;
  const setTodos = myTodos.setTodos;

  // Modals
  const [openDel, setOpenDel] = useState(false);
  const [openUpd, setOpenUpd] = useState(false);

  // SnackBar Context
  const { showHideSnackBar } = useSnackBar();

  // Add New Todo
  const [newTodo, setNewTodo] = useState("");

  return (
    <Container maxWidth="sm">
      {/* Main Card */}
      <Card sx={{ minWidth: 275 }} style={{maxHeight: "80vh" , overflow: "auto" , scrollbarWidth: "none"}}>
        <CardContent>
          {/* Title */}
          <Typography variant="h2" style={{ fontWeight: "bold" }}>
            مهامي
          </Typography>
          <Divider />

          {/* 3 Buttons */}
          <ThemeProvider theme={theme}>
            <ToggleButtonGroup
              style={{ marginTop: "25px", direction: "ltr" }}
              color="primary"
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="Platform">
              <ToggleButton value="غير المنجزة">
                <Typography>غير المنجزة</Typography>
              </ToggleButton>
              <ToggleButton value="المنجزة">
                <Typography>المنجزة</Typography>
              </ToggleButton>
              <ToggleButton value="الكل">
                <Typography>الكل</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          </ThemeProvider>

          {/* All Todos Component */}
          <div>
            <ModalContext.Provider value={{open: openDel , setOpen: setOpenDel}}>
                <UpdateModalContex.Provider value={{open: openUpd , setOpen: setOpenUpd}}>
                    {/* Check Type Of Todo */}
                    {alignment === "المنجزة" ? <Todo complated = "true" /> :
                     (alignment === "غير المنجزة" ? <Todo complated = "false" /> : <Todo />)}
                </UpdateModalContex.Provider>
            </ModalContext.Provider>
          </div>
        </CardContent>

        {/* Add Todo */}
        <CardActions>
          <ThemeProvider theme={theme}>
            <TextField
              value={newTodo}
              onChange={(e) => {
                setNewTodo(e.target.value);
              }}
              id="outlined-basic"
              label="عنوان المهمة"
              variant="outlined"
              style={{ width: "63.5%" }}
              size="small"
            />

            <Button
              onClick={() => {
                const newTodos = [
                  ...todos,
                  {
                    id: uuidv4(),
                    title: newTodo,
                    details: "",
                    isComplate: false,
                  },
                ];
                setTodos(newTodos);
                setNewTodo("");

                // Show SnackBar
                showHideSnackBar("تمت الاضافة بنجاح");

                // Save Todos
                localStorage.setItem("todos", JSON.stringify(newTodos));
              }}
              variant="contained"
              size="large"
              disabled={newTodo.length > 0 ? false : true}
              style={{ width: "35%", marginRight: "1.5%" }}>
              إضافة
            </Button>
          </ThemeProvider>
        </CardActions>
      </Card>
    </Container>
  );
}
