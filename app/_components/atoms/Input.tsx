import { FormikTouched } from "formik";
import { ChangeEvent, ChangeEventHandler, FocusEvent } from "react";

interface Props {
  placeholder: string;
  touched: any;
  value: any;
  errors: any;
  name: string;
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlurHandler: (event: FocusEvent<HTMLInputElement>) => void;
  inputType: string;
}

export default function Input({
  placeholder,
  onChangeHandler,
  onBlurHandler,
  value,
  errors,
  touched,
  name,
  inputType,
}: Props) {
  return (
    <>
      <input
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        name={name}
        value={value}
        type={inputType}
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs"
      />
      {errors[name] && touched[name] && (
        <p className="text-error text-sm">{errors[name]}</p>
      )}
    </>
  );
}
