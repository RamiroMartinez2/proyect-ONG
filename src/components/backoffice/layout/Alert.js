import React, { useState, createContext, useContext } from "react";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";

const State = createContext();
export const useAlert = () => useContext(State);

export const ProviderAlert = ({ children }) => {
  const [alert, setAlert] = useState({
    title: "",
    text: "",
    show: false,
    type: null,
    showCancelButton: false,
    onConfirm: () => {},
    onCancel: () => {},
  });

  function handleClose() {
    setAlert((a) => {
      return { ...a, show: false };
    });
  }

  function Confirm() {
    alert.onConfirm && alert.onConfirm();
    handleClose();
  }
  function Cancel() {
    alert.onCancel && alert.onCancel();
    handleClose();
  }

  return (
    <State.Provider value={{ setAlert }}>
      <SweetAlert
        {...alert}
        onEscapeKey={handleClose}
        onOutsideClick={handleClose}
        onConfirm={Confirm}
        onCancel={Cancel}
      />
      {children}
    </State.Provider>
  );
};

/*
  How to use:
  -> Import -> Wrap ProviderAlert in the App component

  import { useAlert, ProviderAlert } from "./components/backoffice/layout/Alert";
  function App() {
    return (
      <div className="App">
        <ProviderAlert>
          <RandomComponent />
        </ProviderAlert>
      </div>
    );
  }

  -> Use the alert through the hook useAlert and then setAlert will show the alert
  function RandomComponent(){
    const { setAlert } = useAlert();

    return (
      <h1
        onClick={() => {
          setAlert({
            title: "Title",
            text: "Content",
            show: true,
            type: "success",
            showCancelButton: true,
          });
        }}
      >
        Test
      </h1>
  );
  }

*/
