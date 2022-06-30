import React, { useState, useEffect } from "react";

import backIcon from "../../assets/icons/back-arrow.svg";
import forwardIcon from "../../assets/icons/next-arrow.svg";
import diceIcon from "../../assets/icons/dice.png";
import cat from "../../assets/icons/giphy.gif";

import "./style.scss";

type Apod = {
  media_type: string;
  title: string;
  explanation: string;
  date: string;
  copyright?: string;
  url: string;
  hdurl?: string;
};

export const Apod = () => {
  const [apod, setApod] = useState<Apod>();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [error, setError] = useState("")

  const nowDate = new Date(new Date().setDate(new Date().getDate()))
    .toISOString()
    .split("T")[0];
  let date = new Date(new Date().setDate(new Date().getDate() - count))
    .toISOString()
    .split("T")[0];

  const fetchApod = () => {
    setLoading(true);

    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}&date=${date}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError(res.error.message)
        }
        console.log("res :>> ", res);
        setApod(res);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchApod();
  }, [count]);

  return (
    <div>
      {error && <h1 color="red">{error}</h1>}
      {apod && (
        <div className="apod">
          <div className="apod__information">
            <div>
              <div className="apod__information__title">
                <h1>{apod.title}</h1>
                <h5>{apod.date}</h5>
              </div>
              <div className="apod__information__description">
                <p>{apod.explanation}</p>
              </div>
            </div>
            <div className="apod__information__buttons-actions">
              <button disabled={loading} onClick={() => setCount(count + 1)}>
                <img src={backIcon} />
              </button>
              <button onClick={() => setCount(Math.random() * (9000 - 0) + 0)}>
                <img src={diceIcon} />
              </button>
              {nowDate !== date && (
                <button disabled={loading} onClick={() => setCount(count - 1)}>
                  <img src={forwardIcon} />
                </button>
              )}
            </div>
          </div>

          <div className="apod__content">
            {!loading ? (
              <>
                {apod.media_type === "image" && (
                  <a href={apod.hdurl} rel="noreferrer" target="_blank">
                    <img className="apod__content__img" src={apod.url ?? apod.url} />
                  </a>
                )}
                {apod.media_type === "video" && (
                  <iframe
                    width="100%"
                    height="100%"
                    src={apod.url}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                  />
                )}
                {apod.copyright && (
                  <p className="apod__content__copyright">
                    Сopyright: {apod.copyright}
                  </p>
                )}
              </>
            ) : (
              <img width={"100%"} src={cat} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
