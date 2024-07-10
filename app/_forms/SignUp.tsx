"use client";
import React from "react";

import { FormikProps, withFormik } from "formik";
import { Atom } from "../_components/atoms";
import { SignUpValidationSchema } from "./validation/yup";
import axios from "axios";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="mx-auto text-2xl font-bold">Sign-Up</h1>
      <form
        className="flex flex-col justify-center items-center gap-4"
        onSubmit={props.handleSubmit}
      >
        <Atom.Input
          onChangeHandler={props.handleChange}
          onBlurHandler={props.handleBlur}
          touched={props.touched}
          errors={props.errors}
          value={props.values.email}
          name="email"
          placeholder="Email"
          inputType="email"
        ></Atom.Input>
        <Atom.Input
          onChangeHandler={props.handleChange}
          onBlurHandler={props.handleBlur}
          touched={props.touched}
          errors={props.errors}
          value={props.values.password}
          name="password"
          placeholder="Password"
          inputType="password"
        ></Atom.Input>
        <Atom.Input
          onChangeHandler={props.handleChange}
          onBlurHandler={props.handleBlur}
          touched={props.touched}
          errors={props.errors}
          value={props.values.confirmPassword}
          name="confirmPassword"
          placeholder="Confirm Password"
          inputType="password"
        ></Atom.Input>

        <Atom.Button buttonType={"btn-primary"}>Submit</Atom.Button>
        <div>{props.status}</div>
      </form>
    </section>
  );
};

const SignUp = withFormik({
  mapPropsToValues: () => {
    return {
      email: "",
      password: "",
      confirmPassword: "",
    };
  },

  // Validation using Yup
  validationSchema: SignUpValidationSchema,

  handleSubmit: async (values, errors) => {
    // do submitting things
    const data: FormValues = {
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    try {
      const res = await axios.post("/auth/register", {
        data,
      });

      if (res.status == 200) {
        window.location.href = "/";
      }
    } catch (error: any) {
      errors.setStatus(error.response.data.error);
    }
  },
})(InnerForm);

export default SignUp;
