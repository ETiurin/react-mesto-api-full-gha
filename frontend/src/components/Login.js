import React from "react";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";
import authApi from "../utils/AuthApi";

const Login = ({ setLoggedIn, setUserData, setPopupFailed }) => {
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    return authApi
      .signIn(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          setUserData({
            userEmail: email,
          });
          navigate("/", { replace: true });
        } else {
          setPopupFailed(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setPopupFailed(true);
      });
  };

  return <AuthForm title="Вход" action="Войти" onSubmit={handleLogin} />;
};

export default Login;
