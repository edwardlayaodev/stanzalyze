import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from "react";

interface Props {
  placeholder: string;
  touched: any;
  value: any;
  errors: any;
  name: string;
  onChangeHandler: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlurHandler: (event: FocusEvent<HTMLTextAreaElement>) => void;
  setFieldValue: any;
}

export default function TextArea({
  placeholder,
  onChangeHandler,
  onBlurHandler,
  value,
  errors,
  touched,
  name,
  setFieldValue,
}: Props) {
  return (
    <>
      <textarea
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        name={name}
        rows={4}
        cols={50}
        value={value}
        placeholder={placeholder}
        className="textarea textarea-bordered w-full"
      />
      {errors[name] && touched[name] && (
        <p className="text-error text-sm">{errors[name]}</p>
      )}
    </>
  );
}
