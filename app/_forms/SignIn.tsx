"use client";
import React from "react";
import { FormikProps, withFormik } from "formik";
import { Atom } from "../_components/atoms";
import { SignInValidationSchema } from "./validation/yup";
import axios from "axios";
import Link from "next/link";

interface FormValues {
  email: string;
  password: string;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="mx-auto text-2xl font-bold">Sign-in to your account.</h1>
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

        <Atom.Button buttonType={"btn-primary"}>Sign In</Atom.Button>
        <div>{props.status}</div>
      </form>{" "}
      <div role="alert" className="alert">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info h-6 w-6 shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <Link href="/sign-up">
          <span className="link">Or Sign-up if you dont have an account.</span>
        </Link>
      </div>
    </section>
  );
};

const SignIn = withFormik({
  mapPropsToValues: () => {
    return {
      email: "",
      password: "",
    };
  },

  // Validation using Yup
  validationSchema: SignInValidationSchema,

  handleSubmit: async (values, errors) => {
    // do submitting things
    const data: FormValues = {
      email: values.email,
      password: values.password,
    };

    try {
      const res = await axios.post("/auth/login", {
        data,
      });

      if (res.status == 200) {
        window.location.href = "/dashboard/user";
      }
    } catch (error: any) {
      errors.setStatus(error.response.data.error);
    }
  },
})(InnerForm);

export default SignIn;
