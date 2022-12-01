import React, { useEffect, useState } from "react";

import "./style.scss";

export const Mars = () => {
  const [mars, setMars] = useState([]);
  const [sol, setSol] = useState(0);
  const [selectRover, setSelectRover] = useState("Curiosity");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const fetchMars = () => {
    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectRover}/photos?earth_date=${date}&api_key=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setMars(res.photos);
        setSol(res.photos[0].sol);
      });
  };

  useEffect(() => {
    fetchMars();
  }, [date, selectRover]);

  return (
    <div className="mars">
      <div className="mars__weather">
        <iframe
          src="https://mars.nasa.gov/layout/embed/image/mslweather/"
          scrolling="no"
          frameBorder="0"
        ></iframe>
      </div>
      <div className="mars__controll">
        <div>
          <h1>Mars Photos</h1>
          <select
            onChange={(e) => setSelectRover(e.target.value)}
            className="mars__controll__select"
          >
            <option value="curiosity">Curiosity</option>
            <option value="opportunity">Opportunity</option>
            <option value="spirit">Spirit</option>
          </select>
        </div>
        <div className="mars__controll__date">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {mars.length > 0 && <p>Sol: {sol}</p>}
        </div>
      </div>

      <div className="mars__photos">
        {mars.length > 0 ? (
          mars.map((item: any) => {
            return (
              <div key={item.id} className="mars__photos__item">
                <a href={item.img_src} target="_blank">
                  <img loading="lazy" src={item.img_src} alt={item.img_src} />
                </a>
              </div>
            );
          })
        ) : (
          <div className="mars__photos__null">
            <p>No mars :(</p>
            <p>Choose another date or another Rover 🚀</p>
          </div>
        )}
      </div>
    </div>
  );
};
