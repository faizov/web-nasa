import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { TApod } from "../../@types";

import backIcon from "../../assets/icons/back-arrow.svg";
import forwardIcon from "../../assets/icons/next-arrow.svg";
import diceIcon from "../../assets/icons/dice.png";
import likeIcon from "../../assets/icons/like.svg";
import likeRedIcon from "../../assets/icons/likered.svg";
import fullIcon from "../../assets/icons/full.png";

import "./style.scss";

export const Apod = () => {
  const [apod, setApod] = useState<TApod>();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");

  const [searchParams, setSearchparams] = useSearchParams();
  const dateParams: string | null = searchParams.get("date");

  let likeApods = JSON.parse(localStorage.getItem("likeApods") as string) || [];

  const nowDate = new Date(new Date().setDate(new Date().getDate()))
    .toISOString()
    .split("T")[0];

  let date =
    dateParams ||
    new Date(new Date().setDate(new Date().getDate() - count))
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
          likeApods.find((e: TApod) => {
            return e.date === res.date;
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
  }, [count, dateParams]);

  const saveApod = () => {
    let entry = likeApods.find(function (e: TApod) {
      return e.date === apod?.date;
    });
    if (!entry) {
      likeApods.unshift(apod);
      localStorage.setItem("likeApods", JSON.stringify(likeApods));
      setApod((prevState: any) => ({ ...prevState, like: true }));
    } else {
      const index = likeApods.findIndex((item: TApod) => {
        return item.date === apod?.date;
      });
      likeApods.splice(index, 1);
      setApod((prevState: any) => ({ ...prevState, like: false }));
      localStorage.setItem("likeApods", JSON.stringify(likeApods));
    }
  };

  const dateFirstApod = "1995-06-16T00:00:00.000Z";
  const currentDate = Date.parse(new Date().toString());
  const daysFirstApod = (currentDate - Date.parse(dateFirstApod)) / 86400000;

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
                <input
                  type="date"
                  name={apod.date}
                  id={apod.date}
                  value={apod.date}
                  max={nowDate}
                  min={new Date(dateFirstApod).toISOString().split("T")[0]}
                  onChange={(e) => {
                    setSearchparams("date=" + e.target.value);
                  }}
                />
              </div>
              <div className="apod__information__description">
                <p>{apod.explanation}</p>
              </div>
            </div>
            {!dateParams && (
              <div className="apod__information__buttons-actions">
                <button disabled={loading} onClick={() => setCount(count + 1)}>
                  <img src={backIcon} />
                </button>
                <button onClick={() => setCount(Math.random() * daysFirstApod)}>
                  <img src={diceIcon} />
                </button>
                {nowDate !== date && (
                  <button
                    disabled={loading}
                    onClick={() => setCount(count - 1)}
                  >
                    <img src={forwardIcon} />
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="apod__content">
            {!loading && (
              <>
                {apod.media_type === "image" && (
                  <div className="apod__content__img">
                    <a href={apod.hdurl} rel="noreferrer" target="_blank">
                      <img src={apod.url ?? apod.hdurl} />
                    </a>
                    <div className="apod__content__img__btn-like">
                      {apod.like ? (
                        <button onClick={() => saveApod()}>
                          <img width={32} src={likeRedIcon} />
                        </button>
                      ) : (
                        <button onClick={() => saveApod()}>
                          <img
                            width={32}
                            className="button-like"
                            src={likeIcon}
                          />
                        </button>
                      )}
                    </div>
                    <div className="apod__content__img__btn-full">
                      <a href={apod.hdurl} rel="noreferrer" target="_blank">
                        <button>
                          <img width={32} src={fullIcon} />
                        </button>
                      </a>
                    </div>
                  </div>
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};
