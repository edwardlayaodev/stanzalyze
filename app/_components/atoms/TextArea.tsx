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
  readOnly?: boolean;
}

export default function TextArea({
  placeholder,
  onChangeHandler,
  onBlurHandler,
  value,
  errors,
  touched,
  name,
  readOnly = false,
}: Props) {
  return (
    <>
      <textarea
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        name={name}
        rows={8}
        cols={100}
        value={value}
        placeholder={placeholder}
        className="textarea textarea-bordered w-full"
        readOnly={readOnly}
      />
      {errors[name] && touched[name] && (
        <p className="text-error text-sm">{errors[name]}</p>
      )}
    </>
  );
}
