import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LockOutlined } from "@mui/icons-material";
import { Avatar, Typography, Button, Box, LinearProgress } from "@mui/material";
import * as yup from "yup";
import InputField from "../../../../components/form-controls/inputField/InputField";
import PasswordField from "../../../../components/form-controls/passwordField/PasswordField";

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const { onSubmit } = props;

  const passwordRules =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|\\;:'",.<>/?-]).{6,}$/;

  const schema = yup.object().shape({
    fullname: yup
      .string()
      .required("Please enter your full name")
      .min(6, "Full name is too short")
      .test(
        "Should has at least two words",
        "Please enter at least two words",
        (value) => {
          return value.split(" ").length >= 2;
        }
      ),
    email: yup
      .string()
      .required("Please enter your email")
      .email("Invalid email address"),
    password: yup
      .string()
      .required("Please enter your password")
      .matches(
        passwordRules,
        "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    retypePassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please retype your password"),
  });

  const form = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <Box
      component="form"
      onSubmit={form.handleSubmit(handleSubmit)}
      sx={{ paddingTop: 4, position: "relative" }}
    >
      {isSubmitting && (
        <LinearProgress
          sx={{ position: "absolute", top: 1, left: 0, right: 0 }}
        />
      )}
      <Avatar sx={{ margin: "0 auto", backgroundColor: "secondary.main" }}>
        <LockOutlined />
      </Avatar>
      <Typography
        component="h3"
        variant="h5"
        sx={{
          margin: (theme) => theme.spacing(2, 0, 3, 0),
          textAlign: "center",
        }}
      >
        Create An Account
      </Typography>

      <InputField name="fullname" label="Full Name" form={form} />
      <InputField name="email" label="Email" form={form} />
      <PasswordField name="password" label="Password" form={form} />
      <PasswordField
        name="retypePassword"
        label="Retype Password"
        form={form}
      />
      <Button
        disabled={isSubmitting}
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ margin: (theme) => theme.spacing(3, 0, 2, 0) }}
      >
        Create an account
      </Button>
    </Box>
  );
}

export default RegisterForm;
