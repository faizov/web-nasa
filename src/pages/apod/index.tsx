import React, { useState, useEffect } from "react";

import backIcon from "../../assets/icons/back-arrow.svg";
import forwardIcon from "../../assets/icons/next-arrow.svg";
import diceIcon from "../../assets/icons/dice.png";
import likeIcon from "../../assets/icons/like.svg";
import likeRedIcon from "../../assets/icons/likered.svg";
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
  like: boolean;
};

export const Apod = () => {
  const [apod, setApod] = useState<Apod>();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");

  let likeApods = JSON.parse(localStorage.getItem("likeApods") as string) || [];

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
        let checkLike = Boolean(
          likeApods.find((e: Apod) => {
            return e.date == res.date;
          })
        );
        setApod({ ...res, like: checkLike });
        setLoading(false);

        if (res.error) {
          setError(res.error.message);
        }
      });
  };

  useEffect(() => {
    fetchApod();
  }, [count]);

  const saveApod = () => {
    let entry = likeApods.find(function (e: Apod) {
      return e.date == apod?.date;
    });
    if (!entry) {
      likeApods.push(apod);
      localStorage.setItem("likeApods", JSON.stringify(likeApods));
      setApod((prevState: any) => ({ ...prevState, like: true }));
    } else {
      const index = likeApods.findIndex((item: Apod) => {
        return item.date === apod?.date;
      });
      likeApods.splice(index, 1);
      setApod((prevState: any) => ({ ...prevState, like: false }));
      localStorage.setItem("likeApods", JSON.stringify(likeApods));
    }
  };

  return (
    <div>
      {error && <h1 color="red">{error}</h1>}
      {apod && (
        <div className="apod">
          <div className="apod__information">
            <div>
              <div className="apod__information__title">
                <h1>
                  {apod.title}{" "}
                  {apod.like ? (
                    <button onClick={() => saveApod()}>
                      <img width={32} src={likeRedIcon} />
                    </button>
                  ) : (
                    <button onClick={() => saveApod()}>
                      <img width={32} className="button-like" src={likeIcon} />
                    </button>
                  )}
                </h1>
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
                    <img
                      className="apod__content__img"
                      src={apod.url ?? apod.hdurl}
                    />
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
              <img width={"0%"} src={cat} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
