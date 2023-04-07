import React, { useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yup from "yup";
import InputField from "../components/input-field/InputField";
import authService from "../services/authService";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/Auth";
function Login() {
  const toast = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const redirectLocation = location.state?.from?.pathname ?? "/";
  const validatationSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });
  const initialValues = {
    username: "",
    password: "",
  };
  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    authService
      .login(values)
      .then((res) => {
        if (res.data.success) {
          auth.setLoggedIn(res.data.token);
          navigate(redirectLocation);
        } else {
          toast.current.show({
            severity: "success",
            summary: "Success",
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
              <div className="text-900 text-3xl font-medium mb-3">
                Welcome Back
              </div>
              <span className="text-600 font-medium line-height-3">
                Don't have an account?
              </span>
              <Link className="no-underline ml-2 text-blue-500" to="/register">
                Create today!
              </Link>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-900 font-medium mb-2"
              >
                Username
              </label>
              <InputField
                type="text"
                name="username"
                placeholder="Username / Email address"
                className="mb-2"
              />

              <label
                htmlFor="password"
                className="block text-900 font-medium mb-2"
              >
                Password
              </label>
              <InputField
                type="password"
                name="password"
                placeholder="Password"
                className="mb-2"
              />

              <Button
                type="submit"
                label="Sign In"
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

export default Login;
