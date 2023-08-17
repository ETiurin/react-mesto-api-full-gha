import React, { useState } from "react";

const AuthForm = ({ title, action, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password).then(() => {
      setEmail("");
      setPassword("");
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="auth__form"
      noValidate
      name="register"
    >
      <h2 className="auth__title">{title}</h2>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        className="auth__input"
        onChange={handleEmailChange}
        autoComplete="off"
      />
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Пароль"
        value={password}
        className="auth__input"
        onChange={handlePasswordChange}
        autoComplete="off"
      />
      <button type="submit" className="auth__button">
        {action}
      </button>
    </form>
  );
};

export default AuthForm;
