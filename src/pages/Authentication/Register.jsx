import React from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import * as Yup from "yup";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from "react-router-dom";
const Register = () => {
  const initialValues = {firstName: "", lastName: "", email: "", password: "" };
  const validationSchema = {
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string()
      .min(8, "password must be at least 8 characters")
      .required("pass word is required"),
  };
  const navigate = useNavigate();
  const handelSubmit = (value) => {
    value.gender = gender;
    console.log(value);
  };

  const [gender, setGender] = useState('female');

  const handleChange = (event) => {
    setGender(event.target.value);
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
                type="text"
                placeholder="First Name"
                name="firstName"
                as={TextField}
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="firstName"
                component={"div"}
                className="text-red-5"
              />
            </div>

            <div>
              <Field
                type="text"
                placeholder="Last Name"
                name="lastName"
                as={TextField}
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-5"
              />
            </div>
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
            <div>
              <FormLabel id="gender">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="gender"
                name="gender"
                value={gender}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
                <ErrorMessage
                name="gender"
                component="div"
                className="text-red-5"
              />
              </RadioGroup>
            </div>
          </div>
          <Button
            sx={{ padding: ".8rem 0rem" }}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
          >
            Register
          </Button>
        </Form>
      </Formik>
      <div className="flex gap-2 items-center justify-center pt-5">
        <p>If you already have account ?</p>
        <Button onClick={() => navigate("/login")}>Login</Button>
      </div>
    </div>
  );
};

export default Register;
