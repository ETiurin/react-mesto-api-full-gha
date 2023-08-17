import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";

import authApi from "../utils/AuthApi";

const Register = ({ setPopupFailed, setPopupSucceeded }) => {
  const navigate = useNavigate();

  function handleRegisterUser(email, password) {
    return authApi
      .signUp(email, password)
      .then((data) => {
        if (data) {
          setPopupSucceeded(true);
          navigate("/sign-in");
        }
      })
      .catch((err) => {
        setPopupFailed(true);
        console.log(err);
      });
  }

  return (
    <>
      <AuthForm
        title="Регистрация"
        action="Зарегистрироваться"
        onSubmit={handleRegisterUser}
      />
      <div className="auth__signin">
        <Link to="/sign-in" className="auth__login-link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </>
  );
};

export default Register;
