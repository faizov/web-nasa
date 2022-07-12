import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { TApod } from '../../@types'

import closeIcon from "../../assets/icons/close.svg";

import "./style.scss";

export const Likes = () => {
  const [photos, setPhotos] = useState<TApod[]>();
  let likeApods = JSON.parse(localStorage.getItem("likeApods") as string) || [];

  const fetchApod = () => {
    setPhotos(likeApods);
  };

  useEffect(() => {
    fetchApod();
  }, []);

  const deleteAll = () => {
    localStorage.removeItem("likeApods");
    setPhotos([]);
  };

  const deleteItem = (date: string) => {
    const index = likeApods.findIndex((item: TApod) => {
      return item.date === date;
    });
    likeApods.splice(index, 1);
    localStorage.setItem("likeApods", JSON.stringify(likeApods));
    setPhotos(likeApods);
  };

  return (
    <>
      <button className="btn-delete-all" onClick={() => deleteAll()}>
        Delete all
      </button>
      <div className="likes">
        {photos &&
          photos.map((item: TApod) => {
            return (
              <div className="likes__item" key={item.date}>
                {item.media_type === "video" && (
                  <>
                    <button
                      className="btn-remove"
                      onClick={() => deleteItem(item.date)}
                    >
                      <img src={closeIcon} alt="" />
                    </button>

                    <iframe
                      width="100%"
                      src={item.url}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Embedded youtube"
                    />
                  </>
                )}
                {item.media_type === "image" && (
                  <>
                    <button
                      className="btn-remove"
                      onClick={() => deleteItem(item.date)}
                    >
                      <img src={closeIcon} alt="" />
                    </button>
                    <Link to={`/apod?date=${item.date}`}>
                      <img
                        width={"100%"}
                        src={item.url}
                        alt=""
                        className="likes__item__img"
                        loading="lazy"
                      />
                    </Link>
                  </>
                )}
                <div className="likes__item__info">
                  <Link to={`/apod?date=${item.date}`}>
                    <h2>{item.title}</h2>
                  </Link>
                  <p>{item.date}</p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
