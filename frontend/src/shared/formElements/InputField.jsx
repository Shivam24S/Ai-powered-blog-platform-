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
          <span className="label-text font-medium text-sm">{label}</span>
        </label>
      )}

      <Field
        as={element === "textarea" ? "textarea" : "input"}
        id={id || name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={
          element === "textarea"
            ? "textarea textarea-bordered w-full"
            : "input input-bordered w-full"
        }
      />

      <ErrorMessage
        name={name}
        component="div"
        className="text-sm text-red-500 mt-1"
      />
    </div>
  );
};

export default InputField;
