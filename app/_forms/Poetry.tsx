"use client";
import React from "react";
import { FormikProps, withFormik } from "formik";
import { Atom } from "../_components/atoms";
import axios from "axios";

interface FormValues {
  poetry: string;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const placeholderMsg =
    "In the bleak mid-winter Frosty wind made moan Earth stood hard as iron, Water like a stone; Snow had fallen, snow on snow, Snow on snow, In the bleak mid-winter Long ago. ";

  return (
    <section className="flex flex-col gap-4">
      <h1 className="mx-auto text-2xl font-bold">Poetry Analysis</h1>
      <form
        className="flex flex-col justify-center items-center gap-4"
        onSubmit={props.handleSubmit}
      >
        <Atom.TextArea
          setFieldValue={props.setFieldValue}
          onChangeHandler={props.handleChange}
          onBlurHandler={props.handleBlur}
          touched={props.touched}
          errors={props.errors}
          value={props.values.poetry}
          name="poetry"
          placeholder={placeholderMsg}
        ></Atom.TextArea>

        <Atom.Button loading={true} buttonType={"btn-primary"}>
          Submit
        </Atom.Button>
        <div>{props.status}</div>
      </form>
    </section>
  );
};

const Poetry = withFormik({
  mapPropsToValues: () => {
    return {
      poetry: "",
    };
  },

  // Validation using Yup
  //   validationSchema: SignInValidationSchema,

  handleSubmit: async (values, errors) => {
    // do submitting things
    const payload = {
      poetry: values.poetry,
    };

    try {
      const res = await axios.post("/analyze", {
        payload,
      });
      if (res.status == 200) {
      }

      console.log(res);
    } catch (error: any) {
      errors.setStatus(error.response.data.error);
    }
  },
})(InnerForm);

export default Poetry;
