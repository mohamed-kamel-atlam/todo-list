import { createContext , useContext, useState } from "react";
import MySnackBar from "../Components/MySnackBar";

const SnackBarContext = createContext(false);

export const SnackBarProvider = ({ children }) => {
  // SnackBar
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(false);

  // Show And Hidden SnackBar
  const showHideSnackBar = (message) => {
    setMessage(message);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  return (
    <SnackBarContext.Provider value={{ showHideSnackBar }}>
      <MySnackBar open={open} message={message} />
      {children}
    </SnackBarContext.Provider>
  );
};

export const useSnackBar = () => {
    return useContext(SnackBarContext);
}
