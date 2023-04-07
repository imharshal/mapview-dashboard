import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Form, Formik } from "formik";
import * as yup from "yup";
import apiService from "./../services/apiService";
import InputField from "../components/input-field/InputField";
function Register() {
  const toast = useRef(null);
  const validatationSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
  });
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    apiService
      .registerUser(values)
      .then((res) => {
        if (res.data.success) {
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: res.data.message,
            life: 3000,
          });
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: res.data.message,
            life: 3000,
          });
        }
      })
      .catch((err) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: err.response.data.message,
          life: 3000,
        });
      });

    resetForm();
  };
  return (
    <div className="flex align-items-center justify-content-center w-full">
      <Toast ref={toast} position="top-center" />

      <Formik
        initialValues={initialValues}
        validationSchema={validatationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="surface-card p-4 shadow-2 border-round w-full lg:w-5">
            <div className="text-center mb-5">
              <div className="text-900 text-3xl font-medium mb-3">Sign up</div>
              <span className="text-600 font-medium line-height-3">
                Already have an account?
              </span>
              <Link className="no-underline ml-2 text-blue-500" to="/login">
                Sign in!
              </Link>
              {/* <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">
            Create today!
          </a> */}
            </div>

            <div>
              <label htmlFor="name" className="block text-900 font-medium mb-2">
                Name
              </label>
              <InputField
                id="name"
                type="text"
                name="name"
                placeholder="Name"
                className="w-full mb-3"
              />
              <label
                htmlFor="email"
                className="block text-900 font-medium mb-2"
              >
                Email
              </label>
              <InputField
                id="email"
                type="text"
                name="email"
                placeholder="Email address"
                className="w-full mb-3"
              />

              <label
                htmlFor="password"
                className="block text-900 font-medium mb-2"
              >
                Password
              </label>
              <InputField
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                className="w-full mb-3"
              />

              <Button
                type="submit"
                label="Sign Up"
                icon="pi pi-user"
                className="w-full"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
