// UUID Library
import { v4 as uuidv4 } from "uuid";

export default function TodosReduser(currentTodos, action) {
  switch (action.type) {
    // Add A New Todo
    case "addTodo": {
      const newTodos = [
        ...currentTodos,
        {
          id: uuidv4(),
          title: action.payload.newTodo,
          details: "",
          isComplate: false,
        },
      ];

      // Save Todos
      localStorage.setItem("todos", JSON.stringify(newTodos));

      return newTodos;
    }

    // Delete Todo
    case "deleted": {
      const updatedTodos = currentTodos.filter(
        (myTodo) => myTodo.id !== action.payload.id
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      return updatedTodos;
    }

    // Update Todo
    case "updated": {
      const updatedTodos = currentTodos.map((newTodo) => {
        if (newTodo.id === action.payload.id) {
          return { ...newTodo, title: action.payload.title, details: action.payload.details };
        } else {
          return newTodo;
        }
      });

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    default: {
      throw Error("Unknown Action", action.type);
    }
  }
}
