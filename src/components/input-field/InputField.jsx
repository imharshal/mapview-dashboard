import React from "react";
import { InputText } from "primereact/inputtext";
import { useField } from "formik";
function InputField(props) {
  const [field, meta] = useField(props);
  return (
    <div className={`${props.className} flex flex-column`}>
      <InputText {...props} {...field} />
      {meta.error && meta.touched && (
        <small className="p-error ml-2">{meta.error}</small>
      )}
    </div>
  );
}

export default InputField;
