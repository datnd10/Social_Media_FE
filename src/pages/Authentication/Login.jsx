import React from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import * as Yup from "yup";
const Login = () => {
  const initialValues = { email: "", password: "" };
  const validationSchema = {
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string()
      .min(8, "password must be at least 8 characters")
      .required("pass word is required"),
  };
  const [formValues, setFormValues] = useState({});
  const handelSubmit = (value) => {
    console.log("submit");
  };
  return (
    <div>
      <Formik
        onclick={handelSubmit}
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
    </div>
  );
};

export default Login;
