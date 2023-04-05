import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import "./Login.css";
import "./Signup.css"
import * as Yup from "yup";
import { Axios } from "../AxiosConfig";
import { ToastContainer as Toast, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../slice/loginSlice";

const Signup = () => {
    const dispatch = useDispatch();
    const navtigate =useNavigate();
    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNo: "",
        address: ""
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string()
            .required("Password is required")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password should contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one digit."
            ),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords do not match")
            .required("Confirm password is required"),
        phoneNo: Yup.string()
            .matches(
                /^(?:\+353|0) *[1-9][0-9 ]{8}$/,
                "Invalid phone number. Please use format: +353 899756487"
            )
            .required("Phone number is required"),
        address: Yup.string().required("Address is required")
    });

    const onSubmit = async (values, { resetForm }) => {
        await Axios.post("/createuser", values).then((res) => {
            toast.success(res.data, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        })
        await dispatch(loginSuccess({...values, status:true, isAdmin:false}));
        resetForm();
    };
    return (
        <div className="bg-img" style={{ height: "auto" }}>
            <Toast/>
            <div className="login">
                <h1>Signup</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div className="d-flex flex-column mb-2">
                                <label htmlFor="name">Name</label>
                                <Field className="mb-0" type="text" id="name" name="name" />
                                <ErrorMessage component="div" name="name" className="signupError" />
                            </div>
                            <div className="d-flex flex-column mb-2">
                                <label htmlFor="email">Email</label>
                                <Field className="mb-0" type="email" id="email" name="email" />
                                <ErrorMessage component="div" name="email" className="signupError" />
                            </div>
                            <div className="d-flex flex-column mb-2">
                                <label htmlFor="password">Password</label>
                                <Field className="mb-0" type="password" id="password" name="password" />
                                <ErrorMessage component="div" name="password" className="signupError" />
                            </div>
                            <div className="d-flex flex-column mb-2">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <Field className="mb-0" type="password" id="confirmPassword" name="confirmPassword" />
                                <ErrorMessage component="div" name="confirmPassword" className="signupError" />
                            </div>
                            <div className="d-flex flex-column mb-2">
                                <label htmlFor="phoneNo">Phone</label>
                                <Field className="mb-0" type="tel" id="phoneNo" name="phoneNo" />
                                <ErrorMessage component="div" name="phoneNo" className="signupError" />
                            </div>
                            <div className="d-flex flex-column mb-2">
                                <label htmlFor="address">Address</label>
                                <Field className="mb-0" type="text" id="address" name="address" />
                                <ErrorMessage component="div" name="address" className="signupError" />
                            </div>
                            <input type="submit" value="Sign in" style={{ marginTop: "20px" }} />
                        </Form>
                    )}
                </Formik>
                <p>
                    Already have account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
}

export default Signup;
