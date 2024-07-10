"use client";
import React, { useEffect, useState } from "react";
import { FormikProps, withFormik } from "formik";
import { Atom } from "../_components/atoms";
import axios from "axios";

interface FormValues {
  poetry: string;
  loadingForm: (isLoading: boolean) => void;
  setResult: (result: string) => void;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const [loadingForm, setLoadingForm] = useState(false);
  const [result, setResult] = useState(false);

  const placeholderMsg =
    "In the bleak mid-winter Frosty wind made moan Earth stood hard as iron, Water like a stone; Snow had fallen, snow on snow, Snow on snow, In the bleak mid-winter Long ago. ";

  // on mount attach setters so we can access it on handleSubmit
  useEffect(() => {
    props.setFieldValue("loadingForm", setLoadingForm);
    props.setFieldValue("setResult", setResult);
  }, []);

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

        <Atom.Button loading={loadingForm} buttonType={"btn-primary"}>
          Submit
        </Atom.Button>
      </form>
      <div className="max-w-md text-center mx-auto">
        <p>{result}</p>
      </div>
    </section>
  );
};

const Poetry = withFormik({
  mapPropsToValues: () => {
    return {
      poetry: "",
      loadingForm: (isLoading: boolean) => {},
      setResult: (result: string) => {},
    };
  },

  // Validation using Yup
  //   validationSchema: SignInValidationSchema,

  handleSubmit: async (values, errors) => {
    values.loadingForm(true);
    // do submitting things
    const data = {
      poetry: values.poetry,
    };

    try {
      const res = await axios.post("/analyze", {
        data,
      });

      values.loadingForm(false);
      if ((res.status = 200))
        values.setResult(res.data.analysis[0].message.content);
    } catch (error: any) {
      values.loadingForm(false);
      errors.setStatus(error.response.data.error);
    }
  },
})(InnerForm);

export default Poetry;
