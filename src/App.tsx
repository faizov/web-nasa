import React from "react";
import { Routes } from "./pages/routes";
import { Link, useLocation } from "react-router-dom";

import telegram from "./assets/icons/telegram.svg";
import github from "./assets/icons/github.svg";

import "./index.scss";

function App() {
  const { pathname } = useLocation();
  let description = "Informal web app";

  if (pathname === "/apod") {
    description = "Astronomy Picture of the Day";
  }

  if (pathname === "/mars") {
    description = "Mars Rover Photos";
  }

  return (
    <>
      <div className="content">
        <div className="content__header">
          <div className="content__header__logo">
            <Link to="/">
              <img
                width={100}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/2449px-NASA_logo.svg.png"
                alt="Nasa logo"
              />
              <div>
                <h1>Web NASA</h1>
                <p>{description}</p>
              </div>
            </Link>
          </div>

          <div className="content__header__links">
            <Link to="/apod"><h3>APOD</h3></Link>
            {/* <Link to="/mars"><h3>Mars</h3></Link> */}
            <a
              href="https://t.me/nasabotphoto_bot"
              target="_blank"
              rel="noreferrer"
            >
              <img src={telegram} alt="" />
            </a>
            {/* <a href="https://github.com/faizov/NasaBot" target="_blank" rel="noreferrer">
              <img className="github" src={github} alt=""/>
            </a> */}
          </div>
        </div>

        <Routes />
      </div>
    </>
  );
}

export default App;
