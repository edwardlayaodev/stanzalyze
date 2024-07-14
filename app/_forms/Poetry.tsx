"use client";
import React, { useEffect, useState } from "react";
import { FormikProps, withFormik } from "formik";
import { Atom } from "../_components/atoms";
import axios from "axios";
import { createClient } from "../_utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { Molecule } from "../_components/molecules";

interface FormValues {
  poetry: string;
  loadingForm: (isLoading: boolean) => void;
  setResult: (result: string) => void;
}

interface Result {
  user_id: string;
  prompt: string;
  result: string;
  title: string;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const supabase = createClient();
  const [title, setTitle] = useState("");
  const [user_id, setUserId] = useState("");
  const [loadingForm, setLoadingForm] = useState(false);
  const [result, setResult] = useState("");

  const placeholderMsg =
    "In the bleak mid-winter Frosty wind made moan Earth stood hard as iron, Water like a stone; Snow had fallen, snow on snow, Snow on snow, In the bleak mid-winter Long ago. ";

  useEffect(() => {
    try {
      // on mount get User Id

      supabase.auth.getUser().then((res: any) => {
        setUserId(res.data?.user?.id);
      });
    } catch (error) {
      console.error(error);
    }

    // on mount attach setters so we can access it on handleSubmit
    props.setFieldValue("loadingForm", setLoadingForm);
    props.setFieldValue("setResult", setResult);
  }, []);

  //TODO: move to module
  async function copyResult() {
    try {
      await navigator.clipboard.writeText(result);
      alert("Result copied to clipboard.");
    } catch (error) {
      console.error(error);
    }
  }

  function actionHandler() {
    saveResult({
      user_id: user_id,
      prompt: props.values.poetry,
      result: result,
      title: title,
    });
  }

  async function saveResult(result: Result) {
    try {
      const { error } = await supabase.from("Poetry").insert({ ...result });
      if (!error) {
        alert("Your analysis have been saved.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="flex flex-col gap-4">
      <h1 className="mx-auto text-2xl font-bold">Add Poetry to be analyzed</h1>
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

        <Atom.Button
          loading={loadingForm}
          disabled={loadingForm}
          buttonType={"btn-primary"}
        >
          Submit
        </Atom.Button>
      </form>
      <div className="text-center mx-auto mt-6">
        <Atom.Visibility state={!user_id}>
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
            <span>Sign-in to save results.</span>
          </div>
        </Atom.Visibility>

        <Atom.TextArea
          setFieldValue={props.setFieldValue}
          onChangeHandler={props.handleChange}
          onBlurHandler={props.handleBlur}
          touched={props.touched}
          errors={props.errors}
          value={result}
          name="poetry"
          placeholder={
            "This analysis is AI generated, It may not be accurate, Please read the analysis carefully before copying it."
          }
          readOnly
        ></Atom.TextArea>

        <div className="mt-4 flex flex-row justify-center items-center gap-4">
          <Atom.Button
            htmlType="button"
            buttonType={"btn-primary"}
            onClick={copyResult}
            disabled={!result}
          >
            <Atom.CopyIcon />
            <span>Copy</span>
          </Atom.Button>
          <Molecule.Modal
            type={"input"}
            inputProps={{
              placeholder: "Eg. A Christmas Carol",
              setter: setTitle,
              getter: title,
            }}
            modalProps={{
              title: "Save Poem Analysis",
              message: "Please provide a title for this Result",
            }}
            actionBtnProps={{
              icon: <Atom.SaveIcon />,
              type: "btn-primary",
              label: "Save",
              handler: actionHandler,
            }}
            openBtnProps={{
              icon: <Atom.SaveIcon />,
              type: "btn-secondary",
              label: "Save",
              disabled: !user_id || !result,
            }}
            cancelBtnProps={{
              icon: <Atom.DoorIcon />,
              type: "btn-secondary",
              label: "Cancel",
            }}
          />
        </div>
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
