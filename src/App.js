import './App.css';
import TodoList from './Components/TodoList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TodosContext } from './Contexts/TodosContext';
import { useState } from 'react';
import { SnackBarProvider } from './Contexts/SnackBarContext';

// Font Theme
const theme = createTheme({
  typography: {
    fontFamily: [
      "Alexandria"
    ]
  },
});

function App() {
  // Todos
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  return (
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
        <div className="App">
            <TodosContext.Provider value={{todos: todos , setTodos: setTodos}}>
              <TodoList />
            </TodosContext.Provider>
        </div>
      </SnackBarProvider>
    </ThemeProvider>
  );
}

export default App;
