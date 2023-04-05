import React from "react";
import "./Login.css";
import { Axios } from "../AxiosConfig";
import { ToastContainer as Toast, toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { loginSuccess } from "../slice/loginSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navtigate = useNavigate();
  const onSubmit = async (values) => {
    values.preventDefault()
    const { email, password } = values.target.elements
    await Axios.post("/login", { email: email.value, password: password.value }).then(async (res) => {
      console.log(res.data)
      await dispatch(loginSuccess({ ...res.data.user, status: true }));
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      if (res.data.user.isAdmin === true) {
        navtigate("/admin")
      }
      else {
        navtigate("/")
      }
    }).catch(()=>{
      toast.error("Wrong ID or Password", {
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
  }
  return (
    <div className="bg-img">
      <Toast />
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
          <input type="submit" value="Sign in" />
        </form>
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
