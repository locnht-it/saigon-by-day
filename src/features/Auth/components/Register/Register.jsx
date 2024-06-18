import React, { useState } from "react";
import PropTypes from "prop-types";
import RegisterForm from "../RegisterForm/RegisterForm";
import { useDispatch } from "react-redux";
import { register } from "../../userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSnackbar } from "notistack";

Register.propTypes = {
  onSubmit: PropTypes.func,
  closeDialog: PropTypes.func,
};

function Register({ props }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State for Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // State for Snackbar severity

  const handleSubmit = async (values) => {
    try {
      //auto set username = email
      values.username = values.email;

      const action = register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);

      // Show success Snackbar
      setSnackbarMessage("Registration successful!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      //close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }
    } catch (error) {
      // Show error Snackbar
      //   setSnackbarMessage("Failed to register. Please try again.");
      //   setSnackbarSeverity("error");
      //   setOpenSnackbar(true);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <RegisterForm onSubmit={handleSubmit} />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Register;
