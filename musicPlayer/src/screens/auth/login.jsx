import React from "react";
import logo from '../../img/logo.png';
import { loginEndpoint } from "../../spotify";
import "./login.css";



export default function Login() {
  return (
    <div className="login-page">
      <img
        src={logo}
        alt="logo-spotify"
        className="logo"
      />
      <a href={loginEndpoint}>
        <div className="nombre">Best music</div>
        <div className="login-btn">LOG IN</div>
      </a>
    </div>
  );
}
