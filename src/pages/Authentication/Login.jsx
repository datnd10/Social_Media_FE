import React from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/auth/auth.action";
const Login = () => {
  const initialValues = { email: "", password: "" };

  const validationSchema = {
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string()
      .min(8, "password must be at least 8 characters")
      .required("pass word is required"),
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handelSubmit = (value) => {
    console.log(value);
    dispatch(loginUser({data: value}))
  };

  return (
    <div>
      <Formik
        onSubmit={handelSubmit}
        //validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Form className="space-y-5">
          <div className="space-y-5">
            <div>
              <Field
                type="email"
                placeholder="Email"
                name="email"
                as={TextField}
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="email"
                component={"div"}
                className="text-red-5"
              />
            </div>

            <div>
              <Field
                type="password"
                placeholder="password"
                name="password"
                as={TextField}
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-5"
              />
            </div>
          </div>
          <Button
            sx={{ padding: ".8rem 0rem" }}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </Form>
      </Formik>
      <div className="flex gap-2 items-center justify-center pt-5">
        <p>If you don't have account ?</p>
        <Button onClick={() => navigate("/register")}>Register</Button>
      </div>
    </div>
  );
};

export default Login;
