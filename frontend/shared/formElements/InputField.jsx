import React from "react";
import { Field, ErrorMessage } from "formik";

const InputField = ({
  id,
  element = "input",
  label,
  name,
  type = "text",
  placeholder = "",
}) => {
  return (
    <div className="form-control w-full">
      {label && (
        <label htmlFor={id || name} className="label">
          <span className="label-text">{label}</span>
        </label>
      )}

      {element === "textarea" ? (
        <Field
          as="textarea"
          id={id || name}
          name={name}
          placeholder={placeholder}
          className="textarea textarea-bordered w-full"
        />
      ) : (
        <Field
          id={id || name}
          name={name}
          type={type}
          placeholder={placeholder}
          className="input input-bordered w-full"
        />
      )}

      <ErrorMessage
        name={name}
        component="div"
        className="text-sm text-red-500 mt-1"
      />
    </div>
  );
};

export default InputField;
